import { Injectable } from '@nestjs/common';

@Injectable()
export class MyLazyService {
  findAll() {
    return ['I', 'am', 'lazy'];
  }
}
