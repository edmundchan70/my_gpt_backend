import { Module } from '@nestjs/common';
 
import { AuthModule } from '../auth/auth.module';
 
import { doc_query_module } from '../doc_query/doc_query.module';
 
import { openAiModule } from '../openAI/openAi.module';
 
import { PrismaModule } from 'src/prisma/prisma.module';
import { user_Module } from 'src/user/user.module';
import { pineconeModule } from 'src/pinecone/pinecone.module';
 
 

@Module({
  imports: [AuthModule ,doc_query_module,openAiModule,PrismaModule,user_Module,pineconeModule],
 
})
export class AppModule {}
