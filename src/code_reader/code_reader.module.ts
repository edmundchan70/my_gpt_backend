import { Module } from '@nestjs/common';
 
import { CodeReaderService } from './code_reader.service';
import { CodeReaderController } from './code_reader.controller';

@Module({
  controllers: [CodeReaderController],
  providers: [CodeReaderService]
})
export class CodeReaderModule {}
