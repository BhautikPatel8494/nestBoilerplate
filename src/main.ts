import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { ConfigService } from './config/services/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useStaticAssets(path.join(__dirname, '../upload'));
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listenAsync(port);
  // tslint:disable-next-line: no-console
  console.log('Server running on port:', port);
}
bootstrap();
