"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const doc_query_module_1 = require("../doc_query/doc_query.module");
const openAi_module_1 = require("../service_provider/openAI/openAi.module");
const prisma_module_1 = require("../prisma/prisma.module");
const user_module_1 = require("../user/user.module");
const pinecone_module_1 = require("../service_provider/pinecone/pinecone.module");
const git_module_1 = require("../service_provider/git/git.module");
const test_module_1 = require("../test/test.module");
const para_phraser_module_1 = require("../paraPhraser/para-phraser.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, doc_query_module_1.doc_query_module, openAi_module_1.openAiModule, prisma_module_1.PrismaModule, user_module_1.user_Module, pinecone_module_1.pineconeModule, git_module_1.GitModule, test_module_1.TestModule, para_phraser_module_1.ParaPhraserModule],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map