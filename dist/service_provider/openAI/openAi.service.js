"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openAiService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const openai_2 = require("langchain/llms/openai");
const openai_3 = require("langchain/embeddings/openai");
let openAiService = class openAiService {
    getModel() {
        return new openai_2.OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY_TEST,
            modelName: "gpt-4-vision-preview"
        });
    }
    getEmbedding() {
        const embedding = new openai_3.OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY_TEST,
            modelName: "text-embedding-ada-002"
        });
        return embedding;
    }
    async embedQuery(query) {
        return await this.getEmbedding().embedQuery(query);
    }
    async chat(query, data, API_KEY) {
        this.config = new openai_1.Configuration({
            organization: "org-EVepSWx7EGMJzKHT3eCJVvb4",
            apiKey: API_KEY,
        });
        this.openai = new openai_1.OpenAIApi(this.config);
        const messag_dto = [{
                role: "system",
                content: "Remeber the following data and use them to answer user question: " + data
            },
            {
                role: "user",
                content: query
            }];
        const resp = await this.openai.createChatCompletion({
            model: "gpt-4",
            messages: messag_dto,
            temperature: 0.8
        });
        return resp.data;
    }
};
openAiService = __decorate([
    (0, common_1.Injectable)()
], openAiService);
exports.openAiService = openAiService;
//# sourceMappingURL=openAi.service.js.map