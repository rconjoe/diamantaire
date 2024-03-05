/**
 * Application data access objects
 * @author Bismark Frimpong
 * @date 04/09/2022
 * @version 1.0
 * @copyright DiamondFoundry
 */

import { AbstractRepository } from '@diamantaire/server/common/provider/database';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, AggregatePaginateResult, Connection, PaginateModel, PaginateOptions } from 'mongoose';

import { DiamondPairsEntity } from '../entities/diamond-pairs.entity';

/**
 * Diamond data access class
 */
@Injectable()
export class DiamondPairsRepository extends AbstractRepository<DiamondPairsEntity> {
  protected logger = new Logger(DiamondPairsRepository.name);
  constructor(
    @InjectModel('diamond-pairs') private readonly diamondModel: PaginateModel<DiamondPairsEntity>,
    @InjectModel('diamond-pairs') private readonly diamondModelAggregateModel: AggregatePaginateModel<DiamondPairsEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(diamondModel, connection);
  }

  async aggregatePaginate<T>(queries, options: PaginateOptions): Promise<AggregatePaginateResult<T>> {
    const aggregate = this.diamondModelAggregateModel.aggregate(queries);

    return await this.diamondModelAggregateModel.aggregatePaginate(aggregate, options);
  }
}
