/**
 * Diamond Service/Controller
 * @author Bismark Frimpong
 * @date 04/09/2022
 * @version 1.0
 * @copyright DiamondFoundry
 */

import { UtilService } from '@diamantaire/server/common/utils';
import { PaginatedLabels } from '@diamantaire/shared/constants';
import { getDataRanges } from '@diamantaire/shared/utils';
import { Injectable, Logger } from '@nestjs/common';
import { PaginateOptions } from 'mongoose';

import { GetCutToOrderDiamondInput } from '../dto/cut-to-order.dto';
import { GetDiamondCheckoutDto } from '../dto/diamond-checkout.dto';
import { GetDiamondInput } from '../dto/get-diamond.input';
import { CutToOrderDiamondsRepository } from '../repository/cut-to-order.repository';
import { DiamondRepository } from '../repository/diamond.repository';

@Injectable()
export class DiamondsService {
  private Logger = new Logger('DiamondsService');

  constructor(
    private readonly diamondRepository: DiamondRepository,
    private readonly cutToOrderRepository: CutToOrderDiamondsRepository,
    private readonly utils: UtilService,
  ) {}

  /**
   * This function accepts an input for a diamond type
   * @param input diamond filter input
   * @return a filtered diamon list
   */

  async getdDiamonds(params: GetDiamondInput, input: GetDiamondInput): Promise<any> {
    const cachedKey = `diamonds-${JSON.stringify(params)}-${JSON.stringify(input)}`;
    const sortOrder = input?.sortOrder || 'desc'; // asc or 1 or ascending, desc or -1 or descending
    const sortByKey = input?.sortBy || 'carat';
    const sortByObj = {};

    sortByObj[sortByKey] = sortOrder; // sortby any key

    const options: PaginateOptions = {
      limit: input.limit || 20,
      page: input.page || 1,
      sort: sortByObj,
      customLabels: PaginatedLabels,
    };

    const filteredQuery = this.optionalDiamondQuery(params);

    const cachedData = await this.utils.memGet(cachedKey);

    if (cachedData) {
      this.Logger.verbose(`diamonds :: cache hit on key ${cachedKey}`);

      return cachedData; // return the entire cached data
    }

    const allDiamonds = await this.diamondRepository.find({});
    const result = await this.diamondRepository.paginate(filteredQuery, options);

    result.ranges = getDataRanges(allDiamonds);

    this.utils.memSet(cachedKey, result, 3600); // set the cache data for 1hr

    return result;
  }

  /**
   * Query addon for a diamond type
   * @param params client request
   * @param query database query match
   * @returns and Object
   */

  optionalDiamondQuery(input) {
    if (input?.diamondType) {
      const diamondTypes = input.diamondType.trim().split(',');

      input.diamondType = {
        $in: diamondTypes, // mongoose $in take an array value as input
      };
    }

    // Optional query for price and currencycode
    // EG: "priceMin": 100.0, "priceMax": 1200.0, "currencyCode": "USD",
    // currencyCode = USD, GBP, EUR, CAD, AUD
    if (input.priceMin && input.priceMax && input.currencyCode !== null) {
      input['variants.all.presentmentPrices'] = {
        $elemMatch: {
          amount: {
            $gte: input.priceMin.toFixed(1).toString(), // mongoose $gte operator greater than or equal to
            $lte: input.priceMax.toFixed(1).toString(), // mongoose $llte operator less than or equal to
          },
          currencyCode: input.currencyCode,
        },
      };
    }

    /**
     * Optional Color Query
     * ACCEPTABLE COLORS = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
     * Colors can be passed in as H,F,D,G ..etc with comma separated
     */
    if (input?.color) {
      //const colors: string[] = Array.from(input.color);
      const colors = input.color.toLocaleUpperCase().trim().split(',');

      // TODO handle errors here
      // const found = colors.some((ele) => ACCEPTABLE_COLORS.includes(ele));
      input.color = {
        $in: colors, // mongoose $in take an array value as input
      };
    }

    /**
     * Optional Clarity Query
     * ACCEPTABLE_CLARITIES = ['SI1', 'SI2', 'VS2', 'VS1', 'VVS1', 'VVS2'];
     * Clarity can be passed in as SI1,VS2,WS1 ...etc with comma separted
     */
    if (input?.clarity) {
      const clarity = input.clarity.toLocaleUpperCase().trim().split(',');

      input.clarity = {
        $in: clarity, // mongoose $in take an array value as input
      };
    }

    /**
     * Optional Cut Query
     * ACCEPTABLE_CUTS = ['Excellent', 'Ideal', 'Ideal+Hearts'];
     * Cuts can be passed in as Excellent,Ideal ...etc with comma separted
     */
    if (input?.cut) {
      const cuts = input.cut.trim().split(',');

      input.cut = {
        $in: cuts, // mongoose $in take an array value as input
      };
    }

    /**
     * Optional query for carat range
     * EG: "caratMin": 0.86, "caratMax": 0.98
     */
    if (input.caratMin && input.caratMax !== null) {
      input.carat = {
        $gte: input.caratMin.toFixed(2).toString(), // mongoose $gte operator greater than or equal to
        $lte: input.caratMax.toFixed(2).toString(), // mongoose $lte operator less than or equal to
      };
    }

    return input;
  }

  /**
   * Cut to order diamonds optional filtering on shapes, carat and price
   * @param { String } input - shapes, caratMin, caratMax, priceMin, priceMax
   * @returns
   */

  optionalCTODiamondFilter(input) {
    this.Logger.verbose(`optional CTODiamondFilter input: ${JSON.stringify(input)}`);
    if (input?.type) {
      const type = input?.type.trim().split(',');

      input.type = {
        $in: type, // mongoose $in take an array value as input
      };
    }

    // filter on minimum and maximum carat
    if (input?.caratMin && input?.caratMax) {
      input.carat = {
        $gte: input.caratMin.toFixed(2), // mongoose $gte operator greater than or equal to
        $lte: input.caratMax.toFixed(2), // mongoose $lte operator less than or equal to
      };
    }

    // filter on minimum and maximum price
    if (input?.priceMin && input?.priceMax) {
      input.price = {
        $gte: input.priceMin.toFixed(2), // mongoose $gte operator greater than or equal to
        $lte: input.priceMax.toFixed(2), // mongoose $lte operator less than or equal to
      };
    }

    return input;
  }

  /**
   * Fetch paginated cut to order diamonds
   * @param { GetCutToOrderDiamondInput } input - paginated request
   * @returns
   */

  async getCutToOrderDiamondAvailability(params: GetCutToOrderDiamondInput, input?: GetCutToOrderDiamondInput) {
    this.Logger.verbose(`Fetching cut to order diamond availability`);
    const cachedKey = `cutToOrderDiamonds-${JSON.stringify(params)}-${JSON.stringify(input)}`;

    const sortOrder = input?.sortOrder || 'desc'; // asc or 1 or ascending, desc or -1 or descending
    const sortByKey = input?.sortBy || 'carat';
    const sortByObj = {};

    sortByObj[sortByKey] = sortOrder; // sortby any key
    const options: PaginateOptions = {
      limit: input.limit || 20,
      page: input.page || 1,
      sort: sortByObj,
      customLabels: PaginatedLabels,
    };

    const filteredQuery = this.optionalCTODiamondFilter(params);

    filteredQuery.isAvailable = true; // filter on available diamonds

    const cachedData = await this.utils.memGet(cachedKey);

    if (cachedData) {
      this.Logger.verbose(`cutToOrderDiamonds :: cache hit on key ${cachedKey}`);

      return cachedData; // return the entire cached data
    }

    const allCtoDiamonds = await this.cutToOrderRepository.find({});
    const result = await this.cutToOrderRepository.paginate(filteredQuery, options); // paginated result

    result.ranges = getDataRanges(allCtoDiamonds);
    this.utils.memSet(cachedKey, result, 3600); // set the cache data for 1hr

    return result;
  }

  /**
   * This function accepts an input for a diamond lotId
   * @param { String } input - diamond lotId
   * @returns
   */

  async fetchDiamondAvailability(input: GetDiamondCheckoutDto) {
    this.Logger.verbose(`Fetching diamond availability for lotId: ${input.lotId}`);

    return await this.utils.getDiamondFromNetSuite(input.lotId);
  }
}
