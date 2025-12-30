import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class RedisService implements OnModuleDestroy {
  public readonly client: Redis;
  constructor(private readonly logger: LoggerService) {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      // password: process.env.REDIS_PASSWORD,
      lazyConnect: false, // Optional: connect immediately (default is true in newer versions)
      retryStrategy: (times) => Math.min(times * 50, 2000), // Optional: nice retry behavior
    });

    // Successful connection
    this.client.on('connect', () => {
      this.logger.info('Redis client is connecting...');
    });

    this.client.on('ready', () => {
      this.logger.info('Redis connection established successfully!');
    });

    // Reconnection events
    this.client.on('reconnecting', (ms) => {
      this.logger.info(`Redis reconnecting in ${ms}ms...`);
    });

    // Errors (including connection refused)
    this.client.on('error', (err) => {
      this.logger.error('Redis connection error:', err.message);
    });

    // When connection is closed
    this.client.on('close', () => {
      this.logger.warn('Redis connection closed');
    });

    this.client.on('end', () => {
      this.logger.error('Redis connection ended (no more retries)');
    });
  }

  async onModuleDestroy() {
    this.logger.info('Shutting down Redis client...');
    await this.client.quit();
  }
}