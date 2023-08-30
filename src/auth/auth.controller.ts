import { Body, Controller, Headers, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './DTO';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';
import { signUpDto } from './DTO/signUp.dto';
 
 
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
 
    @Public()
    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() Body: signUpDto) : Promise<Tokens>{
        return this.authService.signupLocal(Body);
    }
    @Public()
    @Post('local/signIn')
    @HttpCode(HttpStatus.OK)
    signInLocal(@Body() Body : AuthDto) : Promise<Tokens>{
       return this.authService.signInLocal(Body);
    }
   
 
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logOut(@GetCurrentUserId() userId: number){
       
        return this.authService.logOut(userId);
    } 
     
    @Public()
    @Post('refresh')
    @UseGuards(RtGuard)
    @HttpCode(HttpStatus.OK)
    refreshTokens( 
                 @Headers('Authorization') token: string,
                  @GetCurrentUserId() userId  :number,
                  @GetCurrentUser('refreshToken') refreshToken :string){
                    console.log(token)
        console.log(userId, refreshToken)
        return this.authService.refreshTokens(userId,refreshToken)
    }
    @Public()
    @Post("verifyToken")
    verifyToken(
        @Headers('Authorization') token: string
    ){
        return this.authService.verifyToken(token)
    }
}
