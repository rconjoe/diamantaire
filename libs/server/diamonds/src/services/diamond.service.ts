/**
 * Diamond Service/Controller
 * @author Bismark Frimpong
 * @date 04/09/2022
 * @version 1.0
 * @copyright DiamondFoundry
 */

import { UtilService } from '@diamantaire/server/common/utils';
import { CYF_DIAMOND_LIMIT, PaginatedLabels } from '@diamantaire/shared/constants';
import { getDataRanges, defaultVariantGetter, defaultNumericalRanges, defaultUniqueValues } from '@diamantaire/shared/utils';
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { PaginateOptions } from 'mongoose';

import { GetDiamondCheckoutDto } from '../dto/diamond-checkout.dto';
import { GetDiamondByLotIdDto, GetDiamondInput } from '../dto/get-diamond.input';
import { DiamondEntity } from '../entities/diamond.entity';
import { hideIdenticalDiamond4Cs } from '../helper/diamond.helper';
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

  async getDiamonds(params: GetDiamondInput, input: GetDiamondInput, { isCto = false }): Promise<DiamondEntity> {
    const cachedKey = `diamonds-${JSON.stringify(params)}-isCto=${isCto}-${JSON.stringify(input)}`;
    const sortOrder = input?.sortOrder || 'desc'; // asc or 1 or ascending, desc or -1 or descending
    const sortByKey = input?.sortBy || 'carat';
    const sortByObj = {};
    const query = {}; // diamond type query
    // color: { $ne: 'Fancy Intense Pink' },

    sortByObj[sortByKey] = sortOrder; // sortby any key

    const options: PaginateOptions = {
      limit: input.limit || 20,
      page: input.page || 1,
      sort: sortByObj,
      customLabels: PaginatedLabels,
    };

    const filteredQuery = this.optionalDiamondQuery(params);

    filteredQuery.isSold = false; // only return available diamonds
    filteredQuery['color'] = { $ne: 'Fancy Intense Pink' }; // filter out pink diamonds

    if (isCto) {
      filteredQuery.slug = 'cto-diamonds';
      query['slug'] = 'cto-diamonds';
    } else {
      filteredQuery.slug = 'diamonds';
      query['slug'] = 'diamonds';
    }
    console.log(query);

    const cachedData = await this.utils.memGet(cachedKey);

    if (cachedData) {
      this.Logger.verbose(`diamonds :: cache hit on key ${cachedKey}`);

      return cachedData; // return the entire cached data
    }

    const allDiamonds = await this.diamondRepository.find(query);
    const result = await this.diamondRepository.paginate(filteredQuery, options);

    const numericalRanges = {
      ...defaultNumericalRanges,
      price: defaultVariantGetter,
    };

    result.ranges = getDataRanges(allDiamonds, defaultUniqueValues, numericalRanges);

    this.utils.memSet(cachedKey, result, 3600); // set the cache data for 1hr

    return result;
  }

  /**
   * Fetch single diamond by lotId
   * @param {GetDiamondByLotIdDto} input - diamond lotId
   * @returns
   */

  async diamondByLotId(input: GetDiamondByLotIdDto): Promise<DiamondEntity> {
    this.Logger.verbose(`Fetching diamond by lotId: ${input.lotId}`);
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await this.diamondRepository.findOne({ lotId: input.lotId });

      if (result) {
        return result;
      }
      throw new NotFoundException(`Diamond with lotId: ${input.lotId} not found`);
    } catch (error) {
      this.Logger.error(`Error fetching diamond by lotId: ${input.lotId}`);
      throw error;
    }
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
    if (input.priceMin && input.priceMax) {
      input['variants'] = {
        $elemMatch: {
          price: {
            $gte: input.priceMin, // mongoose $gte operator greater than or equal to
            $lte: input.priceMax, // mongoose $llte operator less than or equal to
          },
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
        $gte: input.caratMin.toFixed(1), // mongoose $gte operator greater than or equal to
        $lte: input.caratMax.toFixed(1), // mongoose $lte operator less than or equal to
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
    if (input?.diamondType) {
      const diamondTypes = input?.diamondType.trim().split(',');

      input.diamondType = {
        $in: diamondTypes, // mongoose $in take an array value as input
      };
    }

    // filter on minimum and maximum carat
    if (input?.caratMin && input?.caratMax) {
      input.carat = {
        $gte: input.caratMin.toFixed(1), // mongoose $gte operator greater than or equal to
        $lte: input.caratMax.toFixed(1), // mongoose $lte operator less than or equal to
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
   * Fetch unique non cto diamonds
   * @param { GetDiamondInput } params - requested data
   * @returns
   */

  async getCFYDiamond(params: GetDiamondInput): Promise<DiamondEntity> {
    this.Logger.verbose(`Fetching cut to order diamond availability`);

    const filteredQuery = this.optionalDiamondQuery(params);

    filteredQuery.isSold = false; // only return available diamonds
    filteredQuery.slug = 'diamonds';
    try {
      const result = await this.diamondRepository.find(filteredQuery);

      // result should be filtered with the 4c's (carat, cut, color, clarity)
      const uniqueDiamondResults = hideIdenticalDiamond4Cs(result);

      return uniqueDiamondResults.sort((a, b) => a.carat - b.carat).slice(0, CYF_DIAMOND_LIMIT);
    } catch (error) {
      this.Logger.error(`Error fetching cfy diamonds: ${error}`);
      throw new InternalServerErrorException(error);
    }
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
