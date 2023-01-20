import { Module } from '@nestjs/common';
import { ServerCommonAuthService } from './server-common-auth.service';

@Module({
  controllers: [],
  providers: [ServerCommonAuthService],
  exports: [ServerCommonAuthService],
})
export class ServerCommonAuthModule {}
