import { UtilService } from '@diamantaire/server/common/utils';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DiamondsController } from './controller/diamonds.controller';
import { CutToOrderDiamondEntity, CutToOrderDiamondSchema } from './entities/cut-to-order.entity';
import { DiamondEntity, DiamondSchema } from './entities/diamond.entity';
import { CutToOrderDiamondsRepository } from './repository/cut-to-order.repository';
import { DiamondRepository } from './repository/diamond.repository';
import { CutToOrderDiamondsResolver } from './resolver/cut-to-order.resolver';
import { DiamondsResolver } from './resolver/diamonds.resolver';
import { DiamondsService } from './services/diamond.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DiamondEntity.name, schema: DiamondSchema },
      { name: CutToOrderDiamondEntity.name, schema: CutToOrderDiamondSchema },
    ]),
  ],
  providers: [
    DiamondsResolver,
    CutToOrderDiamondsResolver,
    DiamondsService,
    DiamondRepository,
    CutToOrderDiamondsRepository,
    UtilService,
  ],
  controllers: [DiamondsController],
})
export class DiamondsModule {}
