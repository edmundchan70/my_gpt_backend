import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AtStrategy, RtStrategy } from './strategies';
import {JwtModule} from "@nestjs/jwt"

@Module({
  imports:[PrismaModule , ConfigModule.forRoot(),JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService,AtStrategy,RtStrategy]
})
export class AuthModule {}
