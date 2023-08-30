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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    hashData(data) {
        return bcrypt.hash(data, 10);
    }
    async verifyToken(token) {
        try {
            return await this.jwtService.verify(token);
        }
        catch (err) {
            throw new common_1.UnauthorizedException("FAIL TO Verify JWT TOKEN");
        }
    }
    async signupLocal({ email, password, firstName, lastName }) {
        const hash = await this.hashData(password);
        const newUser = await this.prisma.user.create({
            data: {
                email: email,
                hash: hash,
                firstName: firstName,
                lastName: lastName
            }
        });
        const tokens = await this.getToken(newUser.id, newUser.email);
        await this.updateRtHash(newUser.id, tokens.refresh_token);
        return tokens;
    }
    async getToken(userId, email) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email: email
            }, {
                secret: process.env.AT_SECRET,
                expiresIn: 60 * 60
            }),
            this.jwtService.signAsync({
                sub: userId,
                email: email
            }, {
                secret: process.env.RT_SECRET,
                expiresIn: 60 * 60 * 24 * 7
            })
        ]);
        return {
            access_token: at,
            refresh_token: rt
        };
    }
    async updateRtHash(userId, refreshToken) {
        const hash = await this.hashData(refreshToken);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRT: hash
            }
        });
    }
    async signInLocal(Body) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: Body.email
            }
        });
        if (!user)
            throw new common_1.ForbiddenException("USER NOT FOUND, Check your email");
        const passwordMatches = await bcrypt.compare(Body.password, user.hash);
        if (!passwordMatches)
            throw new common_1.ForbiddenException("WRONG_CREDENTIALS. Check your email&password");
        const tokens = await this.getToken(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }
    async logOut(userId) {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRT: { not: null }
            }, data: {
                hashedRT: null
            }
        });
    }
    async refreshTokens(userId, refresh_token) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        console.log('refresh_token is called by user : ', userId);
        if (!user)
            throw new common_1.ForbiddenException("NO USER FOUND");
        const rtMatches = await bcrypt.compare(refresh_token, user.hashedRT);
        if (!rtMatches)
            throw new common_1.ForbiddenException("Access denied(Hashes error)");
        const tokens = await this.getToken(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }
    async decode_user_from_token(token) {
        try {
            const decodedData = await this.jwtService.decode(token.slice("Bearer ".length));
            return decodedData;
        }
        catch (error) {
            throw new Error("Unable to decode user information");
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map