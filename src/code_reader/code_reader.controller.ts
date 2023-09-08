import { Body, Controller, Post } from '@nestjs/common';
import { CodeReaderService } from './code_reader.service';
import { string } from '@tensorflow/tfjs-core';

@Controller('code-reader')
export class CodeReaderController {
    constructor(private code_reader_service: CodeReaderService){}
    @Post('query_git_repo')
    query_git_repo(@Body() {URL}:git_repoDTO){
        return this.code_reader_service.query_git_repo(URL);
    }
}
export interface git_repoDTO{
    URL: string
}