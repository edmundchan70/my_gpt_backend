import { Module } from '@nestjs/common';
import { ParaPhraserController } from './para-phraser.controller';
import { ParaPhraserService } from './para-phraser.service';

@Module({
    imports:[],
    controllers:[ParaPhraserController],
    providers:[ParaPhraserService]
})
export class ParaPhraserModule {
}
