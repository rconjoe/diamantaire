import { UtilService } from '@diamantaire/server/common/utils';
import { DiamondEntity, DiamondRepository, DiamondSchema } from '@diamantaire/server/diamonds';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DiamondLoaderController } from './controller/diamond-loader.controller';
import { DiamondLoaderService } from './services/diamond-loader.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: DiamondEntity.name, schema: DiamondSchema }])],
  providers: [DiamondLoaderService, DiamondRepository, UtilService],
  controllers: [DiamondLoaderController],
})
export class ProductLoaderModule {}
