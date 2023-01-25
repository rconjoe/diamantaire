import { Module } from '@nestjs/common';

import { UtilService } from './util.service';

@Module({
  controllers: [],
  providers: [UtilService],
  exports: [],
})
export class UtilsModule {}
