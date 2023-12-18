import { ForbiddenException, Injectable } from '@nestjs/common';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RunnableSequence } from "langchain/schema/runnable";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { text_chunk } from './DTO/text_chunk.dto';
import { openAiService } from 'src/service_provider/openAI/openAi.service';
import { pineconeService } from 'src/service_provider/pinecone/pinecone.service';
import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/service_provider/S3/S3.service';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { DB_to_text_chunk, text_chunk_to_DB, text_chunktoString, text_chunk_filter_skipLine } from './util/HNSWLib';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { user_info } from '../auth/DTO/user_info.dto';
import { conversation } from './DTO/conversation.dto';
import { chat_body } from './DTO/chat_body.dto';
import { AuthService } from 'src/auth/auth.service';
import { Vector } from '@pinecone-database/pinecone';
import { json } from 'stream/consumers';

@Injectable()
export class doc_query_service {
  constructor(private openAiService: openAiService,
    private pineConeService: pineconeService,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private S3: S3Service,
    private authService: AuthService,) { }

  async file_to_text_chunk(file: Express.Multer.File, token: string) {
    const loader = new PDFLoader(new Blob([file.buffer], { type: 'application/pdf' }), {
      splitPages: false,
    });
    const docs = await loader.load();
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 300, chunkOverlap: 150 });
    const split_text = await splitter.splitDocuments(docs);
    const fileName = file.originalname

    const rawData = text_chunktoString(split_text);
    const doc_id = randomUUID()


    const decoded_info: any = this.jwtService.decode(token.slice("Bearer ".length));
    const { id } = await this.get_userId_by_email(decoded_info.email)

    try {
      await this.prisma.document.create({
        data: {
          doc_id: doc_id,
          FileName: fileName,
          owner_id: id,
          content: rawData,
        }
      })
    } catch (err: any) {
      throw new ForbiddenException("FILE NAME MUST BE UNIQUE ")
    }
    //save to S3 
    await this.put_file_to_S3(doc_id, file);

    const text_chunk_db = text_chunk_to_DB(split_text, doc_id, id)
    await this.prisma.textChunk.createMany({
      data: text_chunk_db
    })

    console.log("SUCCESSFUL ADDED RECORD THROUGH PRISMA")
    const filter_skip_line = text_chunk_filter_skipLine(split_text);
    console.log(filter_skip_line)
    const embedding_for_doc = await this.generateEmbedding(filter_skip_line, fileName)
    await this.pineConeService.setUp()
    await this.pineConeService.upsertVector(embedding_for_doc, fileName)
    console.log("\n Successfully setup pinecone ")
    console.log("\n Successfully added embeding")
    console.log("COMPLETED REQIESRT file_to_text_chunk")
    return {
      doc_id: doc_id,
      FileName: fileName,
    }
  }

  async chat_retrievalQAChain_PINECONE({ query }: chat_body, token: string) {
    console.log("chat_retrievalQAChain_PINECONE call activated")
    const resp = await this.pineConeService.similairtySearch(query)
    console.log(resp)
    return JSON.stringify(resp)
  }

  async get_user_document_list(token: string) {
    const decode_info: user_info = await this.authService.decode_user_from_token(token);
    console.log('get_user_document_list', decode_info)
    const { sub } = decode_info

    return await this.prisma.document.findMany({
      where: {
        owner_id: sub
      },
      select: {
        FileName: true,
        doc_id: true
      },
      orderBy: { CreatDate: 'desc' }
    })

  }
  async get_document_detail(token: string, doc_id: string) {
    /**
     * 1. Take the conversation infomraiton
     * 2. Get the pdf document from S3
     * 
     */
    const owner_id = await this.get_userId_by_token(token);
    //load conversation history
    const conversation_history = await this.prisma.conversation.findMany({
      where: {
        doc_id: doc_id,
        owner_id: owner_id
      }, select: {
        MessageTime: true,
        Message: true,
        role: true
      }
    })
    return {
      conversation_history: conversation_history
    }


  }
  async retrieve_conversation(doc_id: string, token: string) {
    const owner_id = await this.get_userId_by_token(token);

    const resp = await this.prisma.conversation.findMany({
      where: {
        owner_id: owner_id,
        doc_id: doc_id
      }, select: {
        MessageTime: true,
        Message: true,
        role: true
      },
      orderBy: {
        MessageTime: "asc"
      }
    })
    console.log(resp)
    return resp;
  }

  async deleteDocAndTextChunk() {
    await this.prisma.textChunk.deleteMany({});
    await this.prisma.document.deleteMany({});
  }
  //helper functions  
  async retreive_text_chunk(doc_id: string, user_id: number) {
    const text_chunk = await this.prisma.textChunk.findMany({
      where: {
        owner_id: user_id,
        doc_id: doc_id,
      },
      select: {
        text_chunk: true
      }
    })
    // const plainArray = text_chunk.map((chunk) => chunk.text_chunk);
    console.log(text_chunk)
    return text_chunk
  }
  async get_userId_by_email(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email
      },
      select: {
        id: true
      }
    })
  }
  async get_userId_by_token(token: string): Promise<number> {
    console.log(token)
    const decode_info: user_info = await this.authService.decode_user_from_token(token);
    console.log(decode_info)
    const { sub } = decode_info;
    return sub
  }
  async get_file_name_from_db(doc_id: string): Promise<string> {
    const { FileName } = await this.prisma.document.findUnique({
      where: {
        doc_id: doc_id
      }
    })
    return FileName;
  }
  async put_file_to_S3(doc_id: string, file: Express.Multer.File) {
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: doc_id,
      Body: file.buffer
    });
    try {
      const response = await this.S3.send(command);
      console.log(response);
      console.log("SAved to")
      return response
    } catch (err) {
      throw err
    }


  }
  async get_file_from_S3(fileName: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName
    })
    //console.log(command)
    try {
      const { Body } = await this.S3.send(command);
      const blob = await Body.transformToWebStream();
      console.log('byte: ', blob)
      return blob;
    }
    catch (err) {
      console.log(err.Code)
      return err.Code
    }





  }

  async update_chat(doc_id: string, owner_id: number, Message: string, role: "AI" | "HUMAN") {
    return await this.prisma.conversation.create({
      data: {
        doc_id: doc_id,
        owner_id: owner_id,
        Message: Message,
        role: role
      }
    })
  }
  async generate_summary(doc_id: string, token: string) {
    const query = 'GIVE ME THE SUMMARY OF THE DOCUMENT';
    const resp = await this.chat_retrievalQAChain_PINECONE({doc_id,  query: query }, token)
    console.log(resp)
    return resp;
  }
  async generateEmbedding(split_text: { pageContent: string; }[], fileName: string): Promise<Vector[]> {
    const embedding_model =   this.openAiService.getEmbedding();
    console.log('generate embedding called')
    let text_chunk_counter = 0;
    let valid_vector_for_pinecone_upsert: Vector[] = [];
    console.log(split_text.length)
    for (const element of split_text) {
      const { pageContent } = element;
      const current_embed = await embedding_model.embedQuery(pageContent);
      const id = fileName + String(text_chunk_counter);
      valid_vector_for_pinecone_upsert.push({
        id: id,
        values: current_embed,
        metadata: { pageContent },
      });
      console.log(valid_vector_for_pinecone_upsert)
      text_chunk_counter += 1;
    }

    console.log("FINISH EMBEEDING DOCUMENT : ", fileName, "RESULT: ", valid_vector_for_pinecone_upsert)
    return valid_vector_for_pinecone_upsert;
  }
  async generateEmbedQuery(query: string): Promise<number[]> {
    const embedding_model = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY_TEST,
      modelName: "text-embedding-ada-002"
    })
    return await embedding_model.embedQuery(query)
  }
}



