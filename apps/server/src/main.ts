import { HttpExceptionFilter, LoggingInterceptor } from '@diamantaire/server/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import xss from 'xss-clean';

import { AppModule } from './app/app.module';

declare const module: any;

process.env.NODE_ENV === 'development' ? mongoose.set('debug', true) : null;

async function bootstrap() {
  process.env.TZ = 'UTC';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const env: string = configService.get<string>('app.nodeEnv');

  //app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );
  app.use(cookieParser());
  app.use([compression(), xss(), hpp(), mongoSanitize()]);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const options = new DocumentBuilder()
    .setTitle('Vrai Server API')
    .setDescription('API docs')
    //.setVersion(version)
    //.addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('app.port'));

  Logger.log(`==========================================================`);
  Logger.log(`Environment: ${env}`, `NestApplication`);
  Logger.log(`Server is up. ${`+${performance.now() | 0}ms`}`);

  Logger.log(`==========================================================`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  return configService.get('app.port');
}

bootstrap().then((port) => Logger.log(`🚀 App successfully started on port ${port} !`));
