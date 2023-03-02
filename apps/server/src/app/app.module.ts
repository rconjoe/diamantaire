import { AuthModule } from '@diamantaire/server/common/auth';
import { GqlConfigService, JoiSchemaValidation } from '@diamantaire/server/common/configs';
import { DatabaseModule } from '@diamantaire/server/common/provider/database';
import { UtilsModule } from '@diamantaire/server/common/utils';
import { AuthMiddleware, CorsMiddleware, OriginMiddleware } from '@diamantaire/server/core';
import { DiamondsModule } from '@diamantaire/server/diamonds';
import { HealthModule } from '@diamantaire/server/health';
import { PriceModule } from '@diamantaire/server/price';
import { ProductsModule } from '@diamantaire/server/products';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import appConfig from 'libs/server/common/configs/src/app.config';

import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig], validationSchema: JoiSchemaValidation }),
    //MongooseModule.forRoot(appConfig().mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }),
    DatabaseModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
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
      .apply(CorsMiddleware, AuthMiddleware, OriginMiddleware)
      .exclude({ path: 'health', method: RequestMethod.GET }, { path: 'graphql', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
