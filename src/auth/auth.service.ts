import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './DTO';
import *  as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './DTO/jwtPayload.dto';
import { signUpDto } from './DTO/signUp.dto';
import { user_info } from './DTO/user_info.dto';
 
@Injectable()
export class AuthService {
    constructor(private prisma : PrismaService,
        private jwtService : JwtService
        ){}
    hashData(data:string ){
        return bcrypt.hash(data,10);
    }
   
    async verifyToken(token:string){
        try{
            return await this.jwtService.verify(token);
        }catch(err:any){
            throw new UnauthorizedException("FAIL TO Verify JWT TOKEN")
        }
       
    }
    async signupLocal({email,password,firstName,lastName} : signUpDto){
        const hash = await this.hashData(password);
        const newUser = await this.prisma.user.create({
            data:{
                email: email,
                hash: hash,
                firstName:firstName,
                lastName:lastName
            }
        })
        const tokens = await this.getToken(
            newUser.id,
            newUser.email
        )
        await this.updateRtHash(newUser.id,tokens.refresh_token)
        return tokens
    } 
    async getToken(userId:number , email :string){
        const [at,rt] = await Promise.all([
            this.jwtService.signAsync({
                sub:userId,
                email: email
            }, {
                secret: process.env.AT_SECRET,
                expiresIn: 60*60
            }
        ),
        this.jwtService.signAsync({
            sub:userId,
            email: email
        }, {
            secret: process.env.RT_SECRET,
            expiresIn: 60*60*24*7
        }
    )
        ])
    
        return {
            access_token :at,
            refresh_token: rt
        }

       
    }
    async updateRtHash(userId: number , refreshToken:string){
         const hash = await this.hashData(refreshToken);
         await this.prisma.user.update({
            where:{
                 id:userId,
            },
            data:{
                hashedRT:hash
            }
         })
    } 
    async signInLocal( Body : AuthDto){
        const user = await this.prisma.user.findUnique({
            where:{
                email:Body.email
            }
        })
        if (!user) throw new ForbiddenException("USER NOT FOUND, Check your email");
        const passwordMatches = await bcrypt.compare(Body.password , user.hash);
        if(!passwordMatches)  throw new ForbiddenException("WRONG_CREDENTIALS. Check your email&password");
        
        //finish validating user
        const tokens = await this.getToken(user.id,user.email);
        await this.updateRtHash(user.id,tokens.refresh_token);
        return  tokens
    } 
    async logOut(userId:number){
        await this.prisma.user.updateMany({
        where:{
            id: userId,
            hashedRT:{not:null}
        },data:{
            hashedRT: null
        }})
    }
    async refreshTokens(userId: number , refresh_token :string){
        const user = await this.prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        console.log('refresh_token is called by user : ' , userId)
        if(!user) throw new ForbiddenException("NO USER FOUND");
        const rtMatches = await bcrypt.compare(refresh_token,user.hashedRT);
        if(!rtMatches) throw new ForbiddenException("Access denied(Hashes error)")
        //validation complete, update new rtHash
        const tokens = await this.getToken(user.id,user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens; 

    }     
    async decode_user_from_token(token:string) :Promise<user_info>{
        try {
          const decodedData = await this.jwtService.decode(token.slice("Bearer ".length));
          return decodedData as user_info;
        } catch (error) {
          // Handle error, if needed
          throw new Error("Unable to decode user information");
        }
      }
}
