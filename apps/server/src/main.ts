import fs from 'fs';

import { HttpExceptionFilter, LoggingInterceptor, SentryInterceptor } from '@diamantaire/server/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import basicAuth from 'express-basic-auth';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';

import { AppModule } from './app/app.module';

declare const module: any;

process.env.NODE_ENV === 'development' ? mongoose.set('debug', true) : null;
const SENTRY_ENVS = ['staging', 'production'];
const SWAGGER_ENVS = ['development', 'staging'];

async function bootstrap() {
  process.env.TZ = 'UTC';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const env: string = configService.get<string>('app.nodeEnv');
  const swaggerPassword = configService.get<string>('app.swaggerPassword');

  //app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );
  app.use(cookieParser());
  app.use([compression(), hpp(), mongoSanitize()]);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor(), new SentryInterceptor());
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

  if (SWAGGER_ENVS.includes(process.env.NODE_ENV)) {
    app.use(
      '/docs',
      basicAuth({
        challenge: true,
        users: { admin: swaggerPassword },
      }),
    );

    const options = new DocumentBuilder().setTitle('Vrai Server API').setDescription('API docs').build();

    const document = SwaggerModule.createDocument(app, options);

    fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
    SwaggerModule.setup('docs', app, document);
  }

  Sentry.init({
    environment: process.env.NODE_ENV,
    dsn: configService.get<string>('app.sentryDsn'),
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0, // Profiling sample rate is relative to tracesSampleRate
    integrations: [
      // Add profiling integration to list of integrations
      new ProfilingIntegration(),
      new Sentry.Integrations.Http({ tracing: true }),
    ],
  });
  
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
