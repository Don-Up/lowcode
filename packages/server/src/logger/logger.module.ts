// src/logger/logger.module.ts
import { Global, Module } from "@nestjs/common";
import { LoggerService } from './logger.service';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';

@Global() // 标记为全局模块
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}

// 如果不使用@Global(), 则需要在UserModule中的providers放入LoggerService:
@Module({
  controllers: [UserController],
  providers: [UserService, LoggerService] // 引入
})
export class UserModule {}