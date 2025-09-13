import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyFirstExceptionFilter } from './common/filters/my-first.filter';
import { UserMessageService } from './users/services/users-message.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  // app.useGlobalFilters(new MyFirstExceptionFilter(new UserMessageService()));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
