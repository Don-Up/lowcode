import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService,
              private readonly logger: LoggerService) {}

  // Fetch all users
  async getUsers() {
    this.logger.info('Fetching all users');
    return this.prisma.user.findMany();
  }

  // Create a new user
  async createUser(data: { email: string; name: string }) {
    return this.prisma.user.create({ data });
  }
}