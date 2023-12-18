import { Module } from '@nestjs/common';
import { pineconeService } from './pinecone.service';
import { ConfigModule } from '@nestjs/config';
import { PineconeClient } from '@pinecone-database/pinecone';
import { openAiModule } from '../openAI/openAi.module';
 
 

@Module({
    imports:[ConfigModule.forRoot(),openAiModule],
    providers: [pineconeService,PineconeClient],
    exports:[pineconeService]
})
export class pineconeModule {};