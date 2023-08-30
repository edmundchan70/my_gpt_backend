import { Module } from '@nestjs/common';
import { openAiService } from './openAi.service';
 

@Module({
    providers: [openAiService],
    exports:[openAiService]
})
export class openAiModule {};