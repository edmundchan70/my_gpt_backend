import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { openAiModule } from 'src/service_provider/openAI/openAi.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { S3_Module } from 'src/service_provider/S3/S3.module';

@Module({
  imports:[openAiModule,ConfigModule.forRoot(),JwtModule.register({}),PrismaModule,S3_Module],
  providers: [TestService],
  controllers:[TestController]
})
export class TestModule {}
