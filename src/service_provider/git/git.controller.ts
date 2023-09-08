import { Body, Controller, Post } from '@nestjs/common';
import { GitService } from './git.service';
import { githubLoader } from './DTO/githubLoader.dto';
import { Public } from 'src/common/decorators';

@Controller('git')
export class GitController {
    constructor(private gitService: GitService){}
    @Public()
    @Post('githubLoader')
    githubLoader(@Body() {Url,branch,ignorePath} : githubLoader){
    return this.gitService.githubLoader(Url,branch,ignorePath);
    }
}
