import { Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { Public } from 'src/common/decorators';

@Controller('test')
export class TestController {
    constructor(private testService: TestService){}
    @Public()
    @Get('')
    testRunning(){
        return "test is runnign";
    }
    @Public()
    @Post('/analyzeImage')
    testImg(){
        return this.testService.analyzeImage();
    }
}
