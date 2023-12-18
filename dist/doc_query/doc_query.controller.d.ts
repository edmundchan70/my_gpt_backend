/// <reference types="multer" />
import { doc_query_service } from './doc_query.service';
import { chat_body } from './DTO/chat_body.dto';
import { Document_id } from './DTO/Document_id.dto';
export declare class doc_query_controller {
    private doc_query_service;
    constructor(doc_query_service: doc_query_service);
    check_doc_query(): void;
    chat(chat_body: chat_body, token: string): Promise<string>;
    handle_file(token: string, Body: any, file: Express.Multer.File): Promise<{
        doc_id: string;
        FileName: string;
    }>;
    get_user_document_list(token: string): Promise<{
        doc_id: string;
        FileName: string;
    }[]>;
    get_document_detail(token: string, { doc_id }: Document_id): Promise<{
        conversation_history: {
            MessageTime: Date;
            Message: string;
            role: import(".prisma/client").$Enums.conversation_role;
        }[];
    }>;
    generate_summary(token: string, { doc_id }: Document_id): Promise<string>;
    retrieve_conversation(token: string, { doc_id }: Document_id): Promise<{
        MessageTime: Date;
        Message: string;
        role: import(".prisma/client").$Enums.conversation_role;
    }[]>;
    deleteAll(): Promise<void>;
    tester(): void;
}
