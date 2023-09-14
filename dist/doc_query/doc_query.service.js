"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doc_query_service = void 0;
const common_1 = require("@nestjs/common");
const pdf_1 = require("langchain/document_loaders/fs/pdf");
const chains_1 = require("langchain/chains");
const openai_1 = require("langchain/embeddings/openai");
const openAi_service_1 = require("../service_provider/openAI/openAi.service");
const pinecone_service_1 = require("../service_provider/pinecone/pinecone.service");
const openai_2 = require("langchain/llms/openai");
const hnswlib_1 = require("langchain/vectorstores/hnswlib");
const crypto_1 = require("crypto");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const S3_service_1 = require("../service_provider/S3/S3.service");
const client_s3_1 = require("@aws-sdk/client-s3");
const HNSWLib_1 = require("./util/HNSWLib");
const text_splitter_1 = require("langchain/text_splitter");
const auth_service_1 = require("../auth/auth.service");
let doc_query_service = class doc_query_service {
    constructor(openAiService, pineConeService, prisma, jwtService, S3, authService) {
        this.openAiService = openAiService;
        this.pineConeService = pineConeService;
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.S3 = S3;
        this.authService = authService;
    }
    async file_to_text_chunk(file, token) {
        const loader = new pdf_1.PDFLoader(new Blob([file.buffer], { type: 'application/pdf' }), {
            splitPages: false,
        });
        const docs = await loader.load();
        const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({ chunkSize: 700, chunkOverlap: 300 });
        const split_text = await splitter.splitDocuments(docs);
        const fileName = file.originalname;
        const output = split_text.map(item => {
            const { metadata } = item, newItem = __rest(item, ["metadata"]);
            return newItem;
        });
        const rawData = (0, HNSWLib_1.text_chunktoString)(split_text);
        const doc_id = (0, crypto_1.randomUUID)();
        const decoded_info = this.jwtService.decode(token.slice("Bearer ".length));
        const { id } = await this.get_userId_by_email(decoded_info.email);
        try {
            await this.prisma.document.create({
                data: {
                    doc_id: doc_id,
                    FileName: fileName,
                    owner_id: id,
                    content: rawData,
                }
            });
        }
        catch (err) {
            throw new common_1.ForbiddenException("FILE NAME MUST BE UNIQUE ");
        }
        await this.put_file_to_S3(doc_id, file);
        console.log("SAVED TO S3");
        const text_chunk_db = (0, HNSWLib_1.text_chunk_to_DB)(split_text, doc_id, id);
        await this.prisma.textChunk.createMany({
            data: text_chunk_db
        });
        console.log("SUCCESSFUL ADDED RECORD THROUGH PRISMA");
        const filter_skip_line = (0, HNSWLib_1.text_chunk_filter_skipLine)(split_text);
        console.log(filter_skip_line);
        const embedding_for_doc = await this.generateEmbedding(filter_skip_line, fileName);
        await this.pineConeService.setUp();
        await this.pineConeService.upsertVector(embedding_for_doc, fileName);
        console.log("\n Successfully setup pinecone ");
        console.log("\n Successfully added embeding");
        console.log("COMPLETED REQIESRT file_to_text_chunk");
        return {
            doc_id: doc_id,
            FileName: fileName,
        };
    }
    async chat_retrievalQAChain({ doc_id, query }, token) {
        const owner_id = await this.get_userId_by_token(token);
        console.log("chat_retrievalQAChain call activated");
        const model = new openai_2.OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY_TEST,
            modelName: "gpt-4"
        });
        console.log('Vector store init');
        const text_chunk_array = await (0, HNSWLib_1.DB_to_text_chunk)(await this.retreive_text_chunk(doc_id, owner_id));
        const vectorStore = await hnswlib_1.HNSWLib.fromDocuments(text_chunk_array, new openai_1.OpenAIEmbeddings({
            openAIApiKey: process.env.OPENA_API_KEY,
            modelName: "text-embedding-ada-002"
        }));
        const chain = chains_1.RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
        console.log("Querying llm call activated", query);
        const { text } = await chain.call({
            query: query
        });
        console.log(text);
        const HUMAN_MESSAGE = {
            doc_id: doc_id,
            owner_id: owner_id,
            role: "HUMAN",
            Message: query
        };
        const AI_RESPONSE = {
            doc_id: doc_id,
            owner_id: owner_id,
            role: "AI",
            Message: text
        };
        await this.prisma.conversation.create({
            data: HUMAN_MESSAGE
        });
        await this.prisma.conversation.create({
            data: AI_RESPONSE
        });
        return { msg: text };
    }
    async chat_retrievalQAChain_PINECONE({ doc_id, query }, token) {
        const owner_id = await this.get_userId_by_token(token);
        console.log("chat_retrievalQAChain_PINECONE call activated");
        const model = new openai_2.OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY_TEST,
            modelName: "gpt-4"
        });
        console.log('Vector store init');
        const query_embed = await this.generateEmbedQuery(query);
        const pineCone_index = await this.pineConeService.setUp();
        const file_name = await this.get_file_name_from_db(doc_id);
        const similairtySearch = await pineCone_index.query({
            queryRequest: { vector: query_embed,
                topK: 5,
                includeMetadata: true,
                namespace: file_name
            }
        });
        let selected_str = [];
        for (const element of similairtySearch.matches) {
            const current_k_result = element;
            selected_str.push({ id: current_k_result.id,
                string: current_k_result.metadata });
        }
        console.log("Queried db simliarity search: ", selected_str);
        return { msg: JSON.stringify(selected_str) };
    }
    async get_user_document_list(token) {
        const decode_info = await this.authService.decode_user_from_token(token);
        console.log('get_user_document_list', decode_info);
        const { sub } = decode_info;
        return await this.prisma.document.findMany({
            where: {
                owner_id: sub
            },
            select: {
                FileName: true,
                doc_id: true
            },
            orderBy: { CreatDate: 'desc' }
        });
    }
    async get_document_detail(token, doc_id) {
        const owner_id = await this.get_userId_by_token(token);
        const conversation_history = await this.prisma.conversation.findMany({
            where: {
                doc_id: doc_id,
                owner_id: owner_id
            }, select: {
                MessageTime: true,
                Message: true,
                role: true
            }
        });
        return {
            conversation_history: conversation_history
        };
    }
    async retrieve_conversation(doc_id, token) {
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
        });
        return resp;
    }
    async retreive_text_chunk(doc_id, user_id) {
        const text_chunk = await this.prisma.textChunk.findMany({
            where: {
                owner_id: user_id,
                doc_id: doc_id,
            },
            select: {
                text_chunk: true
            }
        });
        console.log(text_chunk);
        return text_chunk;
    }
    async get_userId_by_email(email) {
        return this.prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true
            }
        });
    }
    async get_userId_by_token(token) {
        console.log(token);
        const decode_info = await this.authService.decode_user_from_token(token);
        console.log(decode_info);
        const { sub } = decode_info;
        return sub;
    }
    async get_file_name_from_db(doc_id) {
        const { FileName } = await this.prisma.document.findUnique({
            where: {
                doc_id: doc_id
            }
        });
        return FileName;
    }
    async put_file_to_S3(doc_id, file) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: doc_id,
            Body: file.buffer
        });
        try {
            const response = await this.S3.send(command);
            console.log(response);
            return response;
        }
        catch (err) {
            throw err;
        }
    }
    async get_file_from_S3(fileName) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName
        });
        try {
            const { Body } = await this.S3.send(command);
            const blob = await Body.transformToWebStream();
            console.log('byte: ', blob);
            return blob;
        }
        catch (err) {
            console.log(err.Code);
            return err.Code;
        }
    }
    async update_chat(doc_id, owner_id, Message, role) {
        return await this.prisma.conversation.create({
            data: {
                doc_id: doc_id,
                owner_id: owner_id,
                Message: Message,
                role: role
            }
        });
    }
    async generate_summary(doc_id, token) {
        const query = 'GIVE ME THE SUMMARY OF THE DOCUMENT';
        const resp = await this.chat_retrievalQAChain({ doc_id: doc_id, query: query }, token);
        console.log(resp);
        return resp.msg;
    }
    async generateEmbedding(split_text, fileName) {
        const embedding_model = new openai_1.OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY_TEST,
            modelName: "text-embedding-ada-002"
        });
        console.log('generate embedding called');
        var text_chunk_counter = 0;
        var valid_vector_for_pinecone_upsert = [];
        console.log(split_text.length);
        for (let i = 0; i < split_text.length; i++) {
            const { pageContent } = split_text[i];
            const current_embed = await embedding_model.embedQuery(pageContent);
            const id = fileName + String(text_chunk_counter);
            valid_vector_for_pinecone_upsert.push({
                id: id,
                values: current_embed,
                metadata: { pageContent },
            });
            console.log(valid_vector_for_pinecone_upsert);
            text_chunk_counter += 1;
        }
        console.log("FINISH EMBEEDING DOCUMENT : ", fileName, "RESULT: ", valid_vector_for_pinecone_upsert);
        return valid_vector_for_pinecone_upsert;
    }
    async generateEmbedQuery(query) {
        const embedding_model = new openai_1.OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY_TEST,
            modelName: "text-embedding-ada-002"
        });
        return await embedding_model.embedQuery(query);
    }
};
doc_query_service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [openAi_service_1.openAiService,
        pinecone_service_1.pineconeService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService,
        S3_service_1.S3Service,
        auth_service_1.AuthService])
], doc_query_service);
exports.doc_query_service = doc_query_service;
//# sourceMappingURL=doc_query.service.js.map