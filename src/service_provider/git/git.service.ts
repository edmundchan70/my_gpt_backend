import { Injectable } from '@nestjs/common';
import { GithubRepoLoader } from "langchain/document_loaders/web/github";

 
@Injectable()
export class GitService {
    constructor(){}
    async githubLoader(Url: string , branch: string,ignorePath: string[]=["*.md"]){
        console.log(ignorePath)
        const loader = new GithubRepoLoader(
            Url,{
         
                branch: branch, 
                recursive:true,
                unknown:"warn",
                ignoreFiles:ignorePath,
                //verbose:true,
                accessToken:''
                })
        const docs = await loader.load();
        console.log({docs})
        return {docs}
    }
}
