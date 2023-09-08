import "@tensorflow/tfjs-backend-cpu";
export declare class openAiService {
    private config;
    private openai;
    chat(query: string, data: string, API_KEY: string): Promise<import("openai").CreateChatCompletionResponse>;
}
