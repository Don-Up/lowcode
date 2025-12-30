import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../logger/logger.service';
import { CaptchaTool } from '../utils/CaptchaTool';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService,
              private readonly logger: LoggerService,
              private readonly captchaTool: CaptchaTool,
              private readonly redis: RedisService,
  ) {
  }

  // Fetch all users
  async getUsers() {
    this.logger.info('Fetching all users');
    return this.prisma.user.findMany();
  }

  // Create a new user
  async createUser(data: { email: string; name: string }) {
    return this.prisma.user.create({ data });
  }

  async getCaptcha(key: string, type: string) {
    const svgCaptcha = await this.captchaTool.captche();

    await this.redis.client.set(`${type}:captcha:${key}`, svgCaptcha.text, 'EX', 600);

    return { data: svgCaptcha.data, text: svgCaptcha.text };
  }
}