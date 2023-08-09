import { UtilService } from '@diamantaire/server/common/utils';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DiamondsController } from './controller/diamonds.controller';
import { DiamondSchema } from './entities/diamond.entity';
import { DiamondRepository } from './repository/diamond.repository';
import { DiamondsService } from './services/diamond.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'diamonds', schema: DiamondSchema }])],
  providers: [DiamondsService, DiamondRepository, UtilService],
  controllers: [DiamondsController],
})
export class DiamondsModule {}
