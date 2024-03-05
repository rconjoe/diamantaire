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

import { ToiMoiDiamondsEntity } from '../entities/toimoi-diamonds.entity';

/**
 * Diamond data access class
 */
@Injectable()
export class ToiMoiDiamondsRepository extends AbstractRepository<ToiMoiDiamondsEntity> {
  protected logger = new Logger(ToiMoiDiamondsRepository.name);
  constructor(
    @InjectModel('toimoi-diamonds') private readonly diamondModel: PaginateModel<ToiMoiDiamondsEntity>,
    @InjectModel('toimoi-diamonds') private readonly diamondModelAggregateModel: AggregatePaginateModel<ToiMoiDiamondsEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(diamondModel, connection);
  }

  async aggregatePaginate<T>(queries, options: PaginateOptions): Promise<AggregatePaginateResult<T>> {
    const aggregate = this.diamondModelAggregateModel.aggregate(queries);

    return await this.diamondModelAggregateModel.aggregatePaginate(aggregate, options);
  }
}
