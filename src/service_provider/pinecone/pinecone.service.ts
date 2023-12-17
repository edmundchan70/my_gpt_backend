import { Injectable } from "@nestjs/common";
import { PineconeClient } from "@pinecone-database/pinecone";
import { UpsertOperationRequest, UpsertRequest, Vector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import { Embeddings } from "langchain/dist/embeddings/base";
 import {PineconeStore} from "langchain/vectorstores/pinecone"

@Injectable() 
export class pineconeService  {
    constructor(private pinecone_client : PineconeClient){}
    
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
    async similairtySearch(query : number[]) {
        const index = await this.setUp();
        const resp = await  index.query({
            queryRequest:{
                vector: query,
                topK:5,
                includeMetadata:true,
                includeValues:true,
            },
    
        })
        console.log(resp)
    }
  
}

