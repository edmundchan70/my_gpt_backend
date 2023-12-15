import { Body, Controller, Headers, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParaPhraserService } from './para-phraser.service';

@Controller('para-phraser')
export class ParaPhraserController {
    constructor(private ParaPhraserService: ParaPhraserService){}
    @Post('uploadFile')
  
    @UseInterceptors(FileInterceptor('document'))
    handleFile(
            @Headers('Authorization') token: string,
            @UploadedFile() file: Express.Multer.File){
         return this.ParaPhraserService.handleFile(file,token);
        }
}
