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

import { ProductEntity } from '../index';

/**
 * Product entity repository
 */
@Injectable()
export class ProductRepository extends AbstractRepository<ProductEntity> {
  protected logger = new Logger(ProductRepository.name);
  constructor(
    @InjectModel('products') private readonly productModel: PaginateModel<ProductEntity>,
    @InjectModel('products') private readonly productAggregateModel: AggregatePaginateModel<ProductEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(productModel, connection);
  }

  async aggregatePaginate<T>(queries, options: PaginateOptions): Promise<AggregatePaginateResult<T>> {
    const aggregate = this.productAggregateModel.aggregate(queries);

    return await this.productAggregateModel.aggregatePaginate(aggregate, options);
  }
}
