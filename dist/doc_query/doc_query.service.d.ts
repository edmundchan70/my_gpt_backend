/// <reference types="multer" />
import { openAiService } from 'src/service_provider/openAI/openAi.service';
import { pineconeService } from 'src/service_provider/pinecone/pinecone.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/service_provider/S3/S3.service';
import { chat_body } from './DTO/chat_body.dto';
import { AuthService } from 'src/auth/auth.service';
import { Vector } from '@pinecone-database/pinecone';
export declare class doc_query_service {
    private openAiService;
    private pineConeService;
    private prisma;
    private jwtService;
    private S3;
    private authService;
    constructor(openAiService: openAiService, pineConeService: pineconeService, prisma: PrismaService, jwtService: JwtService, S3: S3Service, authService: AuthService);
    file_to_text_chunk(file: Express.Multer.File, token: string): Promise<{
        doc_id: string;
        FileName: string;
    }>;
    chat_retrievalQAChain_PINECONE({ query }: chat_body, token: string): Promise<string>;
    get_user_document_list(token: string): Promise<{
        doc_id: string;
        FileName: string;
    }[]>;
    get_document_detail(token: string, doc_id: string): Promise<{
        conversation_history: {
            MessageTime: Date;
            Message: string;
            role: import(".prisma/client").$Enums.conversation_role;
        }[];
    }>;
    retrieve_conversation(doc_id: string, token: string): Promise<{
        MessageTime: Date;
        Message: string;
        role: import(".prisma/client").$Enums.conversation_role;
    }[]>;
    deleteDocAndTextChunk(): Promise<void>;
    retreive_text_chunk(doc_id: string, user_id: number): Promise<{
        text_chunk: string;
    }[]>;
    get_userId_by_email(email: string): Promise<{
        id: number;
    }>;
    get_userId_by_token(token: string): Promise<number>;
    get_file_name_from_db(doc_id: string): Promise<string>;
    put_file_to_S3(doc_id: string, file: Express.Multer.File): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
    get_file_from_S3(fileName: string): Promise<any>;
    update_chat(doc_id: string, owner_id: number, Message: string, role: "AI" | "HUMAN"): Promise<{
        conversation_id: number;
        doc_id: string;
        owner_id: number;
        MessageTime: Date;
        Message: string;
        role: import(".prisma/client").$Enums.conversation_role;
    }>;
    generate_summary(doc_id: string, token: string): Promise<string>;
    generateEmbedding(split_text: {
        pageContent: string;
    }[], fileName: string): Promise<Vector[]>;
    generateEmbedQuery(query: string): Promise<number[]>;
}
