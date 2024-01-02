import { Resolver, /* Query, Args */ } from '@nestjs/graphql';

// import { PlpSlugInput } from '../dto/plp.input';
import { PlpEntity } from '../entities/plp.entity';
import { PlpService } from '../services/plp.service';

@Resolver(() => PlpEntity)
export class ProductsResolver {
  constructor(private readonly productsService: PlpService) {}

  // @Query(() => [PlpEntity], { name: 'productVariant' })
  // productVariant(@Args('input') input: PlpSlugInput) {
  //   return this.productsService.findProductBySlug(input);
  // }
}
