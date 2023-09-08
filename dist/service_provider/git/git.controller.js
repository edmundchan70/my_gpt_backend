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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitController = void 0;
const common_1 = require("@nestjs/common");
const git_service_1 = require("./git.service");
const githubLoader_dto_1 = require("./DTO/githubLoader.dto");
const decorators_1 = require("../../common/decorators");
let GitController = class GitController {
    constructor(gitService) {
        this.gitService = gitService;
    }
    githubLoader({ Url, branch, ignorePath }) {
        return this.gitService.githubLoader(Url, branch, ignorePath);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('githubLoader'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [githubLoader_dto_1.githubLoader]),
    __metadata("design:returntype", void 0)
], GitController.prototype, "githubLoader", null);
GitController = __decorate([
    (0, common_1.Controller)('git'),
    __metadata("design:paramtypes", [git_service_1.GitService])
], GitController);
exports.GitController = GitController;
//# sourceMappingURL=git.controller.js.map