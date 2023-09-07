/**
 * Diamond Service/Controller
 * @author Bismark Frimpong
 * @date 04/09/2022
 * @version 1.0
 * @copyright DiamondFoundry
 */

import { INVENTORY_LEVEL_QUERY, DIAMOND_PLP_DATA_CONFIG_QUERY } from '@diamantaire/darkside/data/api';
import { UtilService } from '@diamantaire/server/common/utils';
import { CFY_DIAMOND_LIMIT, MIN_CARAT_EMPTY_RESULT, DIAMOND_PAGINATED_LABELS } from '@diamantaire/shared/constants';
import { ListPageDiamondItem } from '@diamantaire/shared-diamond';
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { PaginateOptions } from 'mongoose';

import { GetDiamondCheckoutDto, ProductInventoryDto, LowestPricedDto, DiamondPlp } from '../dto/diamond-checkout.dto';
import { GetDiamondByLotIdDto, GetDiamondDto } from '../dto/get-diamond.input';
import { DiamondEntity } from '../entities/diamond.entity';
import {
  removeIdenticalDiamond4Cs,
  colorFirstSortOrder,
  sortDiamonds,
  isDEF,
  isVSPlus,
  isVVSPlus,
  isColorGte,
  isClarityGte,
  createSortCaratFromTargetWithWeightComparator,
  descendingCaratComparator,
  diamondPropertyAscendingComparitors,
  DiamondProperty,
  DiamondClarities,
  DiamondCuts,
  caratFirstSortOrder,
  DiamondColors,
  DiamondTypes,
} from '../helper/diamond.helper';
import { IDiamondCollection, IShopifyInventory, IDiamondRecommendation } from '../interface/diamond.interface';
import { DiamondPairsRepository } from '../repository/diamond-pairs.repository';
import { DiamondRepository } from '../repository/diamond.repository';
import { ToiMoiDiamondsRepository } from '../repository/toimoi-diamonds.repository';

const STAFF_PICKS_LABEL = 'staffPick';

@Injectable()
export class DiamondsService {
  private Logger = new Logger('DiamondsService');

  constructor(
    private readonly diamondRepository: DiamondRepository,
    private readonly diamondPairsRepository: DiamondPairsRepository,
    private readonly toimoiDiamonds: ToiMoiDiamondsRepository,
    private readonly utils: UtilService,
  ) {}

  /**
   * Get filtered diamond types with paginated results
   * @param {GetDiamondDto} input - paginated input (limit, page, sortby, sortorder)
   * @returns {Promise<IDiamondCollection[]>} - paginated diamonds
   */

  async getDiamonds(input: GetDiamondDto): Promise<IDiamondCollection[]> {
    //const cachedKey = `diamonds-${JSON.stringify(params)}-isCto=${isCto}-${JSON.stringify(input)}`;
    const sortOrder = input?.sortOrder || 'desc'; // asc or 1 or ascending, desc or -1 or descending
    const sortByKey = input?.sortBy || 'carat';
    const sortByObj = {};
    const query = {}; // diamond type query

    sortByObj[sortByKey] = sortOrder; // sortby any key

    const options: PaginateOptions = {
      limit: input.limit || 20,
      page: input.page || 1,
      sort: sortByObj,
      customLabels: DIAMOND_PAGINATED_LABELS,
    };

    const filteredQuery = this.optionalDiamondQuery(input);

    //const regexPattern = /fancy/i;

    filteredQuery.availableForSale = true; // only return available diamonds
    filteredQuery.hidden = false;
    //filteredQuery['color'] = { $not: { $regex: regexPattern } }; // filter out pink diamonds

    if (input?.isCto) {
      filteredQuery.slug = 'cto-diamonds';
      query['slug'] = 'cto-diamonds';
    } else {
      filteredQuery.slug = 'diamonds';
      query['slug'] = 'diamonds';
    }

    const result = await this.diamondRepository.paginate(filteredQuery, options);

    /* DATA RANGES : used for filters */
    let dataRanges: unknown;
    const dataRangeCacheKey = `diamonds-data-ranges-${JSON.stringify(query)}`;
    const cachedDataRanges = await this.utils.memGet(dataRangeCacheKey);

    if (cachedDataRanges) {
      this.Logger.verbose(`diamonds :: cache hit on key ${dataRangeCacheKey}`);
      dataRanges = cachedDataRanges;
    } else {
      const exlusionsQuery = { slug: query['slug'], availableForSale: true, hidden: false };
      const rangeQueries: [Promise<string[]>, Promise<number[]>, Promise<number[]>] = [
        this.diamondRepository.distinct('diamondType', { ...exlusionsQuery }),
        this.diamondRepository.distinct('carat', { ...exlusionsQuery }),
        this.diamondRepository.distinct('price', { ...exlusionsQuery }),
      ];

      const [diamondTypeValues, caratValues, priceValues] = await Promise.all(rangeQueries);

      dataRanges = {
        diamondType: diamondTypeValues.filter(Boolean),
        carat: [Math.min(...caratValues), Math.max(...caratValues)],
        price: [Math.min(...priceValues), Math.max(...priceValues)],
      };
      this.utils.memSet(dataRangeCacheKey, dataRanges, 3600); // set the cache data for 1hr
    }

    result.ranges = dataRanges;

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
    const query = { ...input };

    if (input?.diamondType) {
      const diamondTypes = input.diamondType.trim().split(',');

      query['diamondType'] = {
        $in: diamondTypes, // mongoose $in take an array value as input
      };
    } else {
      query['diamondType'] = {
        $in: DiamondTypes,
      };
    }

    // Optional query for price and currencycode
    // EG: "priceMin": 100.0, "priceMax": 1200.0, "currencyCode": "USD",
    // currencyCode = USD, GBP, EUR, CAD, AUD

    if (input.priceMin && input.priceMax) {
      query['price'] = {
        $gte: input.priceMin, // mongoose $gte operator greater than or equal to
        $lte: input.priceMax, // mongoose $llte operator less than or equal to
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
      query['color'] = {
        $in: colors, // mongoose $in take an array value as input
      };
    } else {
      query['color'] = {
        $in: DiamondColors, // get all the colors
      };
    }

    /**
     * Optional Clarity Query
     * ACCEPTABLE_CLARITIES = ['SI1', 'SI2', 'VS2', 'VS1', 'VVS1', 'VVS2'];
     * Clarity can be passed in as SI1,VS2,WS1 ...etc with comma separted
     */
    if (input?.clarity) {
      const clarity = input.clarity.toLocaleUpperCase().trim().split(',');

      query['clarity'] = {
        $in: clarity, // mongoose $in take an array value as input
      };
    } else {
      query['clarity'] = {
        $in: DiamondClarities, // get all the clarity
      };
    }

    /**
     * Optional Cut Query
     * ACCEPTABLE_CUTS = ['Excellent', 'Ideal', 'Ideal+Hearts'];
     * Cuts can be passed in as Excellent,Ideal ...etc with comma separted
     */
    if (input?.cut) {
      const cuts = input.cut.trim().split(',');

      query['cut'] = {
        $in: cuts, // mongoose $in take an array value as input
      };
    } else {
      query['cut'] = {
        $in: DiamondCuts, // get all the cuts
      };
    }

    /**
     * Optional query for carat range
     * EG: "caratMin": 0.86, "caratMax": 0.98
     */
    if (input.caratMin || input.caratMax) {
      query['carat'] = {
        ...(input.caratMin && { $gte: input.caratMin.toFixed(1) }), // mongoose $gte operator greater than or equal to
        ...(input.caratMax && { $lte: input.caratMax.toFixed(1) }), // mongoose $lte operator less than or equal to
      };
    }
    // if carat range is not provided, calculate range
    else if (input.carat !== null && input.carat !== undefined) {
      query['carat'] = {
        $gte: Math.max(input.carat - 0.2, 0).toFixed(1), // mongoose $gte operator greater than or equal to
        $lte: (input.carat + 0.2).toFixed(1), // mongoose $lte operator less than or equal to
      };
    }

    return query;
  }

  /**
   * Fetch unique non cto diamonds
   * @param { GetDiamondDto } params - requested data
   * @returns
   */

  async getCFYDiamond(params: GetDiamondDto): Promise<IDiamondRecommendation[]> {
    this.Logger.verbose(`Fetching cut to order diamond availability`);

    const filteredQuery = this.optionalDiamondQuery(params);
    const requestedCarat = params.carat || params.caratMin;
    const regexPattern = /fancy/i;

    filteredQuery.availableForSale = true; // only return available diamonds
    filteredQuery.hidden = false;
    filteredQuery['color'] = { $not: { $regex: regexPattern } }; // filter out pink diamonds
    filteredQuery.slug = 'diamonds';
    try {
      const result = await this.diamondRepository.find(filteredQuery);

      // If there are no results for small carat sizes, dont limit the carat range

      if (!result.length && requestedCarat < MIN_CARAT_EMPTY_RESULT) {
        delete filteredQuery.carat;

        const secondaryResult = await this.diamondRepository.find(filteredQuery);

        return sortDiamonds(secondaryResult, caratFirstSortOrder)
          .slice(0, CFY_DIAMOND_LIMIT)
          .map((diamond) => this.addRecommendationLabel(diamond, STAFF_PICKS_LABEL));
      }

      const closestToCaratSortComparator = createSortCaratFromTargetWithWeightComparator(requestedCarat);

      const closestToSortcomparators = {
        ...diamondPropertyAscendingComparitors,
        [DiamondProperty.carat]: closestToCaratSortComparator,
      };

      let uniqueDiamonds = removeIdenticalDiamond4Cs(result);

      uniqueDiamonds = sortDiamonds(uniqueDiamonds, colorFirstSortOrder, closestToSortcomparators);

      // Best brilliance - Diamond closest to selected carat weight that is DEF, VS+
      const bestBrillianceDiamonds = uniqueDiamonds.filter(
        (diamond: IDiamondCollection) => isDEF(diamond.color) && isVSPlus(diamond.clarity),
      );

      const bestBrillianceDiamond = bestBrillianceDiamonds?.[0];
      // Add label
      const bestBrillianceDiamondRec = this.addRecommendationLabel(bestBrillianceDiamond, 'bestBrillianceDiamond');

      // Larger carat - Largest carat diamond in range Diamond from “best brilliance” subset, also DEF VS+
      // Ensure diamond has not already been chosen
      const sortComparators = {
        ...diamondPropertyAscendingComparitors,
        [DiamondProperty.carat]: descendingCaratComparator,
      };
      const largestCaratDiamond = sortDiamonds(bestBrillianceDiamonds, caratFirstSortOrder, sortComparators).find(
        (diamond: IDiamondCollection) => diamond.carat > requestedCarat && diamond.lotId !== bestBrillianceDiamond?.lotId,
      );
      const largestCaratDiamondRec = this.addRecommendationLabel(largestCaratDiamond, 'largestCaratDiamond');

      // Fewest inclusions - Diamond that is VVS+. If multiple, prioritize by color
      // Ensure diamond has not already been chosen
      const fewestInclusionsDiamond = uniqueDiamonds.find(
        (diamond: IDiamondCollection) =>
          isVVSPlus(diamond.clarity) &&
          diamond.lotId !== bestBrillianceDiamond?.lotId &&
          diamond.lotId !== largestCaratDiamond?.lotId,
      );
      // Add label
      const fewestInclusionsDiamondRec = this.addRecommendationLabel(fewestInclusionsDiamond, 'fewestInclusionsDiamond');

      let resultDiamonds = [bestBrillianceDiamondRec, fewestInclusionsDiamondRec, largestCaratDiamondRec].filter(Boolean);

      // Not enough results.
      if (resultDiamonds.length < CFY_DIAMOND_LIMIT) {
        const chosenLotIds = resultDiamonds.map((diamond) => diamond.lotId);

        // Fill with non SI diamonds
        const colorFavoredDiamonds = uniqueDiamonds.filter(
          (diamond: IDiamondCollection) =>
            !chosenLotIds.includes(diamond.lotId) && isClarityGte(diamond.clarity, 'VS2') && isColorGte(diamond.color, 'G'),
        );
        const fallbackDiamonds = colorFavoredDiamonds
          .slice(0, CFY_DIAMOND_LIMIT - resultDiamonds.length)
          .map((diamond) => this.addRecommendationLabel(diamond, STAFF_PICKS_LABEL));

        resultDiamonds = [...resultDiamonds, ...fallbackDiamonds];
      }

      return resultDiamonds;
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

  /**
   * Fetch inventory detail from shopify
   * @param { ProductInventoryDto } id - inventory item id
   * @returns
   */

  async getShopifyProductInventory({ id }: ProductInventoryDto) {
    const queryVars = {
      id: `gid://shopify/InventoryItem/${id}`,
    };

    try {
      const inventory: IShopifyInventory = await this.utils
        .createShopifyAdminGateway()
        .request(INVENTORY_LEVEL_QUERY, queryVars);

      const { variant } = inventory.inventoryItem;

      return variant;
    } catch (error) {
      this.Logger.error(`Error fetching inventory levels: ${error}`);
      throw new InternalServerErrorException(error);
    }
  }

  async getLowestPricedDiamond(input: LowestPricedDto): Promise<IDiamondCollection> {
    try {
      const result = await this.diamondRepository.find({ diamondType: input.diamondType }).sort({ price: 1 }).limit(1);

      if (result) {
        return result[0];
      }
      // If we do not have a diamond of a specific type, something went wrong
      throw new NotFoundException(`Diamond with diamondType: ${input.diamondType} not found`);
    } catch (error) {
      this.Logger.error(`Error fetching lowest priced ${input.diamondType} diamond: ${error}`);
      throw error;
    }
  }

  /**
   * Gets data configuration from DATO for diamond plp and returns paginated diamonds
   * @param {object} input - diamond plp input
   * @param {string} input.slug - diamond PLP slug
   * @returns {object[]} - Array of diamond data and paginator object
   */
  async getPlpDiamonds(input: DiamondPlp) {
    try {
      const { slug, sortBy, sortOrder } = input;
      const queryVars = {
        slug,
        category: 'loose-diamonds',
      };
      const diamondPlpConfig: { listPage: { diamondPlpDataConfig: { colors: string; diamondTypes: string } } } =
        await this.utils.createDataGateway().request(DIAMOND_PLP_DATA_CONFIG_QUERY, queryVars);

      if (diamondPlpConfig.listPage) {
        const { diamondPlpDataConfig } = diamondPlpConfig.listPage;

        if (diamondPlpDataConfig) {
          const { colors, diamondTypes } = diamondPlpDataConfig[0];

          // Parse filter configuration. Trim values.
          const colorFilterValues = colors.trim().length > 0 ? colors.split(',').map((c: string) => c.trim()) : null;
          const diamondTypeFilterValues =
            diamondTypes.trim().length > 0 ? diamondTypes.split(',').map((c: string) => c.trim()) : null;

          const filteredQuery = {
            ...(colorFilterValues && { color: { $in: colorFilterValues } }),
            ...(diamondTypeFilterValues && { diamondType: { $in: diamondTypeFilterValues } }),
            hidden: false,
            isAvailable: true,
            slug: 'diamonds',
          };

          const options = {
            page: input.page || 1,
            limit: input.limit || 12,
            sort: sortBy ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 } : { carat: 1 },
          };

          const result = await this.diamondRepository.paginate(filteredQuery, options);

          const { docs, ...paginator } = result;

          const products: ListPageDiamondItem[] = docs.map((diamond: IDiamondCollection) => {
            const { carat, cut, diamondType, clarity, color, price, lotId, dfCertificateUrl, variantId, handle } = diamond;

            return {
              defaultId: variantId,
              carat,
              cut,
              diamondType,
              clarity,
              color,
              price,
              lotId,
              productType: 'diamonds',
              dfCertificateUrl,
              variantId,
              handle,
            };
          });

          return {
            products,
            paginator,
          };
        }
      } else {
        throw new NotFoundException(`Diamond PLP with slug: ${slug} not found`);
      }
    } catch (error) {
      this.Logger.error(`Error fetching diamond plp data for slug ${input.slug} diamond: ${error}`);
      throw error;
    }
  }

  addRecommendationLabel(diamond: IDiamondCollection, label: string): IDiamondRecommendation {
    if (diamond) {
      return {
        ...diamond,
        label,
      };
    }
  }

  /**
   * Match specific mixed pairs
   * Emerald and Pear (emerald should be 0.5 carats larger than pear)
   * Round Brilliant and Pear
   * Round Brilliant and Oval
   * @param {object} input - The input object containing filtering and sorting.
   * @returns {Array} - An array of objects representing the diamond pairs of mixed diamondtype.
   */
  async getDiamondMixedPair(input: GetDiamondDto) {
    const filteredQuery = this.optionalDiamondPairQuery(input);

    const sortBy = input.sortBy || 'carat';
    const sortOrder = input.sortOrder && input.sortOrder === 'desc' ? -1 : 1;

    const paginateOptions: PaginateOptions = {
      limit: input.limit || 5,
      page: input.page || 1,
      sort: {
        [sortBy]: sortOrder,
      },
    };

    const availableFiltersCaheKey = `toi-moi-diamonds-available-filters`;
    const cachedData = await this.utils.memGet(availableFiltersCaheKey);
    let availableFilters = {};

    if (cachedData) {
      availableFilters = cachedData;
    } else {
      const availableFilterPromises = [
        this.toimoiDiamonds.distinct('diamondType'),
        this.toimoiDiamonds.distinct('color'),
        this.toimoiDiamonds.distinct('clarity'),
        this.toimoiDiamonds.distinct('cut'),
        this.toimoiDiamonds.distinct('price'),
      ];

      const [diamondTypes, color, clarity, cut, price] = await Promise.all(availableFilterPromises);

      availableFilters = { diamondTypes, color, clarity, cut, price: [Math.min(...price), Math.max(...price)] };

      this.utils.memSet(availableFiltersCaheKey, availableFilters, 3600); // set the cache data for 1hr
    }

    try {
      const diamondPairCacheKey = `toimoi-diamonds-${JSON.stringify(filteredQuery)}-${JSON.stringify(paginateOptions)}`;
      const cachedDiamondPairs = await this.utils.memGet(diamondPairCacheKey);

      if (cachedDiamondPairs) {
        return cachedDiamondPairs;
      } else {
        const result = await this.toimoiDiamonds.paginate(filteredQuery, paginateOptions);
        const { docs, ...paginator } = result;
        const response = {
          items: docs,
          paginator,
          availableFilters,
        };

        this.utils.memSet(diamondPairCacheKey, response, 60); // set cache for 1 min

        return response;
      }
    } catch (error) {
      this.Logger.error(`Error fetching solitaire diamond pairs: ${error}`);
      throw error;
    }
  }

  optionalDiamondPairQuery(input) {
    const query = {};

    if (input?.diamondType) {
      query['diamondType'] = input.diamondType;
    }

    if (input?.color) {
      query['color'] = input.color;
    }

    if (input?.cut) {
      query['cut'] = input.cut;
    }

    if (input?.clarity) {
      query['clarity'] = input.clarity;
    }

    if (input?.caratMin || input?.caratMax) {
      query['carat'] = {
        ...(input.caratMin && { $gte: input.caratMin }),
        ...(input.caratMax && { $lte: input.caratMax }),
      };
    }

    return query;
  }

  /**
   * Fetch solitaire diamond pairs.
   * Match color and carat sizes within 0.05 of each other.
   * @param input - The input object containing the diamond type.
   * @returns An array of objects representing the diamond pairs of the same diamondtype.
   */

  async solitaireDiamondPairs(input: GetDiamondDto) {
    const filteredQuery = this.optionalDiamondPairQuery(input);

    const sortBy = input.sortBy || 'carat';
    const sortOrder = input.sortOrder && input.sortOrder === 'desc' ? -1 : 1;

    const paginateOptions: PaginateOptions = {
      limit: input.limit || 5,
      page: input.page || 1,
      sort: {
        [sortBy]: sortOrder,
      },
    };

    const availableFiltersCaheKey = `diamond-pairs-available-filters`;
    const cachedData = await this.utils.memGet(availableFiltersCaheKey);
    let availableFilters = {};

    if (cachedData) {
      availableFilters = cachedData;
    } else {
      const availableFilterPromises = [
        this.diamondPairsRepository.distinct('diamondType'),
        this.diamondPairsRepository.distinct('color'),
        this.diamondPairsRepository.distinct('clarity'),
        this.diamondPairsRepository.distinct('cut'),
        this.diamondPairsRepository.distinct('price'),
      ];

      const [diamondTypes, color, clarity, cut, price] = await Promise.all(availableFilterPromises);

      availableFilters = { diamondTypes, color, clarity, cut, price: [Math.min(...price), Math.max(...price)] };

      this.utils.memSet(availableFiltersCaheKey, availableFilters, 3600); // set the cache data for 1hr
    }

    try {
      const diamondPairCacheKey = `diamond-pairs-${JSON.stringify(filteredQuery)}-${JSON.stringify(paginateOptions)}`;
      const cachedDiamondPairs = await this.utils.memGet(diamondPairCacheKey);

      if (cachedDiamondPairs) {
        return cachedDiamondPairs;
      } else {
        const result = await this.diamondPairsRepository.paginate(filteredQuery, paginateOptions);
        const { docs, ...paginator } = result;
        const response = {
          items: docs,
          paginator,
          availableFilters,
        };

        this.utils.memSet(diamondPairCacheKey, response, 60); // set cache for 1 min

        return response;
      }
    } catch (error) {
      this.Logger.error(`Error fetching solitaire diamond pairs: ${error}`);
      throw error;
    }
  }
}
