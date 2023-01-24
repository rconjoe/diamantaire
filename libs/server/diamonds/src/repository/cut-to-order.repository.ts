import { AbstractRepository } from '@diamantaire/server/common/provider/database';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, PaginateModel } from 'mongoose';

import { CutToOrderDiamondEntity } from '../entities/cut-to-order.entity';

@Injectable()
export class CutToOrderDiamondsRepository extends AbstractRepository<CutToOrderDiamondEntity> {
  protected readonly logger = new Logger(CutToOrderDiamondsRepository.name);

  constructor(
    @InjectModel(CutToOrderDiamondEntity.name) private readonly cuttoorderModel: PaginateModel<CutToOrderDiamondEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(cuttoorderModel, connection);
  }
}
