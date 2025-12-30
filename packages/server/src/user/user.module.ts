import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from "../prisma/prisma.module";
import { CaptchaTool } from '../utils/CaptchaTool';
import { SecretTool } from '../utils/SecretTool';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, CaptchaTool, SecretTool]
})
export class UserModule {}