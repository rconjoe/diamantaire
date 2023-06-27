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
import { Connection, PaginateModel } from 'mongoose';

import { ProductEntity } from '../index';

/**
 * Product entity repository
 */
@Injectable()
export class ProductRepository extends AbstractRepository<ProductEntity> {
  protected logger = new Logger(ProductRepository.name);
  constructor(
    @InjectModel('products') private readonly productModel: PaginateModel<ProductEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(productModel, connection);
  }
}
