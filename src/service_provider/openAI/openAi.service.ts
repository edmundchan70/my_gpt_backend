import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from "openai";
import { chat_message } from '../../DTO/openAI/chat_message.dto';
import { OpenAI } from 'langchain/llms/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
 
 
@Injectable()
export class openAiService {
    private config: Configuration;
    private openai: OpenAIApi;

    public getModel(){
        return  new OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY_TEST,
            modelName: "gpt-4-vision-preview"
        })
    }  
    public  getEmbedding(){
        const embedding = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY_TEST,
            modelName:"text-embedding-ada-002"
          })
        return embedding
    }
    public async embedQuery(query){
        return await this.getEmbedding().embedQuery(query)
    }
    async chat(query:string,data:string,API_KEY: string){
        this.config = new Configuration({
            organization: "org-EVepSWx7EGMJzKHT3eCJVvb4",
            apiKey:API_KEY,
        });
        this.openai = new OpenAIApi(this.config);
        const messag_dto : chat_message[] =[{
            role:"system",
            content: "Remeber the following data and use them to answer user question: "+data
        },
        {
            role: "user",
            content: query
        }];
        const resp =  await this.openai.createChatCompletion({
            model: "gpt-4",
            messages:messag_dto,
            temperature:0.8
        });
        return resp.data;
    }
    
}


 
