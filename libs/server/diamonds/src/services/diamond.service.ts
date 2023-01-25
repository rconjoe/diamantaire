/**
 * Diamond Service/Controller
 * @author Bismark Frimpong
 * @date 04/09/2022
 * @version 1.0
 * @copyright DiamondFoundry
 */

import { UtilService } from '@diamantaire/server/common/utils';
import { Injectable, Logger } from '@nestjs/common';

import { GetCutToOrderDiamondInput } from '../dto/cut-to-order.dto';
import { GetDiamondCheckoutDto } from '../dto/diamond-checkout.dto';
import { GetDiamondInput } from '../dto/get-diamond.input';
import { DiamondQuery } from '../interface/diamond.interface';
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

  async findDiamonds(input: GetDiamondInput): Promise<any> {
    const query = {
      limit: input.limit,
      page: input.page,
      sortBy: input.sortBy,
      sortOrder: input.sortOrder,
    };

    this.optionalDiamondQuery(input, query);
    const diams = await this.diamondRepository.findDiamondsByQuery(query);

    return diams;
  }

  /**
   * Query addon for a diamond type
   * @param params client request
   * @param query database query match
   * @returns and Object
   */

  optionalDiamondQuery(params: GetDiamondInput, query: DiamondQuery) {
    if (params?.diamondType) {
      const diamondTypes = params.diamondType.trim().split(',');

      query.diamondType = {
        $in: diamondTypes, // mongoose $in take an array value as input
      };
    }

    // Optional query for price and currencycode
    // EG: "priceMin": 100.0, "priceMax": 1200.0, "currencyCode": "USD",
    // currencyCode = USD, GBP, EUR, CAD, AUD
    if (params.priceMin && params.priceMax && params.currencyCode !== null) {
      query['variants.all.presentmentPrices'] = {
        $elemMatch: {
          amount: {
            $gte: params.priceMin.toFixed(1).toString(), // mongoose $gte operator greater than or equal to
            $lte: params.priceMax.toFixed(1).toString(), // mongoose $lte operator less than or equal to
          },
          currencyCode: params.currencyCode,
        },
      };
    }

    /**
     * Optional Color Query
     * ACCEPTABLE COLORS = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
     * Colors can be passed in as H,F,D,G ..etc with comma separated
     */
    if (params?.color) {
      //const colors: string[] = Array.from(input.color);
      const colors = params.color.toLocaleUpperCase().trim().split(',');

      // TODO handle errors here
      // const found = colors.some((ele) => ACCEPTABLE_COLORS.includes(ele));
      query.color = {
        $in: colors, // mongoose $in take an array value as input
      };
    }

    /**
     * Optional Clarity Query
     * ACCEPTABLE_CLARITIES = ['SI1', 'SI2', 'VS2', 'VS1', 'VVS1', 'VVS2'];
     * Clarity can be passed in as SI1,VS2,WS1 ...etc with comma separted
     */
    if (params?.clarity) {
      const clarity = params.clarity.toLocaleUpperCase().trim().split(',');

      query.clarity = {
        $in: clarity, // mongoose $in take an array value as input
      };
    }

    /**
     * Optional Cut Query
     * ACCEPTABLE_CUTS = ['Excellent', 'Ideal', 'Ideal+Hearts'];
     * Cuts can be passed in as Excellent,Ideal ...etc with comma separted
     */
    if (params?.cut) {
      const cuts = params.cut.trim().split(',');

      query.cut = {
        $in: cuts, // mongoose $in take an array value as input
      };
    }

    /**
     * Optional query for carat range
     * EG: "caratMin": 0.86, "caratMax": 0.98
     */
    if (params.caratMin && params.caratMax !== null) {
      query.carat = {
        $gte: params.caratMin.toFixed(2).toString(), // mongoose $gte operator greater than or equal to
        $lte: params.caratMax.toFixed(2).toString(), // mongoose $lte operator less than or equal to
      };
    }

    return query;
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
    const labels = {
      totalDocs: 'itemCount',
      docs: 'items',
      limit: 'perPage',
      page: 'currentPage',
      nextPage: 'next',
      prevPage: 'prev',
      totalPages: 'pageCount',
      pagingCounter: 'slNo',
      meta: 'paginator',
    };
    const options = {
      limit: input.limit || 20,
      page: input.page || 1,
      customLabels: labels,
    };
    const find = this.optionalCTODiamondFilter(params);

    return await this.cutToOrderRepository.paginate(find, options);
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
