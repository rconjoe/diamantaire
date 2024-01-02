import { UtilService } from '@diamantaire/server/common/utils';
import { PriceEntity, PriceRepository, PriceSchema } from '@diamantaire/server/price';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './controllers/product.controller';
import { PlpSchema } from './entities/plp.entity';
import { ProductsSchema } from './entities/product.entity';
import { PlpRepository } from './repository/plp.repository';
import { ProductRepository } from './repository/product.repository';
import { ProductsService } from './services/product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'products', schema: ProductsSchema },
      { name: 'plp', schema: PlpSchema },
      { name: PriceEntity.name, schema: PriceSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductsService, ProductRepository, PlpRepository, PriceRepository, UtilService],
})
export class ProductsModule {}
