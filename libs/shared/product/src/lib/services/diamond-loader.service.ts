/**
 * Diamond Service/Controller
 * @author Bismark Frimpong
 * @date 04/09/2022
 * @version 1.0
 * @copyright DiamondFoundry
 */

import { UtilService } from '@diamantaire/server/common/utils';
import { DiamondRepository } from '@diamantaire/server/diamonds';
import { DIAMOND_TYPES } from '@diamantaire/shared/constants';
import { Injectable, Logger } from '@nestjs/common';

import * as QUERIES from '../schema';
import { extractCursorFromEdgeList } from '../utils';
import {
  combineAndNormalizeDiamonds,
  generateDiamondCollectionHandle,
  normalizeCollectionPages,
  removeUnavailableDiamonds,
  validateDiamondData,
} from '../utils/normalizers/diamonds';
import hideDiamondsForMartin from '../utils/normalizers/hideDiamondsForMartin';

const DIAMOND_MAX_PAGE_SIZE = 120;

@Injectable()
export class DiamondLoaderService {
  private logger = new Logger('DiamondLoaderService');

  constructor(private readonly diamondRepository: DiamondRepository, private readonly utils: UtilService) {}

  async loadDiamonds(input?: string) {
    const diamondTypes = input ? [input] : DIAMOND_TYPES;
    const diamondPromises = diamondTypes.map((diamondType) => this.lookupFilteredDiamondCollection(diamondType));
    const diamonds = await Promise.all(diamondPromises);

    return validateDiamondData(diamonds);
  }

  async lookupFilteredDiamondCollection(diamondType: string) {
    return await this.applyDiamondFilters(await this.lookupAllDiamondCollections([diamondType]));

    //return validateDiamondData(diamonds);
  }

  async applyDiamondFilters(diamonds) {
    if (!diamonds) {
      throw new Error(`No diamonds to hide for martin`);
    }

    return hideDiamondsForMartin(diamonds);
  }

  async lookupAllDiamondCollections(diamondTypes) {
    try {
      const responsePages = [];
      let cursor;

      // loop through send all diamond requests in parallel
      const result = await Promise.all(
        diamondTypes.map(async (type) => {
          do {
            const queryVars = {
              handle: generateDiamondCollectionHandle(type),
              first: DIAMOND_MAX_PAGE_SIZE,
              after: cursor,
            };

            // eslint-disable-next-line no-await-in-loop
            const response: any = await this.utils
              .createShopifyStoreFrontGateway()
              .request(QUERIES.DIAMOND_COLLECTION_QUERY, queryVars);

            responsePages.push(response);

            if (response.collection) {
              cursor = extractCursorFromEdgeList(response.collection.products);
            }
          } while (cursor);

          const normalizer = normalizeCollectionPages(responsePages);

          return normalizer;
        }),
      );

      const normalizedDiamonds = combineAndNormalizeDiamonds(result);

      const diamondData = await removeUnavailableDiamonds(normalizedDiamonds);
      const productUpdate = await this.diamondRepository.bulkUpdateDiamonds(diamondData, 'diamonds');

      this.logger.debug(`Done loading total :: ${JSON.stringify(productUpdate.nUpserted)}}`);

      return diamondData;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
