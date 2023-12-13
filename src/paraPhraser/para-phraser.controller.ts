import { Body, Controller, Headers, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('para-phraser')
export class ParaPhraserController {
    constructor(private ParaPhraserService: ParaPhraserService)
    @Post('uploadFile')
    @UseInterceptors(FileInterceptor('document'))
    handle_file(
            @Headers('Authorization') toekn: string,
            @Body() Body :any, //change  
            @UploadedFile() file: Express.Multer.File){
         
        }
}
