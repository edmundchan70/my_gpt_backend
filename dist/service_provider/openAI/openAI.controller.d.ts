import { openAiService } from "./openAi.service";
export declare class openAiController {
    private openAIService;
    constructor(openAIService: openAiService);
    getEmbed(Body: any): Promise<number[]>;
}
