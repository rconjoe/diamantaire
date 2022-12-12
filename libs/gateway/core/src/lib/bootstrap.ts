import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';

import { CoreModule } from './core.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
//const { version } = require('../package.json');

export async function bootstrap() {
  process.env.TZ = 'UTC';
  const app = await NestFactory.create<NestExpressApplication>(CoreModule, {
    cors: true,
  });
  const configService = app.get(ConfigService);
  app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // const options = new DocumentBuilder()
  //   .setTitle('Vrai Server API')
  //   .setDescription('API docs')
  //   //.setVersion(version)
  //   //.addBearerAuth()
  //   .build();

  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('docs', app, document);

  //const port = process.env.PORT || 3000;
  await app.listen(configService.get('app.port'));

  return configService.get('app.port');
}
