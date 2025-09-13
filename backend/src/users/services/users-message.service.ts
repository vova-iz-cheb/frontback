import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMessageService {
  getText() {
    return 'text from UserMessageService';
  }
}
