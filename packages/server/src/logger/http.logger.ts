// src/logger/http.logger.ts
import pinoHttp from 'pino-http';
import { LoggerService } from './logger.service';

export const httpLogger = (logger: LoggerService) => {
  return pinoHttp({
    logger: logger['logger'],
    customLogLevel: function (req, res, err) {
      // pino-http provides req/res objects with proper timing
      if (err) return 'error';

      // Now properly checks the finalized status code
      if (res.statusCode >= 500) return 'error';
      if (res.statusCode >= 400) return 'warn';
      if (res.statusCode >= 300) return 'debug'; // or 'silent' to skip logging redirects
      return 'info';
    },
    // autoLogging: {
    //   ignore: (req) => req.url === '/health' // Skip health checks
    // },
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url,
          headers: {
            'user-agent': req.headers['user-agent'],
          },
        };
      },
      res(res) {
        return {
          status: res.statusCode,
        };
      },
    },
  });
};