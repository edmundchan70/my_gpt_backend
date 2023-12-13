import { Module } from '@nestjs/common';
 
import { AuthModule } from '../auth/auth.module';
 
import { doc_query_module } from '../doc_query/doc_query.module';
 
import { openAiModule } from '../service_provider/openAI/openAi.module';
 
import { PrismaModule } from 'src/prisma/prisma.module';
import { user_Module } from 'src/user/user.module';
import { pineconeModule } from 'src/service_provider/pinecone/pinecone.module';
import { GitModule } from 'src/service_provider/git/git.module';
import { TestModule } from 'src/test/test.module';
import { ParaPhraserModule } from 'src/paraPhraser/para-phraser.module';

@Module({
  imports: [AuthModule ,doc_query_module,openAiModule,PrismaModule,user_Module,pineconeModule,GitModule,TestModule,ParaPhraserModule],
 
})
export class AppModule {}
