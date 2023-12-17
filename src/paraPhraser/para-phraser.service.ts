import { Injectable } from '@nestjs/common';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { doc_query_service } from 'src/doc_query/doc_query.service';
@Injectable()
export class ParaPhraserService {
    file_to_text_chunk(file: Express.Multer.File, token: string) {
            throw new Error('Method not implemented.');
    }
    constructor(private doc_query_service: doc_query_service){}
    handleFile(file: Express.Multer.File,token: string) {
        this.doc_query_service.file_to_text_chunk(file,token);
    }

}
