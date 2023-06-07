import { Resolver, Query, Args } from '@nestjs/graphql';

import { GetDiamondDto } from '../dto/get-diamond.input';
import { DiamondEntity } from '../entities/diamond.entity';
import { DiamondsService } from '../services/diamond.service';

@Resolver(() => DiamondEntity)
export class DiamondsResolver {
  constructor(private readonly diamondsService: DiamondsService) {}
  // @Query(() => [Diamonds], { name: 'diamonds' })
  // diamonds(@Args('input') input: GetDiamondInput) {
  //   return this.diamondsService.findDiamonds(input);
  // }

  @Query(() => DiamondEntity, { name: 'diamonds' })
  async diamonds(@Args('input') input: GetDiamondDto) {
    return this.diamondsService.getDiamonds(input);
  }
}
