import { UtilService } from '@diamantaire/server/common/utils';
import { PriceEntity, PriceRepository, PriceSchema } from '@diamantaire/server/price';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './controllers/product.controller';
import { ProductsSchema } from './entities/product.entity';
import { ProductRepository } from './repository/product.repository';
import { ProductsService } from './services/product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'products', schema: ProductsSchema },
      { name: PriceEntity.name, schema: PriceSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductsService, ProductRepository, PriceRepository, UtilService],
})
export class ProductsModule {}
