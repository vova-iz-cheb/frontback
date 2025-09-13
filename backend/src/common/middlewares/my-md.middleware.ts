import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    console.log('*** MODULE MyMiddleware');
    // console.log('req', req);

    next();
  }
}

export const logger = (req: any, res: any, next: (error?: any) => void) => {
  console.log('*** GLOBAL logger middleware');
  // console.log('req', req);
  // throw new Error('123');

  next();
};
