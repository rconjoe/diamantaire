/**
 * Application data access objects
 * @author Bismark Frimpong
 * @date 04/09/2022
 * @version 1.0
 * @copyright DiamondFoundry
 */

import { AbstractRepository } from '@diamantaire/server/common/provider/database';
import { PriceEntity } from '@diamantaire/server/price';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { ProductEntity } from '../index';

/**
 * Product entity repository
 */
@Injectable()
export class ProductRepository extends AbstractRepository<ProductEntity> {
  protected logger = new Logger(ProductRepository.name);
  constructor(
    @InjectModel(PriceEntity.name) private readonly productModel: Model<ProductEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(productModel, connection);
  }
}
