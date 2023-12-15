/// <reference types="multer" />
import { doc_query_service } from 'src/doc_query/doc_query.service';
export declare class ParaPhraserService {
    private doc_query_service;
    constructor(doc_query_service: doc_query_service);
    handleFile(file: Express.Multer.File, token: string): void;
}
