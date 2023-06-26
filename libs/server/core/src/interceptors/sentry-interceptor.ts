import { ExecutionContext, Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(null, (exception) => {
        // CAPTURE ERROR IN SENTRY
        Sentry.captureException(exception);
      }),
    );
  }
}
