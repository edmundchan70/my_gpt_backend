import { user_service } from "./user.service";
import { detail_user_info } from "./DTO/detail_user_info.dto";
export declare class user_controller {
    private user_service;
    constructor(user_service: user_service);
    get_user_info(token: string): Promise<detail_user_info>;
}
