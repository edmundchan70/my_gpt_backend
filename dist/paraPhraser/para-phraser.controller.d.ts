/// <reference types="multer" />
import { ParaPhraserService } from './para-phraser.service';
export declare class ParaPhraserController {
    private ParaPhraserService;
    constructor(ParaPhraserService: ParaPhraserService);
    handleFile(token: string, file: Express.Multer.File): void;
}
