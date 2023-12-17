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
exports.ParaPhraserService = void 0;
const common_1 = require("@nestjs/common");
const doc_query_service_1 = require("../doc_query/doc_query.service");
let ParaPhraserService = class ParaPhraserService {
    file_to_text_chunk(file, token) {
        throw new Error('Method not implemented.');
    }
    constructor(doc_query_service) {
        this.doc_query_service = doc_query_service;
    }
    handleFile(file, token) {
        this.doc_query_service.file_to_text_chunk(file, token);
    }
};
ParaPhraserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [doc_query_service_1.doc_query_service])
], ParaPhraserService);
exports.ParaPhraserService = ParaPhraserService;
//# sourceMappingURL=para-phraser.service.js.map