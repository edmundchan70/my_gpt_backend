import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {PrismaClient} from ".prisma/client";
@Injectable()
export class PrismaService extends PrismaClient 
    implements OnModuleInit, OnModuleDestroy{
    constructor(){
        super({
            datasources: {
                db:{
                    url: process.env.PROD_DB_URL,
                }
            }
        });
    }
    async  onModuleDestroy() {
        await this.$connect()
    }
    async onModuleInit() {
        await this.$disconnect()
    }
}
