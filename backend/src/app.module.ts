import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import databaseConfig from 'config/database.config';
import Joi from 'joi';
// import * as dotenv from 'dotenv';
// dotenv.config({ path: '.env' });
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { MongModule } from './mong/mong.module';
import { DogsModule } from './dogs/dogs.module';
import { Dog } from './dogs/entities/dog.entity';
import { TestModule } from './test/test.module';
import { PrismaModule } from './prisma-module/prisma.module';
@Module({
  imports: [
    PrismaModule,
    DogsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'example',
      database: 'mydb',
      entities: [Dog],
      synchronize: true,
    }),
    MongModule,
    MongooseModule.forRoot('mongodb://root:example@localhost:27017', {
      dbName: 'mydb',
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      load: [configuration, databaseConfig],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        DATABASE_USER: Joi.string().valid('test1', 'test13').default('21?'),
        PORT: Joi.number().port().default(3000),
      }),
      validationOptions: {
        allowUnknown: true /*false*/,
        abortEarly: false,
        // validatePredefined: false,
      },
      // envFilePath: '.env',
      // expandVariables: false,
    }),
    UsersModule,
    PostsModule,
    SharedModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
