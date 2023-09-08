import { Module } from '@nestjs/common';
import { doc_query_controller } from '../doc_query/doc_query.controller';
import { doc_query_service } from './doc_query.service';
import { ConfigModule } from '@nestjs/config';
import { openAiModule } from 'src/service_provider/openAI/openAi.module';
 
import { pineconeModule } from 'src/service_provider/pinecone/pinecone.module';
 
import { JwtModule } from '@nestjs/jwt';
 
import { PrismaModule } from 'src/prisma/prisma.module';
import { S3_Module } from 'src/service_provider/S3/S3.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { pineconeService } from 'src/service_provider/pinecone/pinecone.service';
import { PineconeClient } from '@pinecone-database/pinecone';

@Module({
    imports:[openAiModule,ConfigModule.forRoot(),pineconeModule,JwtModule.register({}),PrismaModule,S3_Module],
    controllers: [doc_query_controller],
    providers: [doc_query_service,AuthService,pineconeService,PineconeClient],
})
export class doc_query_module {};