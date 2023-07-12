/* eslint-disable @nx/enforce-module-boundaries */
/**
 * @file products.service.ts
 * @description Products service class
 */
import { UtilService } from '@diamantaire/server/common/utils';
import { DEFAULT_LOCALE, DIAMOND_PAGINATED_LABELS, ProductOption } from '@diamantaire/shared/constants';
import { PLP_QUERY, CONFIGURATIONS_LIST, ERPDP, JEWELRYPRODUCT } from '@diamantaire/shared/dato';
import {
  VraiProduct,
  VraiProductData,
  getConfigMatrix,
  ListPageItemConfiguration,
  ListPageItemWithConfigurationVariants,
  ProductType,
} from '@diamantaire/shared-product';
import {
  BadGatewayException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import Bottleneck from 'bottleneck';
import { PipelineStage, FilterQuery, PaginateOptions } from 'mongoose';
// import { Variables } from 'graphql-request';

import { PaginateFilterDto } from '../dto/paginate-filter.dto';
import { PlpInput, ProductSlugInput } from '../dto/product.input';
import { ProductEntity } from '../entities/product.entity';
import { findCanonivalVariant, compareProductConfigurations, optionTypesComparators } from '../helper/product.helper';
import { ProductVariantPDPData, OptionsConfigurations, PLPResponse } from '../interface/product.interface';
import { ProductRepository } from '../repository/product.repository';

const OPTIONS_TO_SKIP = ['goldPurity'];

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);
  private limiter: Bottleneck;
  constructor(private readonly productRepository: ProductRepository, private readonly utils: UtilService) {
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

  async findProducts(input: PaginateFilterDto): Promise<ProductEntity> {
    const options: PaginateOptions = {
      limit: input.limit || 30,
      page: input.page || 1,
      customLabels: DIAMOND_PAGINATED_LABELS,
    };

    const query = {};

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

  async findProductBySlug(input: ProductSlugInput): Promise<ProductVariantPDPData> {
    this.logger.verbose(`findProductVariant :: input : ${JSON.stringify(input)}`);
    try {
      const setLocal = input?.locale ? input?.locale : DEFAULT_LOCALE; // get locale from input or default to en_US
      const query = {
        collectionSlug: input.slug,
      };
      // create unique cacheKey for each prodyct variant
      const cachedKey = `productVariant-${input?.slug}-${input?.id}-${setLocal}`;
      // check for cached data
      const cachedData = await this.utils.memGet<ProductVariantPDPData>(cachedKey);

      if (cachedData) {
        this.logger.verbose(`findProductVariant :: cache hit on key ${cachedKey}`);

        return cachedData; // return the entire cached data including dato content
      }

      const collection: VraiProduct[] = await this.productRepository.find(query);

      // Get variant data based on requested ID
      const requestedProduct = collection.find((product) => product.productSlug === input.id);

      if (!requestedProduct) {
        return null;
      }

      const requestedContentId = requestedProduct.contentId;

      let collectionContent, productContent;

      if ([ProductType.EngagementRing as string, ProductType.WeddingBand as string].includes(requestedProduct.productType)) {
        // dato ER query
        const queryVars = {
          collectionSlug: input.slug,
          productHandle: requestedContentId,
          locale: setLocal,
        };

        // TODO: Add Dato types
        const datoEngagementRingPDP: object = await this.datoContentForEngagementRings(queryVars); // return dato engagement ring pdp content

        collectionContent = datoEngagementRingPDP?.['engagementRingProduct'];
        productContent = datoEngagementRingPDP?.['productContent'];
      } else {
        // dato ER query
        const queryVars = {
          slug: input.slug,
          variantId: requestedContentId,
          locale: setLocal,
        };

        // TODO: Add Dato types
        const datoJewelryPDP: object = await this.datoContentForJewelry(queryVars); // return dato engagement ring pdp content

        collectionContent = datoJewelryPDP?.['jewelryProduct'];
        productContent = datoJewelryPDP?.['configuration'];
      }

      if (collection && requestedProduct) {
        const { productType } = requestedProduct;

        const allAvailableOptions = this.getAllAvailableOptions(collection);

        const pdpProductData = {
          productType,
          ...requestedProduct,
          allAvailableOptions,
          optionConfigs: this.getOptionsConfigurations(collection, requestedProduct),
          collectionContent, // dato er collection content
          productContent, // dato er variant content
          canonicalVariant: findCanonivalVariant(collection, requestedProduct),
        };

        //await this.cacheService.set(cachedKey, pdpProductData, 3600);
        this.utils.memSet(cachedKey, pdpProductData, 3600);

        return pdpProductData;
      } else {
        // TODO: Handle Cannot find variant ID request
        this.logger.debug(`findProductVariant :: Cannot find variant ID request`);
        throw new BadGatewayException('Invalid variant ID request');
      }
    } catch (error: any) {
      this.logger.error(`findProductVariant :: error : ${error.message}`);
      throw new NotFoundException(`Product not found :: error stack : ${error.message}`);
    }
  }

  getAllAvailableOptions = (products: VraiProduct[]): Record<string, string[]> => {
    const allAvailableOptions = {};

    for (const product of products) {
      const { configuration } = product;

      for (const configKey in configuration) {
        const optionValue = configuration[configKey];

        if (allAvailableOptions[configKey]) {
          if (!allAvailableOptions[configKey].includes(optionValue)) {
            allAvailableOptions[configKey].push(optionValue);
          }
        } else {
          allAvailableOptions[configKey] = [optionValue];
        }
      }
    }

    return allAvailableOptions;
  };

  /**
   *
   * @param { Array } products - shopify collection products
   * @param { Object } productToMatch
   * @param { Boolean }includeAllOptions
   * @returns
   */

  getOptionsConfigurations = (products: VraiProduct[], productToMatch: VraiProduct): OptionsConfigurations => {
    const altConfigs = {};
    const allOptions = {};
    const productOptionsToMatch = productToMatch.configuration;

    /* Helper function to sort options */
    function sortOptions(optionsArr, comparator) {
      if (optionsArr) {
        if (comparator) {
          return optionsArr.sort((a, b) => {
            return comparator(a.value) - comparator(b.value);
          });
        } else {
          return optionsArr.sort((a, b) => a - b);
        }
      }
    }

    const addToConfigObj = (optionKey: string, product: VraiProduct) => {
      const value = product.configuration[optionKey];

      if (value) {
        const variantData = {
          value: value,
          id: product.productSlug,
        };

        if (altConfigs[optionKey]) {
          altConfigs[optionKey][value] = variantData;
        } else {
          altConfigs[optionKey] = { [value]: variantData };
        }
      }
    };

    for (const product of products) {
      for (const optionKey in productOptionsToMatch) {
        // All configs
        if (allOptions[optionKey]) {
          if (!allOptions[optionKey].includes(product.configuration[optionKey])) {
            allOptions[optionKey].push(product.configuration[optionKey]);
          }
        } else {
          allOptions[optionKey] = [product.configuration[optionKey]];
        }

        const optionValue = product.configuration[optionKey];
        const optionValueToMatch = productOptionsToMatch[optionKey];

        const optionsToMatch = { ...productOptionsToMatch };

        // Delete the option we will try to match against
        delete optionsToMatch[optionKey];

        // Skip specific options of if value is not defined
        if (OPTIONS_TO_SKIP.includes(optionKey) || typeof optionValueToMatch === undefined || optionValueToMatch === null) {
          continue;
        }

        const isMatch = Object.keys(optionsToMatch).every((o) => {
          // Do not compare options
          if (OPTIONS_TO_SKIP.includes(o)) {
            return true;
          }

          // If either option value is unavailable, assume it matches
          // This is unexpected and should be fixed in Shopify
          if (!optionValue || !product.configuration[o]) {
            return true;
          }

          return product.configuration[o] === optionsToMatch[o];
        });

        if (isMatch) {
          addToConfigObj(optionKey, product);
        }
      }
    }

    // Ensure all diamondTypes have a variant
    // figure out which diamond types still need products
    const missingDiamondTypes =
      allOptions?.[ProductOption.DiamondType]?.filter((diamondType) => {
        return !altConfigs[ProductOption.DiamondType][diamondType];
      }) || [];

    const diamondTypeMatchers = { ...productOptionsToMatch };
    const diamondTypeVariants = products.sort((a, b) => {
      for (const optionTypeKey of Object.keys(diamondTypeMatchers)) {
        const variantOptionsValue = productOptionsToMatch[optionTypeKey];

        if (optionTypeKey !== ProductOption.DiamondType) {
          if (a.configuration[optionTypeKey] !== b.configuration[optionTypeKey]) {
            if (a.configuration[optionTypeKey] === variantOptionsValue) {
              return -1;
            } else if (b.configuration[optionTypeKey] === variantOptionsValue) {
              return 1;
            } else {
              return compareProductConfigurations(a, b, optionTypeKey);
            }
          }
        }
      }

      return 0;
    });

    missingDiamondTypes.forEach((diamondType) => {
      const result = diamondTypeVariants.find((v) => v.configuration?.[ProductOption.DiamondType] === diamondType);

      if (result) {
        addToConfigObj(ProductOption.DiamondType, result);
      }
    });

    // Match for ringSize from parent product
    const ringSizeConfigs = productToMatch.variants
      .filter((variant) => {
        /* eslint-disable */
        const { ringSize, side, ...optionsToMatch } = productOptionsToMatch;

        /* eslint-enable */
        return Object.keys(optionsToMatch).every(
          (optionKey) => optionsToMatch[optionKey] === variant.configuration[optionKey],
        );
      })
      .map((variant) => ({ value: variant.configuration[ProductOption.RingSize], id: variant.shopifyVariantId }));

    // Convert altconfigs from map of maps to map of arrays & sort
    for (const optionType in altConfigs) {
      altConfigs[optionType] = sortOptions(Object.values(altConfigs[optionType]), optionTypesComparators[optionType]);
    }

    // Add size products
    altConfigs[ProductOption.RingSize] = sortOptions(ringSizeConfigs, optionTypesComparators[ProductOption.RingSize]);

    return altConfigs;
  };

  /**
   * The Dato API is not rate limited. They just charge us for every call on request
   * that does not hit their CDN. https://www.datocms.com/docs/content-delivery-api/rate-limiting
   * We also cache the response in memory for fewer round trips.
   * @param { String } collectionSlug - production collection slug
   * @param { String } productHandle - product handle
   * @param { String } locale - country locale
   * @returns { Promise<object> }
   */

  async datoContentForEngagementRings({ collectionSlug, productHandle, locale }): Promise<object> {
    this.logger.verbose(`Entering into dataContent ${collectionSlug}-${productHandle}-${locale}`);
    const cachedKey = `${collectionSlug}-${productHandle}-${locale}`;
    let response = await this.utils.memGet<object>(cachedKey); // return the cached result if there's a key

    const queryVars = {
      collectionSlug,
      productHandle,
      locale,
    };

    try {
      if (!response) {
        response = await this.utils.createDataGateway().request(ERPDP, queryVars); // dato engagement ring pdp query
        this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        this.utils.memSet(cachedKey, response, 3600); //set the response in memory
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
      locale,
    };

    try {
      if (!response) {
        response = await this.utils.createDataGateway().request(JEWELRYPRODUCT, queryVars); // dato engagement ring pdp query
        this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        this.utils.memSet(cachedKey, response, 3600); //set the response in memory
      }

      return response;
    } catch (error: any) {
      this.logger.error(`datoContentForJewelry :: error : ${error.message}`);
      throw error;
    }
  }

  /**
   * This function accepts an input for retrieving PLP data.
   * It will return a list of products with combined content and product data.
   * @param {object} input - PLP input
   * @param {string} input.slug - PLP slug
   * @param {string} input.locale - locale for content
   * @param {string} input.metal - metal filter
   * @param {string} input.diamondType - diamond type filter
   * @param {number} input.priceMin - price range filter min
   * @param {number} input.priceMax - price range filter max
   * @returns Array of plp products and page content
   */

  async findPlpData({
    slug,
    locale = 'en_US',
    metal,
    diamondType,
    priceMin = 0,
    priceMax = 9999999,
    page,
    limit,
  }: PlpInput) {
    const cachedKey = `plp-${slug}-${locale}-${JSON.stringify({ metal, diamondType, priceMin, priceMax, page, limit })}`;
    // check for cached data
    const cachedData = await this.utils.memGet(cachedKey);

    if (cachedData) {
      this.logger.verbose(`PLP :: cache hit on key ${cachedKey}`);

      return cachedData; // return the entire cached data including dato content
    }

    try {
      // Get Dato PLP data
      const plpContent = await this.datoPLPContent({ slug, locale });

      const { configurationsInOrder, productsInOrder /*, ...listPageContent*/ } = plpContent.listPage;

      const productList = productsInOrder.length ? productsInOrder : configurationsInOrder;

      const contentIdsInOrder: string[] = [];
      let plpProductsContentData;

      if (configurationsInOrder || productsInOrder) {
        plpProductsContentData = productList.reduce((data, item) => {
          let contentId: string;

          if (item._modelApiKey === 'configuration') {
            contentId = item.variantId;
          } else if (item._modelApiKey === 'omega_product') {
            contentId = item.shopifyProductHandle;
          }

          contentIdsInOrder.push(contentId);

          data[contentId] = {
            content: item,
          };

          return data;
        }, {});
      }

      const getFiltersQuery = ({
        m,
        dT,
        pMin,
        pMax,
      }): FilterQuery<{ 'configuration.metal'?: string; 'configuration.diamondType'?: string; price?: string }>[] => {
        const query = [];

        if (m) {
          query.push({ 'configuration.metal': m });
        }
        if (dT) {
          query.push({ 'configuration.diamondType': dT });
        }

        if (typeof pMin !== 'undefined' && pMax) {
          query.push({ price: { $gte: priceMin } });
          query.push({ price: { $lte: priceMax } });
        }

        return query;
      };

      const filterQueries = getFiltersQuery({ m: metal, dT: diamondType, pMin: priceMin, pMax: priceMax });

      const pageNumer = page > 0 ? page : 1;
      const PAGE_SIZE = limit || 5; // Number of documents per page
      // Pagination parameters
      const skip = (pageNumer - 1) * PAGE_SIZE;
      const totalProducts = contentIdsInOrder.length;
      const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

      // Build Query
      const pipeline: PipelineStage[] = [
        { $match: { $and: [{ contentId: { $in: contentIdsInOrder } }, ...filterQueries] } },
        { $addFields: { __order: { $indexOfArray: [contentIdsInOrder, '$contentId'] } } },
        { $sort: { __order: 1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ];

      const products: VraiProduct[] = await this.productRepository.aggregate(pipeline, {});

      const availableFiltersCacheKey = `plp-${slug}-filter-types`;
      // check for cached data
      let availableFilters = await this.utils.memGet(availableFiltersCacheKey);

      if (!availableFilters) {
        this.logger.verbose(`PLP :: Filters :: cache miss on key ${availableFiltersCacheKey}`);

        const filterValueQueries: [Promise<string[]>, Promise<string[]>, Promise<number[]>] = [
          this.productRepository.distinct('configuration.metal', {
            contentId: { $in: contentIdsInOrder },
          }),
          this.productRepository.distinct('configuration.diamondType', {
            contentId: { $in: contentIdsInOrder },
          }),
          this.productRepository.distinct('price', {
            contentId: { $in: contentIdsInOrder },
          }),
        ];

        const [availableMetals, availableDiamondTypes, priceValues] = await Promise.all(filterValueQueries);

        availableFilters = {
          metal: availableMetals,
          diamondType: availableDiamondTypes,
          price: [Math.min(...priceValues), Math.max(...priceValues)],
        };

        this.utils.memSet(availableFiltersCacheKey, availableFilters, 3600);
      }

      // Add product data to PLP data
      const collectionSlugsSet = new Set<string>();

      const scopedPlpData = products.reduce((map: Record<string, { content: object; product: VraiProduct }>, product) => {
        map[product.contentId] = {
          content: plpProductsContentData[product.contentId].content,
          product: product,
        };

        collectionSlugsSet.add(product.collectionSlug);

        return map;
      }, {});

      const collectionSlugs = [...collectionSlugsSet];

      const collectionQueries = collectionSlugs.map((collectionSlug) => ({ collectionSlug }));

      const collections = await Promise.all<VraiProduct[]>(
        collectionQueries.map((query) => this.productRepository.find(query)),
      );

      // TODO: is it faster to get all with a single query and then group

      const collectionsMap = collections.reduce((map: Record<string, VraiProduct[]>, collection) => {
        map[collection[0].collectionSlug] = collection;

        return map;
      }, {});

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

      // TODO: may need paginated request but most likely not since we limit to 20 items per page
      // request all contentIds from Mongo and DB
      const variantPromises: [Promise<object[]>, Promise<VraiProduct[]>] = [
        this.datoConfigurationsAndProducts({ slug, variantIds: variantContentIds, productHandles: productHandles }),
        this.productRepository.find({ contentId: { $in: variantContentIds } }),
      ];
      const [variantContentData, variantProducts] = await Promise.all(variantPromises);

      const variantsMap = variantContentIds.reduce(
        (map: Record<string, { content?: object; product?: VraiProduct }>, contentId) => {
          map[contentId] = {
            content: variantContentData.find((item) => item['variantId'] === contentId),
            product: variantProducts.find((item) => item['contentId'] === contentId),
          };

          return map;
        },
        {},
      );

      // merge and reduce
      const plpProducts = Object.values(scopedPlpData).reduce(
        (plpItems: ListPageItemWithConfigurationVariants[], item: VraiProductData) => {
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

          plpItems.push({
            defaultId: product.contentId,
            metal: Object.keys(metalOptions).map((metalType) => ({ value: metalType, id: metalOptions[metalType] })),
            variants: {
              [product.contentId]: this.createPlpProduct(product, content),
              ...altConfigs,
            },
          });

          return plpItems;
        },
        [],
      );

      const paginator = {
        currentPage: pageNumer, // page
        perPage: PAGE_SIZE, // limit
        pageCount: totalPages, // total pages
        itemCount: totalProducts, // total count
        //itemCount: totalCount,
      };

      const plpReturnData = {
        // ...listPageContent,
        products: plpProducts,
        paginator,
        availableFilters,
      };

      this.utils.memSet(cachedKey, plpReturnData, 3600);

      return plpReturnData;
    } catch (error: any) {
      this.logger.error(`findPlpData :: error : ${error.message}`);
      throw error;
    }
  }

  createPlpProduct(product: VraiProduct, content: Record<string, any>): ListPageItemConfiguration {
    return {
      title: content['plpTitle'] || product.collectionTitle,
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
   * Gets Dato listPage content
   * @param {object} input - PLP input
   * @param {string} input.slug - PLP slug
   * @param {string} input.locale - locale for content
   * @returns {object}- Dato listPage content
   */
  async datoPLPContent({ slug, locale }: { slug: string; locale: string }): Promise<PLPResponse> {
    this.logger.verbose(`Entering into dataContent ${slug}-${locale}`);
    const cachedKey = `${slug}-${locale}`;
    let response = await this.utils.memGet<PLPResponse>(cachedKey); // return the cached result if there's a key

    const queryVars = {
      slug,
      locale,
    };

    try {
      if (!response) {
        response = await this.utils.createDataGateway().request(PLP_QUERY, queryVars); // dato engagement ring pdp query
        this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        this.utils.memSet(cachedKey, response, 3600); //set the response in memory
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
      locale,
    };

    try {
      if (!response) {
        // response = await this.limiter.schedule(async () => {
        //   this.utils.createDataGateway().request(QUERIES.erPDP, queryVars);
        // });
        response = await this.utils.createDataGateway().request(PLP_QUERY, queryVars); // dato engagement ring pdp query
        this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        this.utils.memSet(cachedKey, response, 3600); //set the response in memory
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
      locale,
    };

    try {
      if (!response) {
        response = await this.utils.createDataGateway().request(PLP_QUERY, queryVars); // dato engagement ring pdp query
        this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        this.utils.memSet(cachedKey, response, 3600); //set the response in memory
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
    variantIds: string[];
    productHandles: string[];
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
        this.utils.memSet(cachedKey, response, 3600); //set the response in memory
      }

      return [...response.allConfigurations, response.allOmegaProducts];
    } catch (err) {
      this.logger.debug(`Cannot retrieve configurations and products for ${slug}`);
      throw new NotFoundException(`Cannot retrieve configurations and products for ${slug}`, err);
    }
  }
}
