"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeReaderModule = void 0;
const common_1 = require("@nestjs/common");
const code_reader_service_1 = require("./code_reader.service");
const code_reader_controller_1 = require("./code_reader.controller");
let CodeReaderModule = class CodeReaderModule {
};
CodeReaderModule = __decorate([
    (0, common_1.Module)({
        controllers: [code_reader_controller_1.CodeReaderController],
        providers: [code_reader_service_1.CodeReaderService]
    })
], CodeReaderModule);
exports.CodeReaderModule = CodeReaderModule;
//# sourceMappingURL=code_reader.module.js.map