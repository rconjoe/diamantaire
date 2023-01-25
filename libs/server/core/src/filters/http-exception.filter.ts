import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { DateTime } from 'luxon';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter<T> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string' ? { message: exceptionResponse } : (exceptionResponse as Record<string, unknown>);

    if (response && typeof response.status === 'function') {
      response.status(statusCode).json({
        ...error,
        path: request.url,
        timestamp: DateTime.fromJSDate(new Date()).setZone(process.env.TZ).toFormat('dd/MM/yyyy HH:mm:ss'),
      });
    } else {
      return exception;
    }

    return null;
  }
}
