import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private httpAdapter: AbstractHttpAdapter;

  constructor(httpAdapterHost: HttpAdapterHost) {
    this.httpAdapter = httpAdapterHost.httpAdapter;
  }

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              message: exception.message,
              path: request.path,
            },
          };

    this.httpAdapter.reply(context.getResponse(), body, status);
  }
}
