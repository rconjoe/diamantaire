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

import { ToiMoiDiamondsEntity } from '../entities/toimoi-diamonds.entity';

/**
 * Diamond data access class
 */
@Injectable()
export class ToiMoiDiamondsRepository extends AbstractRepository<ToiMoiDiamondsEntity> {
  protected logger = new Logger(ToiMoiDiamondsRepository.name);
  constructor(
    @InjectModel('toimoi-diamonds') private readonly diamondModel: PaginateModel<ToiMoiDiamondsEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(diamondModel, connection);
  }
}
