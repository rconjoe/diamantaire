import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PriceEntity, PriceSchema } from './entities/price.entity';
import { PriceRepository } from './repository/price.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: PriceEntity.name, schema: PriceSchema }])],
  controllers: [],
  providers: [PriceRepository],
})
export class PriceModule {}
