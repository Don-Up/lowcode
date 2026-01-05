import { Module } from '@nestjs/common';
import { LowCodeService } from './low-code.service';
import { LowCodeController } from './low-code.controller';

@Module({
  controllers: [LowCodeController],
  providers: [LowCodeService],
})
export class LowCodeModule {}
