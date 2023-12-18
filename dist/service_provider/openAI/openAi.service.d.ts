import { OpenAI } from 'langchain/llms/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
export declare class openAiService {
    private config;
    private openai;
    getModel(): OpenAI;
    getEmbedding(): OpenAIEmbeddings;
    embedQuery(query: any): Promise<number[]>;
    chat(query: string, data: string, API_KEY: string): Promise<import("openai").CreateChatCompletionResponse>;
}
