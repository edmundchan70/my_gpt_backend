import { PineconeClient } from "@pinecone-database/pinecone";
import { Vector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import { openAiService } from "../openAI/openAi.service";
export declare class pineconeService {
    private pinecone_client;
    private openAIService;
    constructor(pinecone_client: PineconeClient, openAIService: openAiService);
    setUp(): Promise<import("@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch").VectorOperationsApi>;
    check_index_exist(index_name?: string): Promise<boolean>;
    upsertVector(embeddings: Vector[], fileName: string): Promise<void>;
    similairtySearch(query: string): Promise<import("langchain/dist/schema").ChainValues>;
}
