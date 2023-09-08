"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitService = void 0;
const common_1 = require("@nestjs/common");
const github_1 = require("langchain/document_loaders/web/github");
let GitService = class GitService {
    constructor() { }
    async githubLoader(Url, branch, ignorePath = ["*.md"]) {
        console.log(ignorePath);
        const loader = new github_1.GithubRepoLoader(Url, {
            branch: branch,
            recursive: true,
            unknown: "warn",
            ignoreFiles: ignorePath,
            accessToken: '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'
        });
        const docs = await loader.load();
        console.log({ docs });
        return { docs };
    }
};
GitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GitService);
exports.GitService = GitService;
//# sourceMappingURL=git.service.js.map