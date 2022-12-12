import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/app';
import { HealthModule } from '@diamantaire/gateway/health';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    HealthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
