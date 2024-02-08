import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const configService = app.get(ConfigService);

  app.use(
    cookieSession({
      keys: [configService.get<string>('cookie_session_key')],
    }),
  );

  const port = configService.get<number>('port');
  await app.listen(port);
}
bootstrap();
