/**
 * Application data access objects
 * @author Bismark Frimpong
 * @date 04/09/2022
 * @version 1.0
 * @copyright DiamondFoundry
 */

import { AbstractRepository } from '@diamantaire/server/common/provider/database';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { COUNTRY_CURRENCY_CODES } from '@diamantaire/shared/constants';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, PaginateModel } from 'mongoose';

import { GetDiamondInput } from '../dto/get-diamond.input';
import { DiamondEntity } from '../entities/diamond.entity';

/**
 * Diamond data access class
 */
@Injectable()
export class DiamondRepository extends AbstractRepository<DiamondEntity> {
  protected logger = new Logger(DiamondRepository.name);
  constructor(
    @InjectModel(DiamondEntity.name) private readonly diamondModel: PaginateModel<DiamondEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(diamondModel, connection);
  }

  /**
     * Fetch and filter out diamonds through differnt inputs
     *  Eg:
     *  {
            "input": {
            "diamondType": "trillion",
            "priceMin": 100.0,
            "priceMax": 1200.0,
            "color": "I",
            "sortBy": "carat",
            "sortOrder": "asc"
            "countryCode": "US",
            "sortOrder": "asc",
            "caratMin": 0.86,
            "caratMax": 0.98
            }
        }
    */

  async findDiamondsByQuery(input: GetDiamondInput) {
    this.logger.verbose(`findDiamonds: ${JSON.stringify(input)}`);
    const countryCode = input?.countryCode || 'US';
    const currencyCode = COUNTRY_CURRENCY_CODES.find((v: any) => v.countryCode === countryCode).currencyCode;
    const sortOrder = input?.sortOrder || 'desc'; // asc or 1 or ascending, desc or -1 or descending
    const sortByKey = input?.sortBy || 'variants.all.price';
    const sortByObj = {};

    sortByObj[sortByKey] = sortOrder; // sortby any key

    // pagination
    const limit = Math.abs(input?.limit) || 20; // default limit is 20 if not specified
    const page = (Math.abs(input?.page) || 1) - 1; // next page
    const total = await this.diamondModel.countDocuments(input);
    const pagination = { total, page, limit };

    // diamonds
    const diamonds = await this.diamondModel
      .find(input)
      .lean()
      .sort(sortByObj)
      .limit(limit)
      .skip(limit * page);

    // range
    const range = await this.getDiamondsRange(input, currencyCode);

    return {
      pagination,
      diamonds,
      range,
    };
  }

  async getDiamondsRange(input: any, currencyCode: string) {
    const getRange = async (k: any, v: any): Promise<any> => {
      const payload = await this.diamondModel
        .find(input)
        .lean()
        .sort({ [k]: v })
        .limit(1)
        .skip(0);

      if (k === 'carat') {
        return payload.pop().carat;
      } else {
        return payload
          .pop()
          ?.variants?.all?.pop()
          ?.presentmentPrices?.filter((price: any) => price.currencyCode === currencyCode)
          .pop();
      }
    };

    const range = { price: { min: {}, max: {} }, carat: { min: {}, max: {} } };

    range.price.min = await getRange('variants.all.price', 'asc');
    range.price.max = await getRange('variants.all.price', 'desc');
    range.carat.min = await getRange('carat', 'asc');
    range.carat.max = await getRange('carat', 'desc');

    return range;
  }
}
