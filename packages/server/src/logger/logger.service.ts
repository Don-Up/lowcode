// src/logger/logger.service.ts
import { Injectable } from '@nestjs/common';
import pino from 'pino';

@Injectable()
export class LoggerService {
  private readonly logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  });

  info(message: string, context?: object) {
    this.logger.info(context, message);
  }

  error(message: string, trace?: string, context?: object) {
    this.logger.error({ ...context, trace }, message);
  }

  warn(message: string, context?: object) {
    this.logger.warn(context, message);
  }

  debug(message: string, context?: object) {
    this.logger.debug(context, message);
  }
}