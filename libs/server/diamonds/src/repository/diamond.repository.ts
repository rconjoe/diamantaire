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

import { DiamondEntity } from '../entities/diamond.entity';

/**
 * Diamond data access class
 */
@Injectable()
export class DiamondRepository extends AbstractRepository<DiamondEntity> {
  protected logger = new Logger(DiamondRepository.name);
  constructor(
    @InjectModel('diamonds') private readonly diamondModel: PaginateModel<DiamondEntity>,
    @InjectModel('diamonds') private readonly diamondModeltAggregateModel: AggregatePaginateModel<DiamondEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(diamondModel, connection);
  }

  async aggregatePaginate<T>(queries, options: PaginateOptions): Promise<AggregatePaginateResult<T>> {
    const aggregate = this.diamondModeltAggregateModel.aggregate(queries);

    return await this.diamondModeltAggregateModel.aggregatePaginate(aggregate, options);
  }
}
