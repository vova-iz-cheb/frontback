import { Global, Injectable } from '@nestjs/common';

// @Global()
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
