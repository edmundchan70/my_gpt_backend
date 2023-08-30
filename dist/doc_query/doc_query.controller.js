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
exports.doc_query_controller = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const doc_query_service_1 = require("./doc_query.service");
const decorators_1 = require("../common/decorators");
let doc_query_controller = class doc_query_controller {
    constructor(doc_query_service) {
        this.doc_query_service = doc_query_service;
    }
    check_doc_query() {
        console.log("doc_query running");
    }
    chat(chat_body, token) {
        console.log("CONTROLLER: ", chat_body);
        return this.doc_query_service.chat_retrievalQAChain_PINECONE(chat_body, token);
    }
    handle_file(token, Body, file) {
        console.log(file.originalname);
        return this.doc_query_service.file_to_text_chunk(file, token);
    }
    get_user_document_list(token) {
        return this.doc_query_service.get_user_document_list(token);
    }
    get_document_detail(token, { doc_id }) {
        return this.doc_query_service.get_document_detail(token, doc_id);
    }
    generate_summary(token, { doc_id }) {
        return this.doc_query_service.generate_summary(doc_id, token);
    }
    retrieve_conversation(token, { doc_id }) {
        return this.doc_query_service.retrieve_conversation(doc_id, token);
    }
    tester() {
    }
};
__decorate([
    (0, common_1.Get)(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], doc_query_controller.prototype, "check_doc_query", null);
__decorate([
    (0, common_1.Post)('chat'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], doc_query_controller.prototype, "chat", null);
__decorate([
    (0, common_1.Post)('upload_pdf'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('document')),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: "pdf" })
        ]
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], doc_query_controller.prototype, "handle_file", null);
__decorate([
    (0, common_1.Post)("get_user_document_list"),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], doc_query_controller.prototype, "get_user_document_list", null);
__decorate([
    (0, common_1.Post)("get_document_detail"),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], doc_query_controller.prototype, "get_document_detail", null);
__decorate([
    (0, common_1.Post)("generate_summary"),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], doc_query_controller.prototype, "generate_summary", null);
__decorate([
    (0, common_1.Post)("retrieve_conversation"),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], doc_query_controller.prototype, "retrieve_conversation", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("test"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], doc_query_controller.prototype, "tester", null);
doc_query_controller = __decorate([
    (0, common_1.Controller)('doc_query'),
    __metadata("design:paramtypes", [doc_query_service_1.doc_query_service])
], doc_query_controller);
exports.doc_query_controller = doc_query_controller;
//# sourceMappingURL=doc_query.controller.js.map