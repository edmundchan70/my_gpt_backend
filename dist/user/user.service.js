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
exports.user_service = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const prisma_service_1 = require("../prisma/prisma.service");
let user_service = class user_service {
    constructor(prisma, authService) {
        this.prisma = prisma;
        this.authService = authService;
    }
    async get_user_info(token) {
        const { sub, email } = await this.authService.decode_user_from_token(token);
        console.log(sub, 'get_user_infoz');
        const { firstName, lastName } = await this.prisma.user.findUnique({
            where: {
                id: sub
            }
        });
        console.log({
            firstName: firstName,
            lastName: lastName,
            email: email
        });
        return {
            firstName: firstName,
            lastName: lastName,
            email: email
        };
    }
};
user_service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], user_service);
exports.user_service = user_service;
//# sourceMappingURL=user.service.js.map