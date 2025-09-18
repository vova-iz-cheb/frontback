import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { APP_FILTER } from '@nestjs/core';
import { MyFirstExceptionFilter } from 'src/common/filters/my-first.filter';
import { UserMessageService } from './services/users-message.service';
import { AppService } from 'src/app.service';
import { AppModule } from 'src/app.module';
import { logger, MyMiddleware } from 'src/common/middlewares/my-md.middleware';
import { SharedModule } from 'src/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import databaseConfig from 'config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MyDynamicModule, SecondModule } from 'src/dynamics/dynamic.module';

@Module({
  imports: [
    SecondModule,
    MyDynamicModule.register({ folder: './config' }),
    TypeOrmModule.forFeature([User]),
    // ConfigModule.forFeature(configuration),
    // ConfigModule.forFeature(databaseConfig),
  ],
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
