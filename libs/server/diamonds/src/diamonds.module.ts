import { UtilService } from '@diamantaire/server/common/utils';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DiamondsController } from './controller/diamonds.controller';
import { DiamondPairsSchema } from './entities/diamond-pairs.entity';
import { DiamondSchema } from './entities/diamond.entity';
import { ToiMoiDiamondsSchema } from './entities/toimoi-diamonds.entity';
import { DiamondPairsRepository } from './repository/diamond-pairs.repository';
import { DiamondRepository } from './repository/diamond.repository';
import { ToiMoiDiamondsRepository } from './repository/toimoi-diamonds.repository';
import { DiamondsService } from './services/diamond.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'diamonds', schema: DiamondSchema }]),
    MongooseModule.forFeature([{ name: 'diamond-pairs', schema: DiamondPairsSchema }]),
    MongooseModule.forFeature([{ name: 'toimoi-diamonds', schema: ToiMoiDiamondsSchema }]),
  ],
  providers: [DiamondsService, DiamondRepository, DiamondPairsRepository, ToiMoiDiamondsRepository, UtilService],
  controllers: [DiamondsController],
})
export class DiamondsModule {}
