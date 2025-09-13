import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PostService } from 'src/posts/posts.service';
import { UserMessageService } from 'src/users/services/users-message.service';

@Catch()
export class MyFirstExceptionFilter implements ExceptionFilter {
  constructor(
    private anyDIDep: UserMessageService,
    private postService: PostService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    console.log('***Filter exception', exception);

    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception?.getStatus?.();

    const text = this.anyDIDep.getText();

    const text2 = this.postService.getText();

    return res.status(200).json({
      statusCode: 500,
      text,
    });
  }
}
