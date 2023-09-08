import { Injectable } from '@nestjs/common';
import {GithubRepoLoader} from "langchain/document_loaders/web/github"
import { YoutubeLoader } from "langchain/document_loaders/web/youtube";

@Injectable()
export class CodeReaderService {
    constructor(){}
    query_git_repo(URL: string){
        console.log(URL);
    }
}
