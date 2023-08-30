"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doc_query_module = void 0;
const common_1 = require("@nestjs/common");
const doc_query_controller_1 = require("../doc_query/doc_query.controller");
const doc_query_service_1 = require("./doc_query.service");
const config_1 = require("@nestjs/config");
const openAi_module_1 = require("../openAI/openAi.module");
const pinecone_module_1 = require("../pinecone/pinecone.module");
const jwt_1 = require("@nestjs/jwt");
const prisma_module_1 = require("../prisma/prisma.module");
const S3_module_1 = require("../S3/S3.module");
const auth_service_1 = require("../auth/auth.service");
const pinecone_service_1 = require("../pinecone/pinecone.service");
const pinecone_1 = require("@pinecone-database/pinecone");
let doc_query_module = class doc_query_module {
};
doc_query_module = __decorate([
    (0, common_1.Module)({
        imports: [openAi_module_1.openAiModule, config_1.ConfigModule.forRoot(), pinecone_module_1.pineconeModule, jwt_1.JwtModule.register({}), prisma_module_1.PrismaModule, S3_module_1.S3_Module],
        controllers: [doc_query_controller_1.doc_query_controller],
        providers: [doc_query_service_1.doc_query_service, auth_service_1.AuthService, pinecone_service_1.pineconeService, pinecone_1.PineconeClient],
    })
], doc_query_module);
exports.doc_query_module = doc_query_module;
;
//# sourceMappingURL=doc_query.module.js.map