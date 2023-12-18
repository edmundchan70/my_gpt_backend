import { Body, Controller, Post } from "@nestjs/common";
import { openAiService } from "./openAi.service";
import { Public } from "src/common/decorators";


@Controller('opneAI')
export class openAiController {
    constructor(private openAIService : openAiService){}
    @Public()
    @Post("embedQuery")
    async getEmbed(@Body() Body) {
        return await this.openAIService.embedQuery(Body.query)
    }
}
