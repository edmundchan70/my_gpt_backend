import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {PrismaClient} from ".prisma/client";
import { S3Client  } from "@aws-sdk/client-s3";
@Injectable()
export class S3Service extends S3Client  {
    constructor(){
        super({
            region:process.env.S3_BUCKET_REGION,
            credentials:{
                accessKeyId:process.env.S3_ACCESS_KEY,
                secretAccessKey:process.env.S3_SECRETE_KEY
            }
        });
    }
}
