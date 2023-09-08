export declare class GitService {
    constructor();
    githubLoader(Url: string, branch: string, ignorePath?: string[]): Promise<{
        docs: import("langchain/dist/document").Document<Record<string, any>>[];
    }>;
}
