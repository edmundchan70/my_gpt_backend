import { Module } from '@nestjs/common';
import { ParaPhraserController } from './para-phraser.controller';
import { ParaPhraserService } from './para-phraser.service';
import { doc_query_module } from 'src/doc_query/doc_query.module';
import { doc_query_service } from 'src/doc_query/doc_query.service';
import { AuthService } from 'src/auth/auth.service';
import { openAiModule } from 'src/service_provider/openAI/openAi.module';
import { pineconeModule } from 'src/service_provider/pinecone/pinecone.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { S3_Module } from 'src/service_provider/S3/S3.module';

@Module({
    imports:[doc_query_module,openAiModule,pineconeModule,PrismaModule,JwtModule,S3_Module],
    controllers:[ParaPhraserController],
    providers:[ParaPhraserService, doc_query_service,AuthService]
})
export class ParaPhraserModule {
}
