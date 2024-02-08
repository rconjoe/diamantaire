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
  PRODUCT_BRIEF_CONTENT,
} from '@diamantaire/darkside/data/api';
import { UtilService } from '@diamantaire/server/common/utils';
import { DIAMOND_PAGINATED_LABELS, ProductOption } from '@diamantaire/shared/constants';
import {
  VraiProduct,
  ListPageItemConfiguration,
  ProductType,
  VraiProductData,
  ListPageItemWithConfigurationVariants,
  getOptionValueSorterByType,
  generateProductTree,
  getProductConfigMatrix,
  ProductNode,
  sortMetalTypes,
  sortDiamondTypes,
} from '@diamantaire/shared-product';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import {
  BadGatewayException,
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
import { PipelineStage, PaginateOptions } from 'mongoose';

import { PaginateFilterDto } from '../dto/paginate-filter.dto';
import { ProductSlugInput, ProductByVariantIdInput } from '../dto/product.input';
import { ProductEntity } from '../entities/product.entity';
import {
  findCanonivalVariant,
  compareProductConfigurations,
  optionTypesComparators,
  getDraftQuery,
  includeDraftProducts,
} from '../helper/product.helper';
import { OptionsConfigurations, PLPResponse } from '../interface/product.interface';
import { PlpRepository } from '../repository/plp.repository';
import { ProductRepository } from '../repository/product.repository';

const OPTIONS_TO_SKIP = ['goldPurity'];
let PRODUCT_DATA_TTL = 30 * 60 * 1000; // 30 min ttl in ms
let PLP_DATA_TTL = 30 * 60 * 1000; // 30 min ttl in ms
let PERSISTANT_CACHE_TTL;

// If using in memory cache, set to zero for persistant cache
if (!process.env.REDIS_URL){
  PERSISTANT_CACHE_TTL = 0;
}

if (process.env.NODE_ENV !== 'production') {
  PRODUCT_DATA_TTL = 60 * 1000; // 1 min ttl in ms
  PLP_DATA_TTL = 60 * 1000; // 1 min ttl in ms
}

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);
  private limiter: Bottleneck;
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly plpRepository: PlpRepository,
    private readonly utils: UtilService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore,
  ) {
    // create an intance of Bottleneck
    this.limiter = new Bottleneck({
      maxConcurrent: 1,
      minTime: 100,
    });
  }

  async setSWRCacheData(key: string, value: unknown) {
    if (process.env.REDIS_URL){
      await this.cacheManager.set(`${key}-data`, value);
    } else {
      // If not using redis, default ttl is 5 seconds
      // To disable expiration of the cache, set the ttl configuration property to 0:
      // https://docs.nestjs.com/techniques/caching
      await this.cacheManager.set(`${key}-data`, value, 0);
    }    
  };

  async setSWRCacheRevalidate(key: string, ttl: number) {
    await this.cacheManager.set(key, '1', ttl);
  };

  async setSWRCacheRefresh(key: string) {
    await this.cacheManager.set(`${key}`, '0', 30000);
  };

  async setSWRCache(key: string, value: unknown, ttl: number) {
    this.setSWRCacheData(key, value);
    this.setSWRCacheRevalidate(key, ttl);
  };

  async getSWRCache(key: string,) {
    const isFresh = await this.cacheManager.get(key);
    const isRefreshing = isFresh === '0';
    const cachedData = await this.cacheManager.get(`${key}-data`);

    this.logger.debug(`SWR Cache Request: ${JSON.stringify({ isFresh, isRefreshing, key })}`);

    return [isFresh, cachedData];
  }

  /**
   * Fetch PLP products
   *
   * 1) Get product list from MongoDB (returns variants for metal selectors)
   * 2) Also retrieve pagination data (total docs)
   * 3) Generate list of content data to fetch from Dato
   * 4) Fetch content data from Dato
   * 5) Also fetch lowest prices for collections (cache by collection)
   * 6) Also fetch available filters (cache by PLP)
   * 7) Merge product data with content data
   * 8) Return PLP data
   *
   * @param {string} category - PLP Category
   * @param {string} slug - PLP Slug
   * @param {string} locale - Content locale
   * @param {object} filters - Filters
   * @param {string} sortBy - Sort by
   * @param {string} sortOrder - Sort order
   * @param {number} limit - Limit
   * @param {number} page - Page
   * @returns {object} Array of PLP products (cache result)
   */
  async getPlpProducts({ category, slug, locale, filters, sortBy, sortOrder = 'asc', limit = 12, page = 1 }) {
    const plpSlug = `${category}/${slug}`; // "jewelry/best-selling-gifts"
    const skip = (page - 1) * limit;
    const { metals, styles, diamondTypes, subStyles, priceMin, priceMax } = filters;
    const cacheKey = `plp-data:${plpSlug}:limit=${limit}-page=${page}:${this.generateQueryCacheKey(filters)}:${getDatoRequestLocale(locale)}`;
    const [isFresh, cachedData] = await this.getSWRCache(cacheKey);

    const fetchPlpData = async () => {
      this.setSWRCacheRefresh(cacheKey);
      
      // Supports multiselect
      const filterQuery = {
        ...(diamondTypes && { 'configuration.diamondType': { $in: diamondTypes.map(d => new RegExp(d, 'i')) }}),
        ...(metals && { 'configuration.metal': { $in: metals.map(m => new RegExp(m, 'i')) }}),
        ...(styles && { 'styles': { $in: styles }}),
        ...(subStyles && { 'subStyles': { $in: subStyles }}),
      };

      const priceQuery = {}

      if (priceMin){
        priceQuery['$gte'] = priceMin;
      }
      if (priceMax) {
        priceQuery['$lte'] = priceMax;
      }

      if (priceMin || priceMax){
        filterQuery['price'] = priceQuery;
      }

      const sortQuery: Record<string, 1 | -1> = sortBy ? { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 } : {};

        // Init pipeline stage
        const pipeline: PipelineStage[] = [
          { $match: { slug: plpSlug } }, // Get specific PLP item
          { $unwind: '$products' }, // Unwind products array so that we are working only with the products
          { $replaceRoot: { newRoot: '$products' } },
        ];

        // Add filtering
        if (Object.keys(filterQuery).length > 0) {
          pipeline.push({ $match: filterQuery });
        }

        // Add sorting
        if (sortBy) {
          pipeline.push({ $sort: sortQuery });
        }

        pipeline.push(
          { $skip: skip },
          { $limit: limit },
          {
            // join products from the products collection
            $lookup: {
              from: 'products',
              localField: 'variants',
              foreignField: 'productSlug',
              as: 'variants',
            },
          },
          {
            // reduce data returned
            $project: {
              primaryProductSlug: 1,
              variants: '$variants',
            },
          },
        );

        const productPromises = [
          this.plpRepository.aggregate(pipeline),
          this.plpRepository.aggregate([
            { $match: { slug: plpSlug } },
            { $unwind: '$products' },
            { $replaceRoot: { newRoot: '$products' } },
            { $match: filterQuery },
            { $count: 'documentCount' },
          ]),
        ];

        const productResponse = await Promise.all(productPromises);
        
        // this.cacheManager.set(cacheKey, productResponse, PLP_DATA_TTL);
      const [products, totalDocumentsQuery] = productResponse;
      const totalDocuments = totalDocumentsQuery?.[0]?.documentCount || 0;

      // generate query for product content by product type
      const variantIdProductTypes = ['Necklace', 'Earrings', 'Bracelet', 'Ring', 'Accessory']; //
      const productHandleProductTypes = ['Engagement Ring', 'Wedding Band'];
      const contentIdsByProductType = products.reduce(
        (acc, plpItem) => {
          
          const idList = plpItem.variants.map((v) => v.contentId);
          const productType = plpItem?.variants?.[0]?.productType;

          if (!productType || !plpItem.variants.length){
            Sentry.captureMessage(`No variants found for PLP item ${plpItem.primaryProductSlug}`);
            this.logger.warn(`No variants found for PLP item ${plpItem.primaryProductSlug}`);

            return acc;
          }

          if (variantIdProductTypes.includes(productType)) {
            acc.variantIds.push(...idList);
          } else if (productHandleProductTypes.includes(productType)) {
            acc.productHandles.push(...idList);
          } else {
            this.logger.verbose('Unknown product type.  Cannot add to ID list', plpItem);
          }

          return acc;
        },
        { variantIds: [], productHandles: [] },
      );

      const dataPromises = [
        this.datoConfigurationsAndProducts({ slug: plpSlug, ...contentIdsByProductType, locale }),
        this.getLowestPricesByCollection(),
        this.getPlpFilterData(plpSlug),
      ];

      let productContent, collectionLowestPrices, availableFilters;

      try {
        [productContent, collectionLowestPrices, availableFilters] = await Promise.all(dataPromises);
      } catch (e){
        this.logger.error(`Error fetching PLP data: ${e['message']}`);
        
        Sentry.captureException(e);

        return null;
      }
      

      const paginator = {
        totalDocs: totalDocuments,
        limit,
        page,
        totalPages: Math.ceil(totalDocuments / limit),
        pagingCounter: 1,
        hasPrevPage: page > 1,
        hasNextPage: page < Math.ceil(totalDocuments / limit),
        prevPage: page - 1 < 1 ? null : page - 1,
        nextPage: page + 1 > Math.ceil(totalDocuments / limit) ? null : page + 1,
      };

      // Create content map to merge with product data
      const productContentMap =
        productContent?.reduce((acc, content) => {
          const contentId = content.variantId || content.shopifyProductHandle;

          acc[contentId] = content;

          return acc;
        }, {}) || {};

      const generatePlpItem = (product, variantContent) => {
        if (!product) {
          this.logger.warn("Missing product data.  Skipping", product, variantContent);

          return null;
        }

        if (!variantContent) {
          this.logger.warn("Missing product content.  Skipping.", product, variantContent);

          return null;
        }

        const collectionContent = variantContent?.collection || variantContent?.jewelryProduct;

        if (!collectionContent) {
          this.logger.warn(`No collection content found for variant ${product.productType} : ${product.contentId}`);
        }

        return {
          productType: product.productType,
          productSlug: product.productSlug,
          collectionSlug: product.collectionSlug,
          configuration: product.configuration,
          productTitle: collectionContent?.productTitle,
          plpTitle: variantContent.plpTitle,
          primaryImage: variantContent['plpImage']?.responsiveImage,
          hoverImage: variantContent['plpImageHover']?.responsiveImage,
          price: product.price,
        };
      };

      // Merge product data with content
      const plpProducts = products.map(plpItem => {
        const product = plpItem.variants.find(p => p.productSlug === plpItem.primaryProductSlug);

        if (!product){
          this.logger.warn(`No primary product found for PLP item ${plpItem.primaryProductSlug}, found: ${plpItem.variants.map(v=>v.contentId).join(', ')}`);
          Sentry.captureMessage(`No primary product found for PLP item ${plpItem.primaryProductSlug}, found: ${plpItem.variants.map(v=>v.contentId).join(', ')}`);
          
          return undefined;
        }
        const metalOptions = plpItem.variants.map(v => ({ value: v.configuration.metal, id: v.contentId }));

        const mainProductContent = productContentMap[product.contentId];
        const collectionContent = mainProductContent?.collection || mainProductContent?.jewelryProduct;
        const productLabel = collectionContent?.productLabel;
        const hasOnlyOnePrice = collectionContent?.hasOnlyOnePrice;
        const useLowestPrice = !collectionContent?.shouldUseDefaultPrice;

        return {
          defaultId: product.contentId,
          productType: product.productType,
          metal: metalOptions.sort((a, b) => sortMetalTypes(a.value, b.value)),
          ...(collectionLowestPrices && { lowestPrice: collectionLowestPrices[product?.collectionSlug] }),
          ...(productLabel && { productLabel }),
          ...(hasOnlyOnePrice && { hasOnlyOnePrice }),
          ...(useLowestPrice && { useLowestPrice }),
          variants: plpItem.variants.reduce((acc, v) => {
            const variantContent = productContentMap[v.contentId];
            const plpVariant = generatePlpItem(v, variantContent);

            // skip if data is missing
            if (!plpVariant){
              return acc;
            }

            acc[v.contentId] = plpVariant;

            return acc;
          }, {}),
        };
      })
      .filter(i => (i?.variants && Object.keys(i?.variants)?.length && Boolean(i))); // remove any items w/o variants

      const plpData = {
        lastUpdated: new Date(),
        category,
        slug,
        locale,
        products: plpProducts,
        availableFilters,
        paginator,
      };

      this.setSWRCache(cacheKey, plpData, PLP_DATA_TTL);

      return plpData
    }

    if (!isFresh) {
      // If the data is not cached, wait for it and return it.
      if (!cachedData){
        return await fetchPlpData();
      }
      // Trigger an async process to update the data in place
      fetchPlpData();
    }  

    return cachedData;
  }

  async getPlpFilterData(plpSlug: string) {
    const cacheKey = `plp-page-data:${plpSlug}`;
    const cachedData = await this.utils.memGet(cacheKey);

    if (cachedData) {
      return cachedData;
    } else {
      const plpResponse = await this.plpRepository.findOne({ slug: plpSlug });

      if (!plpResponse) {
        throw new NotFoundException(`PLP not found :: ${plpSlug}`);
      }

      const filterData = plpResponse['filters'];
      const { diamondType, metal, styles, subStyles } = filterData;

      const sortedFilters = {
        ...filterData,
        diamondType: diamondType.sort(sortDiamondTypes),
        metal: metal.sort(sortMetalTypes),
        styles: styles.sort(),
        subStyles: subStyles.sort(),
      };

      this.utils.memSet(cacheKey, sortedFilters, PRODUCT_DATA_TTL);

      return sortedFilters;
    }
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

  async findProductsByContentIds(contentIds: string[], locale = 'en_US') {
    try {
      const products = await this.productRepository.find({
        contentId: { $in: contentIds },
      });

      // get product content from Dato
      const productContentMap = await this.findProductContent(products, locale);

      // Get lowest prices for unique set of collections
      const collectionSet = products.reduce((acc, product) => {
        acc.add(product.collectionSlug);

        return acc;
      }, new Set());

      const lowestPricesByCollection = await this.getLowestPricesByCollection();
      const reducedLowerPrices = Object.entries(lowestPricesByCollection).reduce((map, [collectionSlug, price]) => {
        if (collectionSet.has(collectionSlug)) {
          map[collectionSlug] = price;
        }

        return map;
      }, {});

      return {
        products: Object.values(productContentMap),
        lowestPricesByCollection: reducedLowerPrices,
      };
    } catch (error: any) {
      this.logger.debug('Error fetching products by contentId');
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'http.serverError.internalServerError',
        error: error.message,
      });
    }
  }

  async getListProductsByIds(contentIds: string[], locale: string) {
    let products;

    try {
      products = await this.productRepository.find({ contentId: { $in: contentIds } });
    } catch (err) {
      Sentry.captureException('Failed to get products by content Id');

      return {
        products: [],
      };
    }

    // generate query for product content by product type
    const variantIdProductTypes = ['Necklace', 'Earrings', 'Bracelet', 'Ring', 'Accessory']; //
    const productHandleProductTypes = ['Engagement Ring', 'Wedding Band'];
    const contentIdsByProductType = products.reduce(
      (acc, product) => {
        const productType = product.productType;

        if (variantIdProductTypes.includes(productType)) {
          acc.variantIds.push(product.contentId);
        } else if (productHandleProductTypes.includes(productType)) {
          acc.productHandles.push(product.contentId);
        } else {
          this.logger.verbose('Unknown product type.  Cannot add to ID list', product);
        }

        return acc;
      },
      { variantIds: [], productHandles: [] },
    );

    const dataPromises = [
      this.datoConfigurationsAndProducts({ ...contentIdsByProductType, locale }),
      this.getLowestPricesByCollection(),
    ];
    const [productContent, collectionLowestPrices] = await Promise.all(dataPromises);

    // Create content map to merge with product data
    const productContentMap =
      productContent?.reduce((acc, content) => {
        const contentId = content.variantId || content.shopifyProductHandle;

        acc[contentId] = content;

        return acc;
      }, {}) || {};

    const generatePlpItem = (product, variantContent) => {
      if (!product) {
        this.logger.warn('Missing product data.  Skipping', product, variantContent);

        return null;
      }

      if (!variantContent) {
        this.logger.warn('Missing product content.  Skipping.', product, variantContent);

        return null;
      }

      const collectionContent = variantContent?.collection || variantContent?.jewelryProduct;

      if (!collectionContent) {
        this.logger.warn(`No collection content found for variant ${product.productType} : ${product.contentId}`);
      }

      return {
        productType: product.productType,
        productSlug: product.productSlug,
        collectionSlug: product.collectionSlug,
        configuration: product.configuration,
        productTitle: collectionContent?.productTitle,
        plpTitle: variantContent.plpTitle,
        primaryImage: variantContent['plpImage']?.responsiveImage,
        hoverImage: variantContent['plpImageHover']?.responsiveImage,
        price: product.price,
      };
    };

    // Merge product data with content
    const plpProducts = products
      .map((product) => {
        const mainProductContent = productContentMap[product.contentId];
        const collectionContent = mainProductContent?.collection || mainProductContent?.jewelryProduct;
        const productLabel = collectionContent?.productLabel;
        const hasOnlyOnePrice = collectionContent?.hasOnlyOnePrice;
        const useLowestPrice = !collectionContent?.shouldUseDefaultPrice;

        return {
          defaultId: product.contentId,
          productType: product.productType,
          ...(collectionLowestPrices && { lowestPrice: collectionLowestPrices[product?.collectionSlug] }),
          ...(productLabel && { productLabel }),
          ...(hasOnlyOnePrice && { hasOnlyOnePrice }),
          ...(useLowestPrice && { useLowestPrice }),
          variants: {
            [product.contentId]: generatePlpItem(product, productContentMap[product.contentId]),
          },
        };
      })
      .filter(Boolean); // remove any items w/o variants

    return {
      products: plpProducts,
    };
  }

  async findProductsByProductSlugs(productSlugs: string[]): Promise<VraiProduct[]> {
    try {
      const products = await this.productRepository.find({
        productSlug: { $in: productSlugs },
      });

      return products;
    } catch (error: any) {
      this.logger.debug('Error fetching products by product slugs');
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'http.serverError.internalServerError',
        error: error.message,
      });
    }
  }

  async findProductContent(products: VraiProduct[], locale: string) {
    const productTypeMap = products.reduce((map: Record<string, VraiProduct[]>, product) => {
      if (!map[product.productType]) {
        map[product.productType] = [product];
      } else {
        map[product.productType].push(product);
      }

      return map;
    }, {});

    const nonJewelryProducts = [
      ...(productTypeMap[ProductType.EngagementRing] || []),
      ...(productTypeMap[ProductType.WeddingBand] || []),
    ];
    const jewelryProducts = [
      ...(productTypeMap[ProductType.Ring] || []),
      ...(productTypeMap[ProductType.Bracelet] || []),
      ...(productTypeMap[ProductType.Necklace] || []),
      ...(productTypeMap[ProductType.Earrings] || []),
    ];

    const { allConfigurations, allOmegaProducts } = await this.getDatoContent<
      { allConfigurations: any[]; allOmegaProducts: any[] },
      { productHandles: string[]; variantIds: string[]; locale: string }
    >({
      query: PRODUCT_BRIEF_CONTENT,
      variables: {
        productHandles: nonJewelryProducts.map((p) => p.contentId),
        variantIds: jewelryProducts.map((p) => p.contentId),
        locale: getDatoRequestLocale(locale),
      },
    });

    const productContent = [...allConfigurations, ...allOmegaProducts];

    const productContentMap = products.reduce((map: Record<string, VraiProductData>, product) => {
      const content = productContent.find(
        (pc) => pc['variantId'] === product.contentId || pc['shopifyProductHandle'] === product.contentId,
      );

      if (content) {
        content['productTitle'] = content?.jewelryProduct?.productTitle || content?.collection?.productTitle;
        delete content.jewelryProduct;
        delete content.collection;
      }

      map[product.productSlug] = {
        product,
        content,
      };

      return map;
    }, {});

    return productContentMap;
  }

  /**
   * Return available diamond types for the provided collection
   * @param {object} input input for getting collection data
   * @returns {object} available diamond types
   */
  async getCollectionDiamondTypes({ collectionSlug }) {
    this.logger.verbose(`getCollectionDiamondTypes :: input : ${collectionSlug}`);
    try {
      const availableDiamondTypes: string[] = await this.productRepository.distinct('configuration.diamondType', {
        collectionSlug,
      });

      return {
        availableDiamondTypes,
      };
    } catch (error: any) {
      this.logger.error(`getCollectionDiamondTypes :: error : ${error.message}`);
      throw new NotFoundException(`Collection not found :: error stack : ${error.message}`);
    }
  }

  /**
   * Return a Vrai product based on it's Shopify variant id
   * @param {object} input input object
   * @param {string} input.variantId numerical portion of a shopify product identifier
   * @return {object} Vrai product
   */
  async findProductByVariantId({ variantId }: ProductByVariantIdInput) {
    this.logger.verbose(`findProductByVariantId :: input : ${variantId}`);
    try {
      const shopifyVariantGid = `gid://shopify/ProductVariant/${variantId}`;
      const query = {
        'variants.shopifyVariantId': shopifyVariantGid,
        ...getDraftQuery(),
      };
      const product = await this.productRepository.findOne<VraiProduct>(query);

      return {
        product,
      };
    } catch (error: any) {
      this.logger.error(`findProductByVariantId :: error : ${error.message}`);
      throw new NotFoundException(`Product not found :: error stack : ${error.message}`);
    }
  }

  async findProductBySlug(input: ProductSlugInput) {
    const setLocal = input?.locale ? input?.locale : 'en_US'; // get locale from input or default to en_US
    // create unique cacheKey for each product variant
    const cachedKey = `pdp:${input?.slug}:${input?.id}:${getDatoRequestLocale(setLocal)}`;
    const [isFresh, cachedData] = await this.getSWRCache(cachedKey);

    const fetchPdpData = async () => {
      this.logger.verbose(`findProductVariant :: input : ${JSON.stringify(input)}`);

      try {
        const findProductBySlugStart: number = performance.now();

        const bigQuery = {
          ...getDraftQuery(),
        };
        const query = {
          collectionSlug: input.slug,
          ...getDraftQuery(),
        };

        const bigRedisKey: string = `products::` + setLocal + (includeDraftProducts() ? `:draft` : ``);
        const redisKey: string = `products:` + query.collectionSlug + `:` + setLocal + (includeDraftProducts() ? `:draft` : ``);
        
        // check for cached data
        const cachedData = await this.cacheManager.get(cachedKey);

        if (cachedData) {
          this.logger.verbose(`findProductVariant :: cache hit on key ${cachedKey}`);

          return cachedData; // return the entire cached data including dato content
        }

        let collection: VraiProduct[];

        const productsCollectionCacheValue = await this.cacheManager.get(redisKey);

        const preProductsReq: number = performance.now();

        if (productsCollectionCacheValue) {
          this.logger.verbose(`findProductBySlug :: Collection data :: From Cache 1`);
          collection = productsCollectionCacheValue as VraiProduct[];
        } else {
          this.logger.verbose(`findProductBySlug :: all product data :: From DB 1`);
          const bigProductsCollectionCacheValue = await this.cacheManager.get(bigRedisKey);

          if (bigProductsCollectionCacheValue) {
            this.logger.verbose(`findProductBySlug :: From Cache 2`);
            collection = (bigProductsCollectionCacheValue as VraiProduct[]).filter((item) => {
              return (item.collectionSlug === input.slug);
            });
            this.cacheManager.set(redisKey, collection);
          } else {
            this.logger.verbose(`findProductBySlug :: From DB 2`);
            collection = await this.productRepository.find(bigQuery);
            this.cacheManager.set(bigRedisKey, collection, PERSISTANT_CACHE_TTL);
            collection = collection.filter((item) => {
              return (item.collectionSlug === input.slug);
            });
            this.cacheManager.set(redisKey, collection, PERSISTANT_CACHE_TTL);
          }
        }

        const postProductsReq: number = performance.now();

        this.logger.verbose(`findProductBySlug :: Products request :: ${postProductsReq - preProductsReq}ms (total: ${postProductsReq - findProductBySlugStart}ms)`);

        // Get variant data based on requested ID
        const requestedProduct = collection.find((product) => product.productSlug === input.id);

        if (!requestedProduct) {
          return null;
        }

        const requestedContentId = requestedProduct.contentId;

        let collectionContent, productContent;

        if ([ProductType.EngagementRing as string].includes(requestedProduct.productType)) {
          // dato ER query
          const queryVars = {
            collectionSlug: input.slug,
            productHandle: requestedContentId,
            locale: setLocal,
          };

          // TODO: Add Dato types
          const datoEngagementRingPDP: object = await this.datoContentForEngagementRings(queryVars); // return dato engagement ring pdp content

          collectionContent = datoEngagementRingPDP?.['engagementRingProduct'];
          productContent = datoEngagementRingPDP?.['variantContent'];
        } else if ([ProductType.WeddingBand as string].includes(requestedProduct.productType)) {
          const queryVars = {
            collectionSlug: input.slug,
            productHandle: requestedContentId,
            locale: setLocal,
          };

          // TODO: Add Dato types
          const datoEngagementRingPDP: object = await this.datoContentForWeddingBands(queryVars); // return dato engagement ring pdp content

          collectionContent = datoEngagementRingPDP?.['weddingBandProduct'];
          productContent = datoEngagementRingPDP?.['variantContent'];
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
          const sortedAllAvailableOptions = Object.entries(allAvailableOptions).reduce((map, [type, values]) => {
            map[type] = values.sort(getOptionValueSorterByType(type));

            return map;
          }, {});
          const optionConfigs = this.getOptionsConfigurations(collection, requestedProduct);
          const sortedOptionConfigs = Object.entries(optionConfigs).reduce((map, [type, values]) => {
            const optionSorter = getOptionValueSorterByType(type);

            map[type] = values.sort((objA, objB) => optionSorter(objA.value, objB.value));

            return map;
          }, {});

          const canonicalVariant = findCanonivalVariant(collection, requestedProduct);
          const reducedCanonicalVariant = {
            productType: canonicalVariant.productType,
            productSlug: canonicalVariant.productSlug,
            collectionSlug: canonicalVariant.collectionSlug,
          };

          const pdpProductData = {
            productType,
            ...requestedProduct,
            allAvailableOptions: sortedAllAvailableOptions,
            optionConfigs: sortedOptionConfigs,
            collectionContent, // dato er collection content
            productContent, // dato er variant content
            canonicalVariant: reducedCanonicalVariant,
          };

          this.setSWRCache(cachedKey, pdpProductData, PRODUCT_DATA_TTL);

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

    if (!isFresh){
      // If the data is not cached, wait for it and return it.
      if (!cachedData){
        return await fetchPdpData();
      }
      // Trigger an async process to update the data in place
      fetchPdpData();
    }

    return cachedData;
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

    // All ER products have the ability to use a custom diamond which is indicated
    // by the carat weight being set to "other" or undefined (legacy).  However, it will
    // not look to match caratWeight if its nor a property.
    if (productToMatch.productType === ProductType.EngagementRing) {
      if (!productOptionsToMatch['caratWeight']){
        productOptionsToMatch['caratWeight'] = 'other';
      }
    }

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

    // options which are always included
    const OPTION_TYPES_ALWAYS_INCLUDED = [
      ProductOption.Metal,
      ProductOption.DiamondType,
      ProductOption.BandStyle,
      ProductOption.SideStoneShape,
      ProductOption.BandStoneShape,
      ProductOption.HoopAccent,
    ];

    // options which are always included as long as the "parent" option matches (make sure its also in OPTION_TYPES_ALWAYS_INCLUDED)
    const MATCHING_PARENT_OPTION_MAP = {
      [ProductOption.SideStoneShape]: [ProductOption.DiamondType],
      [ProductOption.Metal]: [ProductOption.DiamondType, ProductOption.DiamondOrientation],
      [ProductOption.HoopAccent]: [ProductOption.Metal],
    };

    OPTION_TYPES_ALWAYS_INCLUDED.forEach((optionType) => {
      if (!altConfigs[optionType]) {
        return;
      }
      // Ensure all options of this type are represented
      const missingOptions = allOptions?.[optionType]
        ?.filter((value) => {
          return !altConfigs[optionType][value];
        })
        .filter(Boolean);

      const optionMatchers = { ...productOptionsToMatch };
      const optionTypeTypeVariants = products.sort((a, b) => {
        for (const optionTypeKey of Object.keys(optionMatchers)) {
          const variantOptionsValue = productOptionsToMatch[optionTypeKey];

          if (optionTypeKey !== optionType) {
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

      missingOptions.forEach((optionValue) => {
        const result = optionTypeTypeVariants.find((v) => {
          const reqMatchingOptions = MATCHING_PARENT_OPTION_MAP[optionType];

          if (reqMatchingOptions) {
            return (
              v.configuration?.[optionType] === optionValue &&
              reqMatchingOptions.every((reqOptionType) => {
                if (!optionMatchers[reqOptionType] || !v.configuration?.[reqOptionType]) {
                  return true;
                }

                return v.configuration?.[reqOptionType] === optionMatchers[reqOptionType];
              })
            );
          }

          return v.configuration?.[optionType] === optionValue;
        });

        if (result) {
          addToConfigObj(optionType, result);
        }
      });
    });

    // Match for ringSize from parent product
    const ringSizeConfigs = productToMatch?.variants
      ?.filter((variant) => {
        /* eslint-disable */
        const { ringSize, side, ...optionsToMatch } = productOptionsToMatch;

        /* eslint-enable */
        return Object.keys(optionsToMatch).every(
          (optionKey) => !variant.configuration[optionKey] || optionsToMatch[optionKey] === variant.configuration[optionKey],
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

  async getLowestPricesByCollection() {
    const cacheKey = 'lowest-prices-by-collection';
    let lowestPrices = await this.utils.memGet(cacheKey);

    if (lowestPrices) {
      return lowestPrices;
    }

    const pipeline: PipelineStage[] = [
      // non ER which take custom diamonds should not be included in min price
      { $match: { $or: [{ productType: ProductType.EngagementRing }, { requiresCustomDiamond: { $exists: false } }] } },
      {
        $group: {
          _id: '$collectionSlug',
          minPrice: {
            $min: {
              // If sold only as pair, double the price for min cost calc
              $cond: [{ $and: { $eq: ['$isSoldAsPairOnly', true] } }, { $multiply: ['$price', 2] }, '$price'],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          collectionSlug: '$_id',
          minPrice: '$minPrice',
        },
      },
    ];

    try {
      const lowestPricesArr = await this.productRepository.aggregate(pipeline);

      lowestPrices = lowestPricesArr.reduce((map, { collectionSlug, minPrice }) => {
        map[collectionSlug] = minPrice;

        return map;
      }, {});
      await this.utils.memSet(cacheKey, lowestPrices, PRODUCT_DATA_TTL);
    } catch (error: any) {
      this.logger.error(`Error while aggregating lowest prices by collection: ${error}`);
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'http.serverError.internalServerError',
        error: error.message,
      });
    }

    return lowestPrices;
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
    locale: string,
    {
      metals,
      diamondTypes,
      page = 1,
      limit = 12,
    }: { metals: string[]; diamondTypes: string[]; page?: number; limit: number },
  ) {
    const diamondTypesRegex = diamondTypes?.map((diamondType) => new RegExp(diamondType, 'i'));

    const diamondTypesQueryValues = diamondTypes?.length ? diamondTypesRegex : [new RegExp('round-brilliant', 'i')];
    const metalsQueryValues = metals?.length ? metals : ['yellow-gold'];

    try {
      const productsResponse = await this.productRepository.aggregatePaginate<VraiProduct>(
        [
          // Takes an array of collectionSlug
          // Finds al records from those collection which satisfy the metal and diamondType filters
          {
            $match: {
              collectionSlug: { $in: collectionSlugsInOrder },
              'configuration.diamondType': { $in: diamondTypesQueryValues }, // always has a filter applied
              'configuration.metal': { $in: metalsQueryValues }, // always has a filter applied
              ...getDraftQuery(),
            },
          },
          // Add fields to allow sorting by collectionSlug array
          { $addFields: { __collectionOrder: { $indexOfArray: [collectionSlugsInOrder, '$collectionSlug'] } } },
          // Adds fields to allow sorting by all of the configuration properties
          {
            $addFields: {
              __bandAccentOrder: {
                $indexOfArray: [
                  ['plain', 'pave', 'double-pave', 'pave-twisted', 'double-pave-twisted'],
                  '$configuration.bandAccent',
                ],
              },
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
                  [
                    'round-brilliant',
                    'oval',
                    'emerald',
                    'pear',
                    'radiant',
                    'cushion',
                    'marquise',
                    'trillion',
                    'asscher',
                    'princess',
                    'tapered-baguette',
                    'round-brilliant+oval',
                    'round-brilliant+pear',
                    'emerald+pear',
                  ],
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
          { $addFields: { __prongStyleOrder: { $indexOfArray: [['plain', 'pave'], '$configuration.prongStyle'] } } },
          { $addFields: { __hiddenHaloOrder: { $indexOfArray: [['yes'], '$configuration.hiddenHalo'] } } },
          {
            $addFields: {
              __diamondOrientationOrder: {
                $indexOfArray: [['vertical', 'horizontal'], '$configuration.diamondOrientation'],
              },
            },
          },
          {
            $addFields: {
              __bandStoneShapeOrder: { $indexOfArray: [['round-brilliant', 'baguette'], '$configuration.bandStoneShape'] },
            },
          },
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
      const productContent = await this.datoConfigurationsAndProducts({ slug, productHandles, locale });
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

        const simplified = await this.productRepository.find({ collectionSlug: { $in: collectionSlugsInOrder } });
        const [availableMetals, availableDiamondTypes, priceValues, availableStyles, availableSubStyles] = [
          [],
          [],
          [],
          [],
          [],
        ];

        simplified.map((item) => {
          if (item.configuration.metal !== undefined) {
            if (availableMetals.indexOf(item.configuration.metal) < 0) {
              availableMetals.push(item.configuration.metal);
            }
          }
          if (item.configuration.diamondType !== undefined) {
            if (availableDiamondTypes.indexOf(item.configuration.diamondType) < 0) {
              availableDiamondTypes.push(item.configuration.diamondType);
            }
          }
          if (item.price !== undefined) {
            if (priceValues.indexOf(item.price) < 0) {
              priceValues.push(item.price);
            }
          }
          if (item.styles !== undefined) {
            if (availableStyles.indexOf(item.styles) < 0) {
              availableStyles.push(item.styles);
            }
          }
          if (item.subStyles !== undefined) {
            if (availableSubStyles.indexOf(item.subStyles) < 0) {
              availableSubStyles.push(item.subStyles);
            }
          }
        });

        const explodedDiamondTypes = [...new Set(availableDiamondTypes.flatMap((d) => d.split('+')))];
        const explodedMetalType = [...new Set(availableMetals.flatMap((m) => m.split(' and ')))];

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
    const collectionContent = content?.collection || content?.jewelryProduct;

    return {
      title: content['plpTitle'] || collectionContent?.productTitle || product.collectionTitle,
      productTitle: collectionContent?.productTitle,
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
    locale,
  }: {
    slug: string;
    variantIds?: string[];
    productHandles?: string[];
    first?: number;
    skip?: number;
    locale: string;
  }): Promise<any> {
    const ids = [...variantIds, ...productHandles].sort();

    this.logger.verbose(`Getting Dato configurations & products for ${slug}`);
    const cachedKey = `plp-configurations-${slug}:${locale}:${ids.join('-')}-${first}-${skip}`;
    const cachedData = await this.utils.memGet<any>(cachedKey); // return the cached result if there's a key

    if (!cachedData) {
      let response;

      const queryVars = {
        productHandles,
        variantIds,
        first,
        skip,
        locale: getDatoRequestLocale(locale),
      };

      try {
        response = await this.utils.createDataGateway().request(CONFIGURATIONS_LIST, queryVars);
        const result = [...response.allConfigurations, ...response.allOmegaProducts];

        this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
        this.utils.memSet(cachedKey, result, PRODUCT_DATA_TTL);

        return result;
      } catch (err) {
        this.logger.error(`Cannot retrieve configurations and products for ${slug}: ${JSON.stringify(err)}`);

        return [];
      }
    }

    return cachedData
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

  async getCollectionSlugsByType(
    type: string,
  ): Promise<{ _id: string; productType: string; collectionSlugs: string[] }[] | any> {
    const pipeline = [
      type && {
        $match: { productType: type },
      },
      {
        $group: {
          _id: '$productType',
          slugs: { $addToSet: '$collectionSlug' },
        },
      },
      {
        $project: {
          _id: 1,
          productType: '$_id',
          slugs: 1,
        },
      },
    ];

    try {
      const slugs = await this.productRepository.aggregate(pipeline.filter(Boolean));

      return slugs;
    } catch (e) {
      this.logger.error(`Error retrieving collection slugs for product type: ${type}`, e);

      return {
        pipeline,
      };
    }
  }

  async getCollectionOptions(
    collectionSlug: string,
    filterOptions?: Record<string, string>,
  ): Promise<Record<string, string[] | any>> {
    this.logger.debug(`Getting collection options for collection: ${collectionSlug}`);
    const matchQueries: Record<string, string>[] = [{ collectionSlug }, getDraftQuery()];

    const cacheKey = `collection-options-${collectionSlug}-with-options:${JSON.stringify(filterOptions)}`;
    const cachedData = await this.utils.memGet(cacheKey);

    if (cachedData) {
      this.logger.debug(`Cache hit for collection options: ${cacheKey}`);

      return cachedData;
    }

    if (filterOptions) {
      Object.entries(filterOptions).forEach(([k, v]) => {
        matchQueries.push({ [`configuration.${k}`]: v });
      });
    }

    const pipeline = [
      collectionSlug && {
        $match: { $and: matchQueries },
      },
      {
        $project: {
          arrayofkeyvalue: { $objectToArray: '$$ROOT.configuration' },
        },
      },
      {
        $unwind: '$arrayofkeyvalue',
      },
      {
        $group: {
          _id: null,
          allOptions: { $addToSet: '$arrayofkeyvalue' },
        },
      },
      {
        $unwind: '$allOptions',
      },
      {
        $group: {
          _id: '$allOptions.k',
          values: { $push: '$allOptions.v' },
        },
      },
      {
        $project: {
          _id: 1,
          type: '$_id',
          values: 1,
        },
      },
    ];

    try {
      const optionsResults = await this.productRepository.aggregate(pipeline.filter(Boolean));

      const options = optionsResults.reduce((acc, option) => {
        const { type } = option;
        const sortFn = getOptionValueSorterByType(type);

        acc[type] = option.values.sort(sortFn);

        return acc;
      }, {});

      this.utils.memSet(cacheKey, options, PRODUCT_DATA_TTL);

      return options;
    } catch (e) {
      this.logger.error(`Error retrieving collection options for collection slugs: ${collectionSlug}`, e);

      throw new InternalServerErrorException(
        `Error retrieving collection options for collection slugs: ${collectionSlug}`,
        e,
      );
    }
  }

  async findProductsFromCollectionByOptions(collectionSlug: string, configurationOptions?: Record<string, string>) {
    this.logger.debug(
      `Getting products from collection: ${collectionSlug} with options ${JSON.stringify(configurationOptions)}`,
    );
    const matchQueries: Record<string, string>[] = [{ collectionSlug: collectionSlug }, getDraftQuery()];

    Object.entries(configurationOptions || {}).forEach(([k, v]) => {
      matchQueries.push({ [`configuration.${k}`]: v });
    });

    const queries = { $and: matchQueries.filter(Boolean) };

    try {
      const slugs = await this.productRepository.find(queries);

      return slugs;
    } catch (e) {
      this.logger.error(`Error retrieving products from collection: ${collectionSlug}`, e);
    }
  }

  async findProduct(collectionSlug: string, productSlug: string) {
    this.logger.debug(`Getting product from collection: ${collectionSlug} with slug ${productSlug}`);

    try {
      const product = await this.productRepository.findOne<VraiProduct>({ collectionSlug, productSlug, ...getDraftQuery() });

      return product;
    } catch (e) {
      this.logger.error(`Error retrieving product from collection: ${collectionSlug} with slug ${productSlug}`, e);
    }
  }

  async getCollectionTreeStruct(collectionSlug: string): Promise<ProductNode> {
    this.logger.debug(`Get tree structure for collection: ${collectionSlug}`);
    const cachKey = `collection-tree-${collectionSlug}`;
    const cachedData = await this.utils.memGet<ProductNode>(cachKey);

    if (cachedData) {
      this.logger.debug(`Cache hit for collection: ${collectionSlug}`);

      return cachedData;
    }

    try {
      const collectionProducts = await this.productRepository.find({ collectionSlug, ...getDraftQuery() });
      const collectionOptions = await this.getCollectionOptions(collectionSlug);
      const collectionTree = generateProductTree(collectionProducts, collectionOptions);

      this.utils.memSet(cachKey, collectionTree, PRODUCT_DATA_TTL);

      return collectionTree;
    } catch (e) {
      this.logger.error(`Error retrieving tree structure for collection: ${collectionSlug}`, e);
      throw new InternalServerErrorException(`Error retrieving tree structure for collection: ${collectionSlug}`, e);
    }
  }

  async getProductOptionConfigs(collectionSlug: string, productSlug: string) {
    this.logger.debug(`Get option configs for collection: ${collectionSlug} : ${productSlug}`);
    const cacheKey = `collection-option-configs-${collectionSlug}-${productSlug}`;
    const cachedData = await this.utils.memGet(cacheKey);

    if (cachedData) {
      this.logger.debug(`Cache hit for collection option configs: ${cacheKey}`);

      return cachedData;
    }

    try {
      const collectionTree = await this.getCollectionTreeStruct(collectionSlug);
      const product = await this.findProduct(collectionSlug, productSlug);
      const productConfigs = getProductConfigMatrix(product as any, collectionTree);

      this.utils.memSet(cacheKey, productConfigs, PRODUCT_DATA_TTL);

      return productConfigs;
    } catch (e) {
      this.logger.error(`Error retrieving option configs for collection: ${collectionSlug}`, e);
      throw new InternalServerErrorException(`Error retrieving option configs for collection: ${collectionSlug}`, e);
    }
  }

  generateQueryCacheKey(query: Record<string, unknown>) {
    return Object.entries(query)
      .filter(([, v]) => {
        if (Array.isArray(v)) {
          return v.length > 0;
        } else {
          return typeof v !== 'undefined';
        }
      })
      .map(([k, v]) => `${k}=${v}`)
      .flat()
      .sort()
      .join('-');
  }
}

type PlpQuery = {
  slug: string;
  category: string;
  locale: string;
  page;
  limit;
  sortBy;
  sortOrder;
} & PlpFilters;

type PlpFilters = {
  metals: string[];
  diamondTypes: string[];
  priceMin: number;
  priceMax: number;
  styles: string[];
  subStyles: string[];
};

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

