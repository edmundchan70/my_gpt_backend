import { Strategy } from "passport-jwt";
type JwtPayLoad = {
    sub: string;
    email: string;
};
declare const AtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtStrategy extends AtStrategy_base {
    constructor();
    validate(payload: JwtPayLoad): Promise<JwtPayLoad>;
}
export {};
