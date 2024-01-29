import { AuthModule } from '@diamantaire/server/common/auth';
import { JoiSchemaValidation } from '@diamantaire/server/common/configs';
import { DatabaseModule } from '@diamantaire/server/common/provider/database';
import { UtilsModule } from '@diamantaire/server/common/utils';
import { AuthMiddleware, CorsMiddleware, OriginMiddleware } from '@diamantaire/server/core';
import { DiamondsModule } from '@diamantaire/server/diamonds';
import { HealthModule } from '@diamantaire/server/health';
import { PriceModule } from '@diamantaire/server/price';
import { ProductsModule } from '@diamantaire/server/products';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Sentry from '@sentry/node';

// eslint-disable-next-line @nx/enforce-module-boundaries
import appConfig from 'libs/server/common/configs/src/app.config';

const redisUrl = process.env.REDIS_PRIVATE_URL || process.env.REDIS_URL;

import { AppService } from './app.service';
import { redisStore } from './redisStore';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig], validationSchema: JoiSchemaValidation }),
    redisUrl ? CacheModule.registerAsync({  
      isGlobal: true,  
      useFactory: async () => ({  
        store: await redisStore({
          url: redisUrl,  
        }),      
      }),    
    }) : CacheModule.register({ isGlobal: true }),
    DatabaseModule,
    UtilsModule,
    ProductsModule,
    PriceModule,
    DiamondsModule,
    HealthModule,
    HttpModule,
    AuthModule,
        
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        CorsMiddleware,
        AuthMiddleware,
        OriginMiddleware,
        Sentry.Handlers.requestHandler(),
        Sentry.Handlers.tracingHandler(),
      )
      .exclude({ path: 'health', method: RequestMethod.GET }, { path: 'graphql', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
