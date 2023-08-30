import { AuthService } from './auth.service';
import { AuthDto } from './DTO';
import { Tokens } from './types';
import { signUpDto } from './DTO/signUp.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signupLocal(Body: signUpDto): Promise<Tokens>;
    signInLocal(Body: AuthDto): Promise<Tokens>;
    logOut(userId: number): Promise<void>;
    refreshTokens(token: string, userId: number, refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    verifyToken(token: string): Promise<any>;
}
