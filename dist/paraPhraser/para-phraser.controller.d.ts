/// <reference types="multer" />
import { ParaPhraserService } from './para-phraser.service';
export declare class ParaPhraserController {
    private ParaPhraserService;
    constructor(ParaPhraserService: ParaPhraserService);
    handle_file(token: string, Body: any, file: Express.Multer.File): void;
}
