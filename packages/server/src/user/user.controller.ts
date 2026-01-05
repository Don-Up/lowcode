import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserAgent, GetUserIp } from '../utils/GetUserInfo';
import { CaptchaDto } from './dto/captcha.dto';
import { SecretTool } from '../utils/SecretTool';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly secretTool: SecretTool
              ) {}

  @Post("captcha")
  async getCaptcha(@Body() body: CaptchaDto, @GetUserIp() ip: string, @GetUserAgent() agent: string) {
    const { type } = body
    const _key = this.secretTool.getSecret(`${ip}${agent}`)
    return this.userService.getCaptcha(_key, type)
  }

  @Get()
  async getAllUsers() {
    return this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}