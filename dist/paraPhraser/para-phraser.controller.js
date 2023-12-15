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
exports.ParaPhraserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const para_phraser_service_1 = require("./para-phraser.service");
let ParaPhraserController = class ParaPhraserController {
    constructor(ParaPhraserService) {
        this.ParaPhraserService = ParaPhraserService;
    }
    handleFile(token, file) {
        return this.ParaPhraserService.handleFile(file, token);
    }
};
__decorate([
    (0, common_1.Post)('uploadFile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('document')),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ParaPhraserController.prototype, "handleFile", null);
ParaPhraserController = __decorate([
    (0, common_1.Controller)('para-phraser'),
    __metadata("design:paramtypes", [para_phraser_service_1.ParaPhraserService])
], ParaPhraserController);
exports.ParaPhraserController = ParaPhraserController;
//# sourceMappingURL=para-phraser.controller.js.map