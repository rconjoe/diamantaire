import { Resolver, Query, Args } from '@nestjs/graphql';

import { ProductSlugInput } from '../dto/product.input';
import { ProductEntity } from '../entities/product.entity';
import { ProductsService } from '../services/product.service';

@Resolver(() => ProductEntity)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductEntity], { name: 'productVariant' })
  productVariant(@Args('input') input: ProductSlugInput) {
    return this.productsService.findProductBySlug(input);
  }
}
