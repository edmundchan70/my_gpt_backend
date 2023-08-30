import { Injectable } from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
type JwtPayLoad = {
    sub: string ;
    email: string;    
}
@Injectable()
export class AtStrategy extends PassportStrategy (Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.AT_SECRET,
            ignoreExpiration: false,
            passReqToCallback:true
        });
    }
    async validate(payload: JwtPayLoad){
        return payload;
    }
}