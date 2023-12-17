import { Body, Controller, FileTypeValidator, Headers, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParaPhraserService } from './para-phraser.service';

@Controller('para-phraser')
export class ParaPhraserController {
    constructor(private ParaPhraserService: ParaPhraserService){}
    @Post('uploadFile')
    @UseInterceptors(FileInterceptor('document'))
    handle_file(
        @Headers('Authorization') token: string,
        @Body() Body :any, //change  
        @UploadedFile(
        new ParseFilePipe({
            validators:[
                new FileTypeValidator({fileType: "pdf"})]
        })) file: Express.Multer.File){
            console.log(file.originalname)
    return this.ParaPhraserService.file_to_text_chunk(file,token)

    }
}
