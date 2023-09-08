"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pineconeModule = void 0;
const common_1 = require("@nestjs/common");
const pinecone_service_1 = require("./pinecone.service");
const config_1 = require("@nestjs/config");
const pinecone_1 = require("@pinecone-database/pinecone");
let pineconeModule = class pineconeModule {
};
pineconeModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot()],
        providers: [pinecone_service_1.pineconeService, pinecone_1.PineconeClient],
        exports: [pinecone_service_1.pineconeService]
    })
], pineconeModule);
exports.pineconeModule = pineconeModule;
;
//# sourceMappingURL=pinecone.module.js.map