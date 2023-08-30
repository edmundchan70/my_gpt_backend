"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3_Module = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const S3_service_1 = require("./S3.service");
let S3_Module = class S3_Module {
};
S3_Module = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot()],
        providers: [S3_service_1.S3Service],
        exports: [S3_service_1.S3Service]
    })
], S3_Module);
exports.S3_Module = S3_Module;
//# sourceMappingURL=S3.module.js.map