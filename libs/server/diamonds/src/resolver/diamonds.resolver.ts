import { Resolver, Query, Args } from '@nestjs/graphql';

import { GetDiamondInput } from '../dto/get-diamond.input';
import { DiamondEntity, DiamondsList } from '../entities/diamond.entity';
import { DiamondsService } from '../services/diamond.service';

@Resolver(() => DiamondEntity)
export class DiamondsResolver {
  constructor(private readonly diamondsService: DiamondsService) {}
  // @Query(() => [Diamonds], { name: 'diamonds' })
  // diamonds(@Args('input') input: GetDiamondInput) {
  //   return this.diamondsService.findDiamonds(input);
  // }

  @Query(() => DiamondsList)
  async diamondsList(@Args('input') input: GetDiamondInput) {
    return this.diamondsService.findDiamonds(input);
  }
}
