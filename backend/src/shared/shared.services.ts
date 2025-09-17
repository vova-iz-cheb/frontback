import { Injectable } from '@nestjs/common';

@Injectable()
export class Helper1 {
  getValue() {
    return 'value 1';
  }
}
