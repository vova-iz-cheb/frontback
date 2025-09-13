import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  getText() {
    return 'text from POST service';
  }
}
