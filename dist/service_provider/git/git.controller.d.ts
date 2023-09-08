import { GitService } from './git.service';
import { githubLoader } from './DTO/githubLoader.dto';
export declare class GitController {
    private gitService;
    constructor(gitService: GitService);
    githubLoader({ Url, branch, ignorePath }: githubLoader): Promise<{
        docs: import("langchain/dist/document").Document<Record<string, any>>[];
    }>;
}
