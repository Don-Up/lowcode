/**
 * ⾃定义参数装饰器
 * GetUserIp 从Request中获取⽤户的ip
 * GetUserAgent 从Request中获取⽤户的UA
 */
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

const GetUserIp = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.ip.match(/\d+\.\d+\.\d+\.\d+/)?.join('.');
});

const GetUserAgent = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.headers['user-agent'];
});

// 获取⽤户的所有信息参数装饰器
const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
})

export { GetUserIp, GetUserAgent, GetUser };