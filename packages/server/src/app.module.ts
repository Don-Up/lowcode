import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisModule } from './redis/redis.module'; // Modern Redis store

@Module({
  imports: [
    PrismaModule,
    UserModule,
    LoggerModule,
    RedisModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      // password: process.env.REDIS_PASSWORD, // if needed
      ttl: 300, // default TTL in seconds (optional)
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
