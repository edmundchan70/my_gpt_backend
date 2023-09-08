import { CodeReaderService } from './code_reader.service';
export declare class CodeReaderController {
    private code_reader_service;
    constructor(code_reader_service: CodeReaderService);
    query_git_repo({ URL }: git_repoDTO): void;
}
export interface git_repoDTO {
    URL: string;
}
