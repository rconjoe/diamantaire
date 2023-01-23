import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
// eslint-disable-next-line import/no-internal-modules
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest<Request>();
    const content = request?.method + ' -> ' + request?.url;
    return next
      .handle()
      .pipe(tap(() => this.logger.debug(`+++ req: ${content}`, `Request-Response time: ${Date.now() - now}ms`)));
  }
}
