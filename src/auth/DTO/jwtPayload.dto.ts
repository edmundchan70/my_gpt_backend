import { Timestamp } from "rxjs";

export interface jwtPayload {
     sub: number , 
     email: string,
     iat: number , 
     exp:number 
}