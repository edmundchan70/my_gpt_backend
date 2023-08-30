import { Controller, UseInterceptors, UploadedFile, Post, ParseFilePipe, FileTypeValidator,Response, Body, Get, Headers, Res, Header   } from '@nestjs/common';
 import {FileInterceptor} from "@nestjs/platform-express"
import { doc_query_service } from './doc_query.service';
import { chat_body } from './DTO/chat_body.dto';
import { config_text_chunk } from 'src/doc_query/DTO/config_text_chunk.dto';
import { Public } from 'src/common/decorators';
import { S3Service } from 'src/S3/S3.service';
import { Document_id } from './DTO/Document_id.dto';
 
 
 
 
 
@Controller('doc_query')
export class doc_query_controller {
    constructor(private doc_query_service : doc_query_service){}

    @Get("")
    check_doc_query(){
        console.log("doc_query running");
    }
    @Post('chat')
    chat(@Body()chat_body : chat_body ,
         @Headers('Authorization') token: string){
            console.log("CONTROLLER: ", chat_body)
        return this.doc_query_service.chat_retrievalQAChain_PINECONE(chat_body,token);
    }
 
    @Post('upload_pdf')
    @UseInterceptors(FileInterceptor('document'))
    handle_file(
        @Headers('Authorization') token: string,
        @Body() Body :any, //change  
        @UploadedFile(
        new ParseFilePipe({
            validators:[
                new FileTypeValidator({fileType: "pdf"})]
        })) file: Express.Multer.File)
        {
            console.log(file.originalname)
    return this.doc_query_service.file_to_text_chunk(file,token)

    }

    @Post("get_user_document_list")
    get_user_document_list(
        @Headers('Authorization') token: string
    ){
        return this.doc_query_service.get_user_document_list(token)
    }
    @Post("get_document_detail")
    get_document_detail(
        @Headers('Authorization') token: string,
        @Body() {doc_id} : Document_id
    ){
        return this.doc_query_service.get_document_detail(token,doc_id);
    }
    @Post("generate_summary")
    generate_summary(     
        @Headers('Authorization') token: string,
        @Body() {doc_id} : Document_id){
        return this.doc_query_service.generate_summary(doc_id,token);
    }
    @Post("retrieve_conversation")
    retrieve_conversation(
        @Headers('Authorization') token: string,
        @Body() {doc_id} : Document_id){
            return this.doc_query_service.retrieve_conversation(doc_id,token);
        }
    
    //tester
    @Public()
    @Post("test")
    tester(
    ){
       // return this.doc_query_service.generate_summary('de5d12f8-34bb-4120-adfc-e0db7c7ef887',1);
    }
}



 






 