import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { MyDynamicModule } from 'src/dynamics/dynamic.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MyDynamicModule.register({ folder: './config' }),
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
