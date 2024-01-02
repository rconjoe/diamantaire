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

import { PlpEntity } from '../index';

/**
 * Product entity repository
 */
@Injectable()
export class PlpRepository extends AbstractRepository<PlpEntity> {
  protected logger = new Logger(PlpRepository.name);
  constructor(
    @InjectModel('plp') private readonly plpModel: PaginateModel<PlpEntity>,
    @InjectModel('plp') private readonly plpAggregateModel: AggregatePaginateModel<PlpEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(plpModel, connection);
  }

  async aggregatePaginate<T>(queries, options: PaginateOptions): Promise<AggregatePaginateResult<T>> {
    const aggregate = this.plpAggregateModel.aggregate(queries);

    return await this.plpAggregateModel.aggregatePaginate(aggregate, options);
  }
}
