import { Module } from '@nestjs/common';
import { pineconeService } from './pinecone.service';
import { ConfigModule } from '@nestjs/config';
import { PineconeClient } from '@pinecone-database/pinecone';
 
 

@Module({
    imports:[ConfigModule.forRoot()],
    providers: [pineconeService,PineconeClient],
    exports:[pineconeService]
})
export class pineconeModule {};