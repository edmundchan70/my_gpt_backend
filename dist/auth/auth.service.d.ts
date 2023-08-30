import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './DTO';
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './DTO/signUp.dto';
import { user_info } from './DTO/user_info.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    hashData(data: string): any;
    verifyToken(token: string): Promise<any>;
    signupLocal({ email, password, firstName, lastName }: signUpDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    getToken(userId: number, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRtHash(userId: number, refreshToken: string): Promise<void>;
    signInLocal(Body: AuthDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logOut(userId: number): Promise<void>;
    refreshTokens(userId: number, refresh_token: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    decode_user_from_token(token: string): Promise<user_info>;
}
