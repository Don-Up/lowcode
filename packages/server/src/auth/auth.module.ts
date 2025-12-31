import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; // We'll create this next
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    // 导入User模块
    UserModule,
    // 导入Jwt动态模块, 配置密钥和签名选项
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with a strong secret key
      signOptions: { expiresIn: '60m' }, // Token expires in 60 minutes
    }),
  ],
  // 配置Auth服务和Jwt策略
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}