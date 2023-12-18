import { Module } from '@nestjs/common';
import { openAiService } from './openAi.service';
import { openAiController } from './openAI.controller';
 

@Module({
    providers: [openAiService],
    exports:[openAiService],
    controllers:[openAiController]
})
export class openAiModule {};