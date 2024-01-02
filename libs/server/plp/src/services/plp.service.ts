/* eslint-disable @nx/enforce-module-boundaries */
/**
 * @file products.service.ts
 * @description Products service class
 */
import {
  PLP_QUERY,
  CONFIGURATIONS_LIST,
  ERPDP,
  JEWELRYPRODUCT,
  WEDDING_BAND_PDP,
} from '@diamantaire/darkside/data/api';
import { UtilService } from '@diamantaire/server/common/utils';
import { DIAMOND_PAGINATED_LABELS } from '@diamantaire/shared/constants';
import {
  VraiProduct,
  getConfigMatrix,
  ListPageItemConfiguration,
  ListPageItemWithConfigurationVariants,
  getOptionValueSorterByType,
  sortMetalTypes,
  sortDiamondTypes,
} from '@diamantaire/shared-product';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Inject
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import Bottleneck from 'bottleneck';
import { Variables } from 'graphql-request';
import { PipelineStage, FilterQuery, PaginateOptions } from 'mongoose';

import { PaginateFilterDto } from '../dto/paginate-filter.dto';
import { PlpEntity } from '../entities/plp.entity';
import {
  getDraftQuery,
} from '../helper/plp.helper';
import { PLPResponse } from '../interface/plp.interface';
import { PlpRepository } from '../repository/plp.repository';

const TTL_HOURS = 48;
const PRODUCT_DATA_TTL = TTL_HOURS * 60 * 60 * 1000; // ttl in seconds

@Injectable()
export class PlpService {
  private logger = new Logger(PlpService.name);
  private limiter: Bottleneck;
  constructor(
    private readonly plpRepository: PlpRepository,
    private readonly utils: UtilService,
    @Inject(CACHE_MANAGER) private readonly cacheManager:CacheStore
  ) {
    // create an intance of Bottleneck
    this.limiter = new Bottleneck({
      maxConcurrent: 1,
      minTime: 100,
    });
  }

  /**
   * This function accepts an input for a diamond type
   * @param input diamond filter input
   * @return a filtered diamon list
   */

  async getPlpProducts(input: PaginateFilterDto): Promise<PlpEntity> {

    const options: PaginateOptions = {
      limit: input.limit || 30,
      page: input.page || 1,
      customLabels: DIAMOND_PAGINATED_LABELS,
    };

    const query = {
      ...getDraftQuery(),
    };

    if (input?.slug) {
      query['collectionSlug'] = input?.slug;
    }

    if (input?.productType) {
      query['productType'] = input?.productType;
    }

    try {
      return await this.productRepository.paginate(query, options);
    } catch (error: any) {
      this.logger.error(`Error while fetching all partners: ${error}`);
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'http.serverError.internalServerError',
        error: error.message,
      });
    }
  }

  
  /**
   * The Dato API is not rate limited. They just charge us for every call on request
   * that does not hit their CDN. https://www.datocms.com/docs/content-delivery-api/rate-limiting
   * We also cache the response in memory for fewer round trips.
   * @param { String } collectionSlug - production collection slug
   * @param { String } productHandle - product handle
   * @param { String } locale - country locale
   * @returns { Promise<object> }
   */

  async datoContentForEngagementRings({ collectionSlug, productHandle, locale = 'en_US' }): Promise<object> {
    this.logger.verbose(`Entering into dataContent ${collectionSlug}-${productHandle}-${locale}`);
    const cachedKey = `${collectionSlug}-${productHandle}-${locale}`;
    let response = await this.utils.memGet<object>(cachedKey); // return the cached result if there's a key

    const queryVars = {
      collectionSlug,
      productHandle,
      locale: getDatoRequestLocale(locale),
    };

    try {
      if (!response) {
        response = await this.utils.createDataGateway().request(ERPDP, queryVars); // dato engagement ring pdp query
        this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        this.utils.memSet(cachedKey, response, PRODUCT_DATA_TTL); //set the response in memory
      }

      return response;
    } catch (error: any) {
      this.logger.error(`datoContentForEngagementRings :: error : ${error.message}`);
      throw error;
    }
  }

  async datoContentForWeddingBands({ collectionSlug, productHandle, locale = 'en_US' }): Promise<object> {
    this.logger.verbose(`Entering into dataContent ${collectionSlug}-${productHandle}-${locale}`);
    const cachedKey = `${collectionSlug}-${productHandle}-${locale}`;
    let response = await this.utils.memGet<object>(cachedKey); // return the cached result if there's a key

    const queryVars = {
      collectionSlug,
      productHandle,
      locale: getDatoRequestLocale(locale),
    };

    try {
      if (!response) {
        response = await this.utils.createDataGateway().request(WEDDING_BAND_PDP, queryVars); // dato engagement ring pdp query
        this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        this.utils.memSet(cachedKey, response, PRODUCT_DATA_TTL); //set the response in memory
      }

      return response;
    } catch (error: any) {
      this.logger.error(`datoContentForEngagementRings :: error : ${error.message}`);
      throw error;
    }
  }

  async datoContentForJewelry({ slug, variantId, locale }): Promise<object> {
    this.logger.verbose(`Entering into dataContent ${slug}-${variantId}-${locale}`);
    const cachedKey = `${slug}-${variantId}-${locale}`;
    let response = await this.utils.memGet<object>(cachedKey); // return the cached result if there's a key

    const queryVars = {
      slug,
      variantId,
      locale: getDatoRequestLocale(locale),
    };

    try {
      if (!response) {
        response = await this.utils.createDataGateway().request(JEWELRYPRODUCT, queryVars); // dato engagement ring pdp query
        this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        this.utils.memSet(cachedKey, response, PRODUCT_DATA_TTL); //set the response in memory
      }

      return response;
    } catch (error: any) {
      this.logger.error(`datoContentForJewelry :: error : ${error.message}`);
      throw error;
    }
  }

  

  async findPlpData(query: PlpQuery) {
    
    const {
      slug,
      category,
      locale = 'en_US',
      metals,
      diamondTypes,
      priceMin,
      priceMax,
      styles,
      subStyles,
      page,
      limit,
      sortBy,
      sortOrder,
    } = query;

    // performance measurement
    const p0 = performance.now();
  
    const cachedKey = `plp-${category}-${slug}-${locale}-${this.generateQueryCacheKey(query)}`;
    
    let plpReturnData;
    // check for cached data
    const cachedData = await this.cacheManager.get(cachedKey);

    if (cachedData) {
      this.logger.verbose(`PLP :: cache hit on key ${cachedKey} :: ${performance.now() - p0}ms`);

      return cachedData; // return the entire cached data including dato content
    }

    try {
      // Get Dato PLP data
      const plpContent = await this.datoPLPContent({ slug, category, locale });

      // performance measurement
      const postDatoTime = performance.now();

      this.logger.verbose(`PLP :: Dato PLP data Retrieved :: ${postDatoTime - p0}ms`);

      if (!plpContent.listPage) {
        throw new NotFoundException(`PLP slug: ${slug} and category: ${category} not found`);
      }

      const { bestSellersInOrder, configurationsInOrder, productsInOrder, collectionsInOrder } = plpContent.listPage;

      // PLP merchandized by collection.  Currently only supports engagement rings
      if (collectionsInOrder.length > 0) {
        const collectionSlugsInOrder = collectionsInOrder.map((collection) => collection.slug);

        plpReturnData = await this.getCollectionInOrderPlpProducts(slug, collectionSlugsInOrder, {
          metals,
          diamondTypes,
          page,
          limit,
        });

        this.cacheManager.set(cachedKey, plpReturnData, PRODUCT_DATA_TTL);

        return plpReturnData;
      }

      // Need to support both productsInOrder and ConfigurationsInOrder
      let productList = configurationsInOrder;
      
      if (productsInOrder.length){
        productList = productsInOrder;
      } 
      if(bestSellersInOrder.length){
        productList = bestSellersInOrder;
      }

      const contentIdsInOrder: string[] = [];
      let plpProductsContentData;

      if (configurationsInOrder || productsInOrder || bestSellersInOrder) {
        plpProductsContentData = productList.reduce((data, item) => {
          let contentId: string, content: object;

          if (item._modelApiKey === 'configuration') {
            contentId = item.variantId;
            content = { ...item.jewelryProduct };
            // delete item.jewelryProduct;
          } else if (item._modelApiKey === 'omega_product') {
            contentId = item.shopifyProductHandle;
            content = { ...item.collection };
            // delete item.collection;
          }

          contentIdsInOrder.push(contentId);

          data[contentId] = {
            content: {
              ...item,
              ...content,
            },
          };

          return data;
        }, {});
      }

      const getFiltersQuery = ({
        ms,
        dTs,
        pMin,
        pMax,
        stylesFilters,
        subStylesFilters,
      }): FilterQuery<{
        'configuration.metal'?: string;
        'configuration.diamondType'?: string;
        price?: string;
        style?: string;
      }>[] => {
        const query = [];

        if (ms && ms.length > 0) {
          query.push({ 'configuration.metal': { $in: ms } });
        }
        if (dTs && dTs.length > 0) {
          const diamondTypeRegex = dTs.map((dt) => new RegExp(dt, 'i'));

          query.push({ 'configuration.diamondType': { $in: diamondTypeRegex } });
        }

        if (typeof pMin !== 'undefined') {
          query.push({ price: { $gte: priceMin } });
        }
        if (typeof pMax !== 'undefined') {
          query.push({ price: { $lte: priceMax } });
        }

        if (typeof stylesFilters !== 'undefined' && stylesFilters.length > 0) {
          query.push({ styles: { $in: stylesFilters } });
        }

        if (typeof subStylesFilters !== 'undefined' && subStylesFilters.length > 0) {
          query.push({ subStyles: { $in: subStylesFilters } });
        }

        return query;
      };

      const filterQueries = getFiltersQuery({
        ms: metals,
        dTs: diamondTypes,
        pMin: priceMin,
        pMax: priceMax,
        stylesFilters: styles,
        subStylesFilters: subStyles,
      });

      // Build Query
      const pipeline: PipelineStage[] = [
        { $match: { $and: [{ contentId: { $in: contentIdsInOrder } }, ...filterQueries, getDraftQuery()] } },
        { $addFields: { __order: { $indexOfArray: [contentIdsInOrder, '$contentId'] } } },
        { $sort: { __order: 1 } },
      ];

      // sortOrder already declared
      const sortByKey = sortBy || null;
      const sortByObj = {};

      if (sortByKey) {
        sortByObj[sortByKey] = sortOrder;
      }

      const paginateOptions: PaginateOptions = {
        limit: limit || 20,
        page: page || 1,
        ...(sortByKey && { sort: sortByObj }),
      };

      const productsResponse = await this.productRepository.aggregatePaginate<VraiProduct>(pipeline, paginateOptions);

      // performance measurement
      const postMainProductMongo = performance.now();

      this.logger.verbose(`PLP :: Mongo primary product data Retrieved :: ${postMainProductMongo - postDatoTime}ms (total: ${postMainProductMongo - p0}ms)`);

      const availableFiltersCacheKey = `plp-${slug}-filter-types`;
      // check for cached data
      let availableFilters = await this.utils.memGet(availableFiltersCacheKey);

      if (!availableFilters) {
        this.logger.verbose(`PLP :: Filters :: cache miss on key ${availableFiltersCacheKey}`);
        const preFiltersReq = performance.now();
        const filterValueQueries: [
          Promise<string[]>,
          Promise<string[]>,
          Promise<number[]>,
          Promise<string[]>,
          Promise<string[]>,
        ] = [
          this.productRepository.distinct('configuration.metal', {
            contentId: { $in: contentIdsInOrder },
          }),
          this.productRepository.distinct('configuration.diamondType', {
            contentId: { $in: contentIdsInOrder },
          }),
          this.productRepository.distinct('price', {
            contentId: { $in: contentIdsInOrder },
          }),
          this.productRepository.distinct('styles', {
            contentId: { $in: contentIdsInOrder },
          }),
          this.productRepository.distinct('subStyles', {
            contentId: { $in: contentIdsInOrder },
          }),
        ];

        const [availableMetals, availableDiamondTypes, priceValues, availableStyles, availableSubStyles] =
          await Promise.all(filterValueQueries);

        // split joined types to be individual types and remove duplicates
        const explodedDiamondTypes = [ ...new Set(availableDiamondTypes.flatMap(d => d.split('+')))];
        const explodedMetalType = [ ...new Set(availableMetals.flatMap(m => m.split(' and ')))];

        availableFilters = {
          metal: explodedMetalType.sort(sortMetalTypes),
          diamondType: explodedDiamondTypes.sort(sortDiamondTypes),
          price: [Math.min(...priceValues), Math.max(...priceValues)],
          styles: availableStyles,
          subStyles: availableSubStyles,
        };
        // performance measurement
        const postFilterReq = performance.now();

        this.logger.verbose(`PLP :: Available filters request :: ${postFilterReq - preFiltersReq}ms (total: ${postFilterReq - p0}ms)`);
        this.utils.memSet(availableFiltersCacheKey, availableFilters, PRODUCT_DATA_TTL);
      }

      // Add product data to PLP data
      const collectionSlugsSet = new Set<string>();
      const products = productsResponse.docs;
      const scopedPlpData = products.reduce((map: Record<string, { content: object; product: VraiProduct }>, product) => {
        map[product.contentId] = {
          content: plpProductsContentData[product?.contentId]?.content,
          product,
        };

        collectionSlugsSet.add(product.collectionSlug);

        return map;
      }, {});

      // PERFORMANCE BENCHMARK: Mongo collection request
      const preMongoCollectionReq = performance.now();

      const collectionSlugs = [...collectionSlugsSet];
      const collections = await this.productRepository.find({ collectionSlug: { $in: collectionSlugs } });
      const collectionsMap = collections.reduce((map: Record<string, VraiProduct[]>, collection) => {
        if (!map[collection.collectionSlug]) {
          map[collection.collectionSlug] = [collection];
        } else {
          map[collection.collectionSlug].push(collection);
        }

        return map;
      }, {})

      const postMongoCollectionReq = performance.now();

      this.logger.verbose(`PLP :: Mongo Collection Request :: ${postMongoCollectionReq - preMongoCollectionReq}ms (total: ${postMongoCollectionReq - p0}ms)`);

      // for each collection slug, get each configuration based on the primary contentId
      // get all configMatrices
      const configMatrixByContentId: Record<string, Record<string, string[]>> = Object.keys(scopedPlpData).reduce(
        (matrix, contentId) => {
          const collectionSlug = scopedPlpData[contentId]?.product?.collectionSlug;

          if (collectionSlug && collectionsMap[collectionSlug]) {
            matrix[contentId] = getConfigMatrix(
              collectionsMap[collectionSlug],
              scopedPlpData[contentId].product.configuration,
            );
          } else {
            this.logger.verbose(`Could not find product information for contentId: ${contentId}`);
          }

          return matrix;
        },
        {},
      );

      // split content ids into configurations and product record requests
      const [variantIds, productHandles]: [string[], string[]] = Object.keys(configMatrixByContentId).reduce(
        (idTuple, contentId) => {
          const [v, p] = idTuple;
          const configMatches = configMatrixByContentId[contentId];
          const uniqueIds = Object.values(configMatches.metal).filter((id) => id !== contentId);

          // Add to plp product data
          scopedPlpData[contentId]['metal'] = configMatches.metal;

          if (plpProductsContentData[contentId].content._modelApiKey === 'configuration') {
            v.push(...uniqueIds);
          } else {
            p.push(...uniqueIds);
          }

          return [v, p];
        },
        [[], []],
      );

      const variantContentIds = [...variantIds, ...productHandles];

      // PERFORMANCE BENCHMARK: Dato & Mongo variant request
      const preVariantDataRequest = performance.now();

      // TODO: may need paginated request but most likely not since we limit to ~12 items per page
      // request all contentIds from Mongo and DB
      const variantPromises: [Promise<object[]>, Promise<VraiProduct[]>] = [
        this.datoConfigurationsAndProducts({ slug, variantIds: variantContentIds, productHandles: productHandles }),
        this.productRepository.find({ contentId: { $in: variantContentIds } }),
      ];
      const [variantContentData, variantProducts] = await Promise.all(variantPromises);

      const postVariantDataRequest = performance.now();

      this.logger.verbose(`PLP :: Mongo & Dato variant Request :: ${postVariantDataRequest - preVariantDataRequest}ms (total: ${postVariantDataRequest - p0}ms)`);

      const variantsMap = variantContentIds.reduce(
        (map: Record<string, { content?: object; product?: VraiProduct }>, contentId) => {
          map[contentId] = {
            content: variantContentData.find((item) => {
              return item['variantId'] === contentId || item['shopifyProductHandle'] === contentId;
            }),
            product: variantProducts.find((item) => item['contentId'] === contentId),
          };

          return map;
        },
        {},
      );

      const lowestPricesByCollection = await this.getLowestPricesByCollection();

      // merge and reduce
      const plpProducts = Object.values(scopedPlpData).reduce(
        (plpItems: ListPageItemWithConfigurationVariants[], item: any /* VraiProductData */) => {
          const { content, product, metal: metalOptions } = item;

          const altConfigs = Object.values<string>(metalOptions).reduce((map, id) => {
            const variantData = variantsMap[id];

            if (id === product.contentId) {
              return map;
            }

            if (variantData) {
              if (variantData.product && variantData.content) {
                const { product: variantProduct, content: variantContent } = variantsMap[id as string];

                map[id as string] = this.createPlpProduct(variantProduct, variantContent);
              } else if (!variantData.product) {
                this.logger.debug(`Missing product data for contentId: ${id}`);
              } else if (!variantData.content) {
                this.logger.debug(
                  `Missing content data for contentId: ${id}, collectionSlug: ${variantData?.product?.collectionSlug}`,
                );
              }
            } else {
              this.logger.debug(`Missing variantData data for contentId: ${id}`);
            }

            return map;
          }, {});

          const useLowestPrice = !content?.shouldUseDefaultPrice;
          const hasOnlyOnePrice = content?.hasOnlyOnePrice;
          const productLabel = content?.productLabel;
          const variants = {
            [product.contentId]: this.createPlpProduct(product, content),
            ...altConfigs,
          };

          const lowestPrice = lowestPricesByCollection?.[product.collectionSlug];

          plpItems.push({
            defaultId: product.contentId,
            productType: product.productType,
            productTitle: content.collection.productTitle,
            plpTitle: content?.plpTitle,
            ...(productLabel && { productLabel }),
            ...(hasOnlyOnePrice && { hasOnlyOnePrice }),
            ...(useLowestPrice && { useLowestPrice }),
            ...(lowestPrice && { lowestPrice }),
            metal: Object.keys(metalOptions)
              .sort(getOptionValueSorterByType('metal'))
              .map((metalType) => ({ value: metalType, id: metalOptions[metalType] })),
            variants,
          });

          return plpItems;
        },
        [],
      );

      const paginator = {
        totalDocs: productsResponse.totalDocs,
        limit: productsResponse.limit,
        page: productsResponse.page,
        totalPages: productsResponse.totalPages,
        pagingCounter: productsResponse.pagingCounter,
        hasPrevPage: productsResponse.hasPrevPage,
        hasNextPage: productsResponse.hasNextPage,
        prevPage: productsResponse.prevPage,
        nextPage: productsResponse.nextPage,
      };

      plpReturnData = {
        // ...listPageContent,
        products: plpProducts,
        availableFilters,
        paginator,
      };

      this.logger.verbose(`PLP :: cache set on key ${cachedKey}`);
      this.cacheManager.set(cachedKey, plpReturnData, PRODUCT_DATA_TTL);

      return plpReturnData;
    } catch (error: any) {
      this.logger.error(`findPlpData :: error : ${error.message}`);
      throw error;
    }
  }

  /**
   * Given a plp slug, return the content for the plp including available filters and paginator data
   * @param {string} slug plp slug
   * @param {string[]} collectionSlugsInOrder array of collectionSlugs in desired display order
   * @param {object} options filter and pagination options
   * @returns
   */

  async getCollectionInOrderPlpProducts(
    slug: string,
    collectionSlugsInOrder: string[],
    { metals, diamondTypes, page = 1, limit = 12 }: { metals: string[]; diamondTypes: string[]; page?: number; limit: number },
  ) {
    const diamondTypesRegex = diamondTypes?.map((diamondType) => new RegExp(diamondType, 'i'));

    const diamondTypesQueryValues = diamondTypes?.length ? diamondTypesRegex : [ new RegExp('round-brilliant', "i")];
    const metalsQueryValues = metals?.length ? metals : ['yellow-gold'];

    try {
      const productsResponse = await this.productRepository.aggregatePaginate<VraiProduct>(
        [
          // Takes an array of collectionSlug
          // Finds al records from those collection which satisfy the metal and diamondType filters
          {
            $match: {
              collectionSlug: { $in: collectionSlugsInOrder },
              'configuration.diamondType': { $in: diamondTypesQueryValues  }, // always has a filter applied
              'configuration.metal': { $in: metalsQueryValues }, // always has a filter applied
              ...getDraftQuery(),
            },
          },
          // Add fields to allow sorting by collectionSlug array
          { $addFields: { __collectionOrder: { $indexOfArray: [collectionSlugsInOrder, '$collectionSlug'] } } },
          // Adds fields to allow sorting by all of the configuration properties
          {
            $addFields: {
              __bandAccentOrder: { $indexOfArray: [['plain', 'pave', 'double-pave', 'pave-twisted', 'double-pave-twisted'], '$configuration.bandAccent'] },
            },
          },
          {
            $addFields: {
              __caratWeightOrder: {
                $indexOfArray: [['other', '0.25ct', '0.5ct', '1.0ct', '1.5ct', '2.0ct'], '$configuration.caratWeight'],
              },
            },
          },
          {
            $addFields: {
              __sideStoneShapeOrder: {
                $indexOfArray: [
                  ['round-brilliant', 'oval', 'emerald', 'pear', 'radiant', 'cushion', 'marquise', 'trillion', 'asscher', 'princess', 'tapered-baguette', 'round-brilliant+oval', 'round-brilliant+pear', 'emerald+pear'],
                  '$configuration.sideStoneShape',
                ],
              },
            },
          },
          {
            $addFields: {
              __sideStoneCaratOrder: { $indexOfArray: [['0.25ct', '0.5ct', '1ct', '2ct'], '$configuration.sideStoneCarat'] },
            },
          },
          {
            $addFields: {
              __diamondOrientationOrder: {
                $indexOfArray: [['vertical', 'horizontal'], '$configuration.diamondOrientation'],
              },
            },
          },
          { $addFields: { __goldPurityOrder: { $indexOfArray: [['18k', '14k'], '$configuration.goldPurity'] } } },
          { $addFields: { __prongStyleOrder: { $indexOfArray: [['plain', 'pave'], '$configuration.prongStyle'] } } },
          {
            $addFields: { __haloSizeOrder: { $indexOfArray: [['original', 'small', 'large'], '$configuration.haloSize'] } },
          },
          { $addFields: { __prongStyleOrder: { $indexOfArray: [['plain', 'pave'], '$configuration.prongStyle'] }  } },
          { $addFields: { __hiddenHaloOrder: { $indexOfArray: [['yes'], '$configuration.hiddenHalo'] }  } },
          { $addFields: { __diamondOrientationOrder: { $indexOfArray: [['vertical','horizontal'], '$configuration.diamondOrientation'] }  } },
          { $addFields: { __bandStoneShapeOrder: { $indexOfArray: [['round-brilliant', 'baguette'], '$configuration.bandStoneShape'] }  } },
          // Sorts by those properties
          {
            $sort: {
              __bandAccentOrder: 1,
              __sideStoneShapeOrder: 1,
              __sideStoneCaratOrder: 1,
              __caratWeightOrder: 1,
              __goldPurityOrder: 1,
              __prongStyleOrder: 1,
              __haloSizeOrder: 1,
              __hiddenHaloOrder: 1,
              __diamondOrientationOrder: 1,
              __bandStoneShapeOrder: 1,
            },
          },
          // Groups them by collectionSlug
          {
            $group: {
              _id: {
                collectionSlug: '$collectionSlug',
              },
              firstDocument: { $first: '$$ROOT' },
            },
          },
          // returns the first doc in each collection (from the sorted ones)
          {
            $replaceRoot: {
              newRoot: '$firstDocument',
            },
          },
          {
            $project: {
              _id: 0,
            },
          },
          // Sorts them all by collectionSlug
          {
            $sort: {
              __collectionOrder: 1,
            },
          },
        ],
        { page, limit },
      );

      const collectionsProduct = productsResponse.docs;

      // get matching dato data for er products
      const productHandles = collectionsProduct.map((product) => product.contentId);
      const productContent = await this.datoConfigurationsAndProducts({ slug, productHandles });
      const lowestPricesByCollection = await this.getLowestPricesByCollection();

      const products = collectionsProduct.reduce((productsArray: ListPageItemWithConfigurationVariants[], product) => {
        const content = productContent.flat().find((itemContent) => itemContent.shopifyProductHandle === product.contentId);

        // reduce and merge
        if (!content) {
          this.logger.debug('No content found for product', product.contentId);
          Sentry.captureMessage(`No content found for product: ${product.contentId}`);

          // skip product if no match is found
          return productsArray;
        } else {

          const useLowestPrice = !content?.shouldUseDefaultPrice;
          const hasOnlyOnePrice = content?.hasOnlyOnePrice;
          const productLabel = content?.productLabel;

          const lowestPrice = lowestPricesByCollection?.[product.collectionSlug];

          productsArray.push({
            defaultId: product.contentId,
            productTitle: content?.collection.productTitle,
            plpTitle: content?.plpTitle,
            productType: product.productType,
            ...(productLabel && { productLabel }),
            ...(hasOnlyOnePrice && { hasOnlyOnePrice }),
            ...(useLowestPrice && { useLowestPrice }),
            ...(lowestPrice && { lowestPrice }),
            metal: [],
            variants: {
              [product.contentId]: this.createPlpProduct(product, content),
            },
          });
        }

        return productsArray;
      }, []);

      const availableFiltersCacheKey = `plp-${slug}-filter-types`;
      // check for cached data
      let availableFilters = await this.utils.memGet(availableFiltersCacheKey);

      if (!availableFilters) {
        this.logger.verbose(`PLP :: Filters :: cache miss on key ${availableFiltersCacheKey}`);

        const filterValueQueries: [
          Promise<string[]>,
          Promise<string[]>,
          Promise<number[]>,
          Promise<string[]>,
          Promise<string[]>,
        ] = [
          this.productRepository.distinct('configuration.metal', {
            collectionSlug: { $in: collectionSlugsInOrder },
          }),
          this.productRepository.distinct('configuration.diamondType', {
            collectionSlug: { $in: collectionSlugsInOrder },
          }),
          this.productRepository.distinct('price', {
            collectionSlug: { $in: collectionSlugsInOrder },
          }),
          this.productRepository.distinct('styles', {
            collectionSlug: { $in: collectionSlugsInOrder },
          }),
          this.productRepository.distinct('subStyles', {
            collectionSlug: { $in: collectionSlugsInOrder },
          }),
        ];

        const [availableMetals, availableDiamondTypes, priceValues, availableStyles, availableSubStyles] =
          await Promise.all(filterValueQueries);

        const explodedDiamondTypes = [ ...new Set(availableDiamondTypes.flatMap(d => d.split('+')))];
        const explodedMetalType = [ ...new Set(availableMetals.flatMap(m => m.split(' and ')))];

        availableFilters = {
          metal: explodedMetalType.sort(sortMetalTypes),
          diamondType: explodedDiamondTypes.sort(sortDiamondTypes),
          price: [Math.min(...priceValues), Math.max(...priceValues)],
          styles: availableStyles,
          subStyles: availableSubStyles,
        };

        this.utils.memSet(availableFiltersCacheKey, availableFilters, PRODUCT_DATA_TTL);
      }

      const paginator = {
        totalDocs: productsResponse.totalDocs,
        limit: productsResponse.limit,
        page: productsResponse.page,
        totalPages: productsResponse.totalPages,
        pagingCounter: productsResponse.pagingCounter,
        hasPrevPage: productsResponse.hasPrevPage,
        hasNextPage: productsResponse.hasNextPage,
        prevPage: productsResponse.prevPage,
        nextPage: productsResponse.nextPage,
      };

      return {
        products,
        availableFilters,
        paginator,
      };
    } catch (error: any) {
      this.logger.error(`findPlpData :: error : ${error.message}`);
      throw error;
    }
  }

  createPlpProduct(product: VraiProduct, content: Record<string, any>): ListPageItemConfiguration {
    return {
      title: content['plpTitle'] || content?.collection?.productTitle || product.collectionTitle,
      productTitle: content?.collection?.productTitle,
      plpTitle: content?.plpTitle,
      productSlug: product.productSlug,
      collectionSlug: product.collectionSlug,
      configuration: product.configuration,
      productType: product.productType,
      primaryImage: content['plpImage']?.responsiveImage,
      hoverImage: content['plpImageHover']?.responsiveImage,
      price: product.price,
    };
  }

  /**
   * Gets Dato listPage content necessary to make additional queries for plp data
   * @param {object} input - PLP input
   * @param {string} input.category - PLP category
   * @param {string} input.slug - PLP slug
   * @param {string} input.locale - locale for content
   * @returns {object}- Dato listPage content
   */
  async datoPLPContent({
    slug,
    category,
    locale,
  }: {
    slug: string;
    category: string;
    locale: string;
  }): Promise<PLPResponse> {
    const cachedKey = `${category}-${slug}-${locale}`;

    this.logger.verbose(`Entering into dataContent ${cachedKey}`);
    let response = await this.utils.memGet<PLPResponse>(cachedKey); // return the cached result if there's a key

    const queryVars = {
      slug,
      category,
      locale: getDatoRequestLocale(locale),
    };

    try {
      if (!response) {
        response = await this.utils.createDataGateway().request(PLP_QUERY, queryVars); // dato engagement ring pdp query
        this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        this.utils.memSet(cachedKey, response, PRODUCT_DATA_TTL); //set the response in memory
      }

      return response;
    } catch (error) {
      this.logger.debug(`Error retrieving PLP content for slug: ${slug}`, error);
      throw error;
    }
  }

  async datoPLPConfigurations({ slug, locale }: { slug: string; locale: string }): Promise<PLPResponse> {
    this.logger.verbose(`Entering into dataContent ${slug}-${locale}`);
    const cachedKey = `${slug}-${locale}`;
    let response = await this.utils.memGet<PLPResponse>(cachedKey); // return the cached result if there's a key

    const queryVars = {
      slug,
      locale: getDatoRequestLocale(locale),
    };

    try {
      if (!response) {
        // response = await this.limiter.schedule(async () => {
        //   this.utils.createDataGateway().request(QUERIES.erPDP, queryVars);
        // });
        response = await this.utils.createDataGateway().request(PLP_QUERY, queryVars); // dato engagement ring pdp query
        this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        this.utils.memSet(cachedKey, response, PRODUCT_DATA_TTL); //set the response in memory
      }

      return response;
    } catch (error) {
      this.logger.error(`Error retrieving PLP content for slug: ${slug}`, error);
      throw error;
    }
  }

  async datoPLPProducts({ slug, locale }: { slug: string; locale: string }): Promise<PLPResponse> {
    this.logger.verbose(`Entering into dataContent ${slug}-${locale}`);
    const cachedKey = `${slug}-${locale}`;
    let response = await this.utils.memGet<PLPResponse>(cachedKey); // return the cached result if there's a key

    const queryVars = {
      slug,
      locale: getDatoRequestLocale(locale),
    };

    try {
      if (!response) {
        response = await this.utils.createDataGateway().request(PLP_QUERY, queryVars); // dato engagement ring pdp query
        this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        this.utils.memSet(cachedKey, response, PRODUCT_DATA_TTL); //set the response in memory
      }

      return response;
    } catch (error) {
      this.logger.error(`Error retrieving PLP content for slug: ${slug}`, error);
      throw error;
    }
  }

  /**
   * Gets a list of dato configurationd and products for plps based on plp slug
   * @param {object} input - PLP input
   * @param {string} input.slug - PLP slug
   * @param {Array.<string>} input.variantIds - list of variant ids to find configurations for
   * @param {Array.<string>} input.productHandles - list of product handles to find products for
   * @param {number} input.first - number of items to return
   * @param {number} input.skip - number of items to skip
   * @returns
   */

  async datoConfigurationsAndProducts({
    slug,
    variantIds = [],
    productHandles = [],
    first = 100,
    skip = 0,
  }: {
    slug: string;
    variantIds?: string[];
    productHandles?: string[];
    first?: number;
    skip?: number;
  }): Promise<any> {
    const ids = [...variantIds, ...productHandles].sort();

    this.logger.verbose(`Getting Dato configurations & products for ${slug}`);
    const cachedKey = `plp-configurations-${slug}-${ids.join('-')}-${first}-${skip}`;
    let response = await this.utils.memGet<any>(cachedKey); // return the cached result if there's a key

    const queryVars = {
      productHandles,
      variantIds,
      first,
      skip,
    };

    try {
      if (!response) {
        response = await this.utils.createDataGateway().request(CONFIGURATIONS_LIST, queryVars);
        this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        this.utils.memSet(cachedKey, response, PRODUCT_DATA_TTL); //set the response in memory
      }

      return [...response.allConfigurations, ...response.allOmegaProducts];
    } catch (err) {
      this.logger.debug(`Cannot retrieve configurations and products for ${slug}`);
      throw new NotFoundException(`Cannot retrieve configurations and products for ${slug}`, err);
    }
  }

  async getDatoContent<TData, TVars extends Variables>({
    query,
    variables,
  }: {
    query: string;
    variables: TVars;
  }): Promise<TData> {
    try {
      const response = await this.utils.createDataGateway().request<TData, any>(query, variables);

      return response;
    } catch (error) {
      this.logger.error(`Error retrieving Dato content`, error);
      throw error;
    }
  }

  async datoConfigurationsAndProductContent({
    jewelryIds = [],
    nonJewelryIds = [],
    locale = 'en_US',
    first = 100,
    skip = 0,
  }: {
    jewelryIds?: string[];
    nonJewelryIds?: string[];
    locale;
    first?: number;
    skip?: number;
  }): Promise<any> {
    this.logger.verbose(`Getting Dato configurations & products for a list of products`);
    // const cachedKey = `configurations-${slug}-${ids.join('-')}-${first}-${skip}`;
    let response; // = await this.utils.memGet<any>(cachedKey); // return the cached result if there's a key

    const queryVars = {
      productHandles: nonJewelryIds,
      variantIds: jewelryIds,
      locale,
      first,
      skip,
    };

    try {
      if (!response) {
        response = await this.utils.createDataGateway().request(CONFIGURATIONS_LIST, queryVars);
        // this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        // this.utils.memSet(cachedKey, response, PRODUCT_DATA_TTL); //set the response in memory
      }

      return [...response.allConfigurations, ...response.allOmegaProducts];
    } catch (err) {
      // this.logger.debug(`Cannot retrieve configurations and products for ${slug}`);
      // throw new NotFoundException(`Cannot retrieve configurations and products for ${slug}`, err);
    }
  }

  getCollectionSlugs(input: CatalogProductInput): any {
    return this.getCollectionSlugsByType(input.type);
  }

  

  generateQueryCacheKey(query: Record<string, unknown>) {
    return Object.entries(query)
      .filter(([,v])=> {
        if (Array.isArray(v)) {
          return v.length > 0;
        } else {
          return typeof v !== 'undefined';
        }
      })
      .map(([k,v]) => `${k}=${v}`)
      .flat().sort().join('-');
  }
}

function getDatoRequestLocale(locale = 'en_US'): string {
  const validDatoLocales = ['en_US', 'fr', 'de', 'es'];
  const language = locale.split('-')[0];

  if (!validDatoLocales.includes(language)) {
    return 'en_US';
  }

  if (language === 'en') {
    return 'en_US';
  } else {
    return language;
  }
}

interface CatalogProductInput {
  type: string;
}
