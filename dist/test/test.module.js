"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModule = void 0;
const common_1 = require("@nestjs/common");
const test_service_1 = require("./test.service");
const test_controller_1 = require("./test.controller");
const openAi_module_1 = require("../service_provider/openAI/openAi.module");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_module_1 = require("../prisma/prisma.module");
const S3_module_1 = require("../service_provider/S3/S3.module");
let TestModule = class TestModule {
};
TestModule = __decorate([
    (0, common_1.Module)({
        imports: [openAi_module_1.openAiModule, config_1.ConfigModule.forRoot(), jwt_1.JwtModule.register({}), prisma_module_1.PrismaModule, S3_module_1.S3_Module],
        providers: [test_service_1.TestService],
        controllers: [test_controller_1.TestController]
    })
], TestModule);
exports.TestModule = TestModule;
//# sourceMappingURL=test.module.js.map