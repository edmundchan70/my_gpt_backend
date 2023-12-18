import { Injectable } from "@nestjs/common";
import { VectorDBQAChain } from "langchain/chains";
import { PineconeClient } from "@pinecone-database/pinecone";
import { UpsertOperationRequest, UpsertRequest, Vector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";   
 import {PineconeStore} from "langchain/vectorstores/pinecone"
import { openAiService } from "../openAI/openAi.service";

@Injectable() 
export class pineconeService  {
    constructor(private pinecone_client : PineconeClient,
                private  openAIService  : openAiService){}

    async setUp(){
      await  this.pinecone_client.init({
            environment:process.env.pinecone_env,
            apiKey:process.env.pinecone_api_key
        })
        return this.pinecone_client.Index(process.env.pinecone_index)
    }

    async check_index_exist(index_name:string=process.env.pinecone_index){
        const exist_list = await this.pinecone_client.listIndexes();
        return exist_list.includes(index_name)    
    }

    async upsertVector(embeddings: Vector[],fileName:string){
       await this.setUp();
       const index = this.pinecone_client.Index(process.env.pinecone_index)
       const upserRequest : UpsertRequest = {
        vectors: embeddings,
        namespace:fileName
       }
       const upsertResponse = await index.upsert({
        upsertRequest: upserRequest
       })
       console.log("SUCCESSFUL UPSERT , : " , upsertResponse)
    }

    async similairtySearch(query : string) {
        const pineconeIndex = await this.setUp();
        const embedding =  this.openAIService.getEmbedding();
        const vectorStore = await PineconeStore.fromExistingIndex(
            embedding,
            {pineconeIndex:pineconeIndex},
        )

        const test = await vectorStore.similaritySearch(query, 5)
        console.log("TEST for similaity result: " , test)
        const model = this.openAIService.getModel()
        const chain = VectorDBQAChain.fromLLM(
           model,
           vectorStore,{
            k:3,
            returnSourceDocuments:true    
        })
        return await chain.call({query: query})
    }
  
}

