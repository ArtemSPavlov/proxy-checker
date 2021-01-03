import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if(status && status >= 400 && status < 500){
        response
        .status(status)
        .json(exception.getResponse());
    } else {
        response
        .json((new InternalServerErrorException()).getResponse());
    }



    console.log('Exeption: ', exception);
    console.log('Host: ', host);
  }
}