import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyFirstExceptionFilter } from './common/filters/my-first.filter';
import { UserMessageService } from './users/services/users-message.service';
import { logger, MyMiddleware } from './common/middlewares/my-md.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      // transform: true,
    }),
  );

  app.use(logger);

  // app.useGlobalFilters(new MyFirstExceptionFilter(new UserMessageService()));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
