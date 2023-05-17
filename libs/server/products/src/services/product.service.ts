/* eslint-disable @nx/enforce-module-boundaries */
/**
 * @file products.service.ts
 * @description Products service class
 */
import { UtilService } from '@diamantaire/server/common/utils';
import { PriceRepository } from '@diamantaire/server/price';
import { DEFAULT_LOCALE, ProductOption, DEFAULT_RING_SIZE } from '@diamantaire/shared/constants';
import { ERPDP, JEWELRYPRODUCT } from '@diamantaire/shared/dato';
import { BadGatewayException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Bottleneck from 'bottleneck';

import { GetProductInput, ProductVariantInput } from '../dto/product.input';
import { ProductEntity } from '../entities/product.entity';
import {
  reduceVariantsToPDPConfigurations,
  findCanonivalVariant,
  compareVariantOption,
  optionTypesComparators,
} from '../helper/product.helper';
import { ProductVariantPDPData, Variant, ProductCollection, OptionsConfigurations } from '../interface/product.interface';
import { ProductRepository } from '../repository/product.repository';

const OPTIONS_TO_SKIP = ['goldPurity'];

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);
  private limiter: Bottleneck;
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly priceRepository: PriceRepository,
    private readonly configService: ConfigService,
    private readonly utils: UtilService,
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

  async findProduct(input: GetProductInput): Promise<ProductEntity> {
    const query = {
      handle: input.handle,
      country: input.country,
    };

    return await this.productRepository.find(query);
  }

  async findProductVariant(input: ProductVariantInput): Promise<ProductVariantPDPData> {
    this.logger.verbose(`findProductVariant :: input : ${JSON.stringify(input)}`);
    try {
      const shopifyGidPrefix = this.configService.get('SHOPIFY_GID_PREFIX');
      const variantId = `${shopifyGidPrefix}/ProductVariant/${input.id}`;
      const setLocal = input?.locale ? input?.locale : DEFAULT_LOCALE; // get locale from input or default to en_US
      const query = {
        slug: input.slug,
      };
      // create unique cacheKey for each prodyct variant
      const cachedKey = `productVariant-${input?.slug}-${input?.id}-${setLocal}-${input?.countryCode?.trim().toUpperCase()}`;
      // check for cached data
      const cachedData = await this.utils.memGet(cachedKey);

      if (cachedData) {
        this.logger.verbose(`findProductVariant :: cache hit on key ${cachedKey}`);

        return cachedData; // return the entire cached data including dato content
      }
      const products: any = await this.productRepository.find(query);

      // Get variant data based on requested ID
      let requestedVariant;
      let requestedDatoHandle;
      let parentProduct;

      products.forEach((product) => {
        const match = product?.variants?.find((variant: Variant) => variant.id === variantId);

        if (match) {
          requestedVariant = match;
          requestedDatoHandle = match.shopifyProductHandle;
          parentProduct = product;
        }
      });

      const reducedVariants = reduceVariantsToPDPConfigurations(products);

      //const datoEngagementRingPDP = await this.utils.createDataGateway().request(QUERIES.erPDP, queryVars);

      // const priceQuery = {
      //   id: requestedVariant.id,
      //   currencyCode: getCurrencyCode(input?.countryCode?.trim().toUpperCase()),
      // };

      // find a price that matches the variant id and currency code
      //const productPrice = await this.priceRepository.findOne(priceQuery);

      // if (!productPrice) {
      //   this.logger.log(`Price not found for variant id: ${requestedVariant.id}`);
      // }
      // const price = {
      //   amount: productPrice?.amount,
      //   currencyCode: productPrice?.currencyCode,
      // };

      console.log({ requestedVariant, parentProduct });

      let collectionContent, variantContent;

      console.log({ parentProduct, variantId: requestedVariant?.id?.split('/').pop() });

      if (['Engagement Ring', 'Wedding Band'].includes(parentProduct.productType)) {
        // dato ER query
        const queryVars = {
          collectionSlug: input.slug,
          productHandle: requestedDatoHandle,
          locale: setLocal,
        };
        const datoEngagementRingPDP: any = await this.datoContentForEngagementRings(queryVars); // return dato engagement ring pdp content

        collectionContent = datoEngagementRingPDP?.allEngagementRingProducts;
        variantContent = datoEngagementRingPDP?.variantContent;
        //const { allEngagementRingProducts: collectionContent, allOmegaProducts: variantContent } = datoEngagementRingPDP;
      } else {
        // dato ER query
        const queryVars = {
          slug: input.slug,
          variantId: requestedVariant?.id?.split('/').pop(),
          locale: setLocal,
        };

        console.log(queryVars);

        const datoJewelryPDP: any = await this.datoContentForJewelry(queryVars); // return dato engagement ring pdp content

        collectionContent = datoJewelryPDP?.jewelryProduct;
        variantContent = datoJewelryPDP?.configuration;
      }

      //requestedVariant.price = price; // include price in the requested variant

      if (products && requestedVariant) {
        const {
          productType,
          dangerousInternalProductId: productId,
          dangerousInternalCollectionId: parentProductId,
        } = parentProduct;

        const variantReturnData = {
          productId,
          productType,
          parentProductId,
          ...requestedVariant,
          optionConfigs: this.getOptionsConfigurations(reducedVariants, requestedVariant, parentProduct, true),
          collectionContent, // dato er collection content
          variantContent, // dato er variant content
          canonicalVariant: findCanonivalVariant(reducedVariants, requestedVariant),
        };

        //await this.cacheService.set(cachedKey, variantReturnData, 3600);
        this.utils.memSet(cachedKey, variantReturnData, 3600);

        return variantReturnData;
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

  /**
   *
   * @param { Array } products - shopify collection products
   * @param { Object } variantToMatch
   * @param { Boolean }includeAllOptions
   * @returns
   */

  getOptionsConfigurations = (
    variants: Variant[],
    variantToMatch,
    parentProduct: ProductCollection, // TODO: SHould this be a 'ShopifyProduct' instead?
    includeAllOptions?: boolean,
  ): OptionsConfigurations => {
    const altConfigs = {};
    const allOptions = {};
    const variantOptionsToMatch = variantToMatch.options;

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

    const addToConfigObj = (optionKey: string, variant) => {
      const value = variant.options[optionKey];

      if (value) {
        const variantData = {
          value: value,
          id: variant.id,
          // ...(optionKey === ProductOption.Metal && { goldPurity: variant?.options?.goldPurity }),
        };

        if (altConfigs[optionKey]) {
          altConfigs[optionKey][value] = variantData;
        } else {
          altConfigs[optionKey] = { [value]: variantData };
        }
      }
    };

    for (const variant of variants) {
      for (const optionKey in variantOptionsToMatch) {
        const optionValue = variant?.options?.[optionKey];
        const optionValueToMatch = variantOptionsToMatch[optionKey];

        // console.log({ optionKey, optionValue, optionValueToMatch });

        // Save option value in map
        if (allOptions[optionKey]) {
          if (!allOptions[optionKey].includes(variant.options[optionKey])) {
            allOptions[optionKey].push(optionValue);
          }
        } else {
          allOptions[optionKey] = [optionValue];
        }

        // console.log({ allOptions });

        const optionsToMatch = { ...variantOptionsToMatch };

        // Delete the option we will try to match against
        delete optionsToMatch[optionKey];

        // Skip specific options of if value is not defined
        if (OPTIONS_TO_SKIP.includes(optionKey) || typeof optionValueToMatch === undefined || optionValueToMatch === null) {
          continue;
        }

        const isRingSizeValid = ['Engagement Ring', 'Wedding Band'].includes(parentProduct.productType);

        // Skip non default sizes when working with all options except 'size'
        if (
          isRingSizeValid &&
          optionKey !== ProductOption.RingSize &&
          variant?.options?.[ProductOption.RingSize] !== DEFAULT_RING_SIZE
        ) {
          continue;
        }

        const isMatch = Object.keys(optionsToMatch).every((o) => {
          // Do not compare options
          if (OPTIONS_TO_SKIP.includes(o)) {
            return true;
          }

          // If either option value is unavailable, assume it matches
          // This is unexpected and should be fixed in Shopify
          if (!optionValue || !variant?.options?.[o]) {
            return true;
          }

          return variant.options[o] === optionsToMatch[o];
        });

        if (isMatch) {
          addToConfigObj(optionKey, variant);
        }
      }
    }

    // Ensure all diamondTypes have a variant

    // figure out which diamond types still need variants
    const missingDiamondTypes = allOptions[ProductOption.DiamondType].filter((diamondType) => {
      return !altConfigs[ProductOption.DiamondType][diamondType];
    });

    const diamondTypeMatchers = { ...variantOptionsToMatch };
    const diamondTypeVariants = variants.sort((a, b) => {
      for (const optionTypeKey of Object.keys(diamondTypeMatchers)) {
        const variantOptionsValue = variantOptionsToMatch[optionTypeKey];

        if (optionTypeKey !== ProductOption.DiamondType) {
          if (a.options[optionTypeKey] !== b.options[optionTypeKey]) {
            if (a.options[optionTypeKey] === variantOptionsValue) {
              return -1;
            } else if (b.options[optionTypeKey] === variantOptionsValue) {
              return 1;
            } else {
              return compareVariantOption(a, b, optionTypeKey);
            }
          }
        }
      }

      return 0;
    });

    missingDiamondTypes.forEach((diamondType) => {
      const result = diamondTypeVariants.find((v) => v.options[ProductOption.DiamondType] === diamondType);

      if (result) {
        addToConfigObj(ProductOption.DiamondType, result);
      }
    });

    // Match for ringSize from parent product
    const ringSizeConfigs = parentProduct.variants
      .filter((variant) => {
        /* eslint-disable */
        const { ringSize, side, ...optionsToMatch } = variantOptionsToMatch;

        /* eslint-enable */
        return Object.keys(optionsToMatch).every((optionKey) => optionsToMatch[optionKey] === variant.options[optionKey]);
      })
      .map((variant) => ({ value: variant.options[ProductOption.RingSize], id: variant.id }));

    // Convert altconfigs from map of maps to map of arrays & sort
    for (const optionType in altConfigs) {
      altConfigs[optionType] = sortOptions(Object.values(altConfigs[optionType]), optionTypesComparators[optionType]);
    }

    // Add size variants
    altConfigs[ProductOption.RingSize] = sortOptions(ringSizeConfigs, optionTypesComparators[ProductOption.RingSize]);

    if (includeAllOptions) {
      altConfigs['allOptions'] = allOptions;
    }

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
    let response = await this.utils.memGet(cachedKey); // return the cached result if there's a key

    const queryVars = {
      collectionSlug,
      productHandle,
      locale,
    };

    if (!response) {
      // response = await this.limiter.schedule(async () => {
      //   this.utils.createDataGateway().request(QUERIES.erPDP, queryVars);
      // });
      response = await this.utils.createDataGateway().request(ERPDP, queryVars); // dato engagement ring pdp query
      this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
      this.utils.memSet(cachedKey, response, 3600); //set the response in memory
    }
    const result = await response;

    return result;
  }

  async datoContentForJewelry({ slug, variantId, locale }): Promise<object> {
    this.logger.verbose(`Entering into dataContent ${slug}-${variantId}-${locale}`);
    const cachedKey = `${slug}-${variantId}-${locale}`;
    let response = await this.utils.memGet(cachedKey); // return the cached result if there's a key

    const queryVars = {
      slug,
      variantId,
      locale,
    };

    if (!response) {
      // response = await this.limiter.schedule(async () => {
      //   this.utils.createDataGateway().request(QUERIES.erPDP, queryVars);
      // });
      response = await this.utils.createDataGateway().request(JEWELRYPRODUCT, queryVars); // dato engagement ring pdp query
      this.logger.verbose(`Dato content set cached key :: ${cachedKey}`);
      this.utils.memSet(cachedKey, response, 3600); //set the response in memory
    }
    const result = await response;

    return result;
  }
}
