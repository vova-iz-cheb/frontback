import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class UserMessageService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  getTextToOutside() {
    console.log('>> 2 text from UserMessageService');
  }

  getText() {
    console.log('>> 1 text from UserMessageService');

    this.usersService.getTextToOutside();

    return 'asdf';
  }
}
