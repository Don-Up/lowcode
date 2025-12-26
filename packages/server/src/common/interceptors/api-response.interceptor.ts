// api-response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Handle custom response format with _data and _message
        if (data && '_data' in data) {
          return {
            success: true,
            data: data._data,  // Extract the actual data
            message: data._message || '',  // Use the custom message
          };
        }

        // Default response format
        return {
          success: true,
          data: data,
          message: context.switchToHttp().getResponse().statusMessage || 'request successfully',
        };
      }),
    );
  }
}