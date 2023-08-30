import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { user_controller } from './user.controller';
import { user_service } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
 
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[PrismaModule,AuthModule,JwtModule.register({})],
    controllers: [user_controller],
    providers: [user_service,AuthService],
})
export class user_Module {};