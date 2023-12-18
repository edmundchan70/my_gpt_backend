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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pineconeService = void 0;
const common_1 = require("@nestjs/common");
const chains_1 = require("langchain/chains");
const pinecone_1 = require("@pinecone-database/pinecone");
const pinecone_2 = require("langchain/vectorstores/pinecone");
const openAi_service_1 = require("../openAI/openAi.service");
let pineconeService = class pineconeService {
    constructor(pinecone_client, openAIService) {
        this.pinecone_client = pinecone_client;
        this.openAIService = openAIService;
    }
    async setUp() {
        await this.pinecone_client.init({
            environment: process.env.pinecone_env,
            apiKey: process.env.pinecone_api_key
        });
        return this.pinecone_client.Index(process.env.pinecone_index);
    }
    async check_index_exist(index_name = process.env.pinecone_index) {
        const exist_list = await this.pinecone_client.listIndexes();
        return exist_list.includes(index_name);
    }
    async upsertVector(embeddings, fileName) {
        await this.setUp();
        const index = this.pinecone_client.Index(process.env.pinecone_index);
        const upserRequest = {
            vectors: embeddings,
            namespace: fileName
        };
        const upsertResponse = await index.upsert({
            upsertRequest: upserRequest
        });
        console.log("SUCCESSFUL UPSERT , : ", upsertResponse);
    }
    async similairtySearch(query) {
        const pineconeIndex = await this.setUp();
        const embedding = this.openAIService.getEmbedding();
        const vectorStore = await pinecone_2.PineconeStore.fromExistingIndex(embedding, { pineconeIndex: pineconeIndex });
        const test = await vectorStore.similaritySearch(query, 5);
        console.log("TEST for similaity result: ", test);
        const model = this.openAIService.getModel();
        const chain = chains_1.VectorDBQAChain.fromLLM(model, vectorStore, {
            k: 3,
            returnSourceDocuments: true
        });
        return await chain.call({ query: query });
    }
};
pineconeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pinecone_1.PineconeClient,
        openAi_service_1.openAiService])
], pineconeService);
exports.pineconeService = pineconeService;
//# sourceMappingURL=pinecone.service.js.map