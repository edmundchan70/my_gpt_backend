import { Controller, Headers, Post } from "@nestjs/common";
import { user_service } from "./user.service";
import { detail_user_info } from "./DTO/detail_user_info.dto";
 

@Controller('user')
export class user_controller{
    constructor(
        private user_service : user_service,
    ){}
    @Post('get_user_info')
    get_user_info(@Headers ('Authorization') token: string) : Promise<detail_user_info>{
        return  this.user_service.get_user_info(token);
    }
}