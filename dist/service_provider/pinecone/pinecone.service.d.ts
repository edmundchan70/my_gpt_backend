import { PineconeClient } from "@pinecone-database/pinecone";
import { Vector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
export declare class pineconeService {
    private pinecone_client;
    constructor(pinecone_client: PineconeClient);
    setUp(): Promise<import("@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch").VectorOperationsApi>;
    check_index_exist(index_name?: string): Promise<boolean>;
    upsertVector(embeddings: Vector[], fileName: string): Promise<void>;
    similairtySearch(query: number[]): Promise<void>;
}
