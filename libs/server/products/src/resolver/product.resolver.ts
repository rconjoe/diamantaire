import { Resolver, Query, Args } from '@nestjs/graphql';

import { GetProductInput, ProductVariantInput } from '../dto/product.input';
import { ProductEntity } from '../entities/product.entity';
import { ProductsService } from '../services/product.service';

@Resolver(() => ProductEntity)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductEntity], { name: 'products' })
  product(@Args('input') input: GetProductInput) {
    return this.productsService.findProduct(input);
  }

  @Query(() => [ProductEntity], { name: 'productVariant' })
  productVariant(@Args('input') input: ProductVariantInput) {
    return this.productsService.findProductVariant(input);
  }
}
