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

import { DiamondPairsEntity } from '../entities/diamond-pairs.entity';

/**
 * Diamond data access class
 */
@Injectable()
export class DiamondPairsRepository extends AbstractRepository<DiamondPairsEntity> {
  protected logger = new Logger(DiamondPairsRepository.name);
  constructor(
    @InjectModel('diamond-pairs') private readonly diamondModel: PaginateModel<DiamondPairsEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(diamondModel, connection);
  }
}
