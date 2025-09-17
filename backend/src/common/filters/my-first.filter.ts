import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserMessageService } from 'src/users/services/users-message.service';

@Catch()
export class MyFirstExceptionFilter implements ExceptionFilter {
  constructor(private anyDIDep: UserMessageService) {}

  catch(exception: any, host: ArgumentsHost) {
    console.log('***Filter exception', exception);

    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const text = this.anyDIDep.getText();

    return res.status(200).json({
      statusCode: 500,
      text,
    });
  }
}
