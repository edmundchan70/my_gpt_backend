import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { detail_user_info } from "./DTO/detail_user_info.dto";
export declare class user_service {
    private prisma;
    private authService;
    constructor(prisma: PrismaService, authService: AuthService);
    get_user_info(token: string): Promise<detail_user_info>;
}
