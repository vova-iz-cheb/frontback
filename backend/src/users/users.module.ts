import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './services/users.controller';
import { UsersService } from './users.service';
import { APP_FILTER } from '@nestjs/core';
import { MyFirstExceptionFilter } from 'src/common/filters/my-first.filter';
import { UserMessageService } from './services/users-message.service';
import { AppService } from 'src/app.service';
import { PostService } from 'src/posts/posts.service';
import { AppModule } from 'src/app.module';
import { PostModule } from 'src/posts/posts.module';
import { logger, MyMiddleware } from 'src/common/middlewares/my-md.middleware';

@Module({
  imports: [PostModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserMessageService,
    // PostService, //
    // {
    //   provide: APP_FILTER,
    //   useClass: MyFirstExceptionFilter,
    // },
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyMiddleware).forRoutes('users');
  }
}
