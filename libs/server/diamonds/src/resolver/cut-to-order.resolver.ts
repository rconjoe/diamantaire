import { Resolver, Query, Args } from '@nestjs/graphql';

import { GetCutToOrderDiamondInput } from '../dto/cut-to-order.dto';
import { CutToOrderDiamondEntity } from '../entities/cut-to-order.entity';
import { DiamondsService } from '../services/diamond.service';

@Resolver(() => CutToOrderDiamondEntity)
export class CutToOrderDiamondsResolver {
  constructor(private readonly diamondsService: DiamondsService) {}

  @Query(() => [CutToOrderDiamondEntity], { name: 'cuttoorderdiamonds' })
  cutToOrderdiamonds(@Args('input') input?: GetCutToOrderDiamondInput) {
    return this.diamondsService.getCutToOrderDiamondAvailability(input);
  }
}
