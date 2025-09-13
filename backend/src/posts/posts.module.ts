import { Global, Module } from '@nestjs/common';
import { PostService } from './posts.service';

// @Global()
@Module({
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
