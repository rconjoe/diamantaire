import { AbstractRepository } from '@diamantaire/server/common/provider/database';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, PaginateModel } from 'mongoose';

import { PriceEntity } from '../entities/price.entity';

@Injectable()
export class PriceRepository extends AbstractRepository<PriceEntity> {
  protected readonly logger = new Logger(PriceRepository.name);

  constructor(
    @InjectModel(PriceEntity.name) private readonly priceModel: PaginateModel<PriceEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(priceModel, connection);
  }
}
