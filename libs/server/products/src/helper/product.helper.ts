import {
  ProductOption,
  DiamondTypes,
  DIAMOND_SHAPES_IN_ORDER,
  MetalType,
  METAL_TYPES_IN_ORDER,
  BandAccentType,
  BAND_ACCENTS_IN_ORDER,
  CANONICAL_OPTIONS_TO_MATCH,
  CANONICAL_OPTIONS_SORT_ORDER,
  ProductType,
  DEFAULT_RING_SIZE,
  GoldPurityValue,
} from '@diamantaire/shared/constants';
import { VraiProduct } from '@diamantaire/shared-product';
import { FilterQuery } from 'mongoose';

import { Variant } from '../index';

// const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export function getCompareFunctionByOptionType(optionType: string) {
  const compareFn = optionTypesComparators[optionType];

  if (compareFn) {
    return compareFn;
  } else {
    // LOG: console.log('Cannot find compare function for: ' + optionType);

    return (n: string | number) => n;
  }
}

/* Map of product option types and functions to sort the values */
export const optionTypesComparators = {
  [ProductOption.DiamondType]: (value: DiamondTypes) => DIAMOND_SHAPES_IN_ORDER.indexOf(value),
  [ProductOption.Metal]: (value: MetalType) => METAL_TYPES_IN_ORDER.indexOf(value),
  [ProductOption.BandAccent]: (value: BandAccentType) => BAND_ACCENTS_IN_ORDER.indexOf(value),
  [ProductOption.RingSize]: (numStr: string) => parseFloat(numStr),
  [ProductOption.SideStoneCarat]: (carat: string) => parseFloat(carat.split('ct')[0]),
  [ProductOption.SideStoneShape]: (value: DiamondTypes) => DIAMOND_SHAPES_IN_ORDER.indexOf(value),
  [ProductOption.CaratWeight]: (carat: string) => {
    // ensure that "other" is always last option
    if (carat === 'other') {
      return Infinity;
    }

    // other wise sort in ascenting by carat weight value
    return parseFloat(carat.split('ct')[0]);
  },
};

/**
 * Given an array of variants, it returns a single variant to be determined as the canonical variant,
 * which is considered the base version of that configuration.  It will share a few options but then
 * use the default for the rest.
 * @param { Variant[] } variants An array of variants
 * @param { Variant } requestedVariant A variant to find the canonical for
 * @returns { Variant } a single variant which is determined to be the canonical version
 */

export function findCanonivalVariant(products: VraiProduct[], requestedProduct: VraiProduct): undefined | VraiProduct {
  if (requestedProduct && products) {
    const canonicalOptionValuesToMatch = {};

    CANONICAL_OPTIONS_TO_MATCH.forEach((optionKey) => {
      const optionValue = requestedProduct.configuration[optionKey];

      if (optionValue) {
        canonicalOptionValuesToMatch[optionKey] = requestedProduct.configuration[optionKey];
      }
    });

    // get all products with matching diamond shape and metal values
    const canonicalCandidates = products.filter((product: VraiProduct) => {
      return Object.keys(canonicalOptionValuesToMatch).every(
        (optionKey) => canonicalOptionValuesToMatch[optionKey] === product.configuration[optionKey],
      );
    });

    canonicalCandidates.sort((a, b) => {
      for (const sortOptionType of CANONICAL_OPTIONS_SORT_ORDER) {
        if (compareProductConfigurations(a, b, sortOptionType)) {
          return compareProductConfigurations(a, b, sortOptionType);
        }
      }

      return 0;
    });

    return canonicalCandidates[0];
  }

  return undefined;
}

/**
 * Reduces an array of variants to a map of option types with all possible options of that type
 * @param { Variant[] } variants an array of variants
 * @returns { object } a map of option types with all possible options of that type
 */
export function reduceToAvailableOptions(variants: Variant[]): { [optionKey: string]: string[] } {
  const allCandidateOptions = {};

  variants.forEach((variant) => {
    for (const optionKey in variant.options) {
      const optionValue = variant.options[optionKey];

      if (optionValue) {
        if (!allCandidateOptions[optionKey]) {
          allCandidateOptions[optionKey] = [optionValue];
        } else {
          if (!allCandidateOptions[optionKey].includes(optionValue)) {
            allCandidateOptions[optionKey].push(optionValue);
          }
        }
        const compareFn = getCompareFunctionByOptionType(optionKey);

        allCandidateOptions[optionKey] = allCandidateOptions[optionKey].sort((a, b) => compareFn(a) - compareFn(b));
      }
    }
  });

  return allCandidateOptions;
}

/**
 * Reduce all variants to just what is expected to match.
 * Ringsize will need to be matched off the the variants from the product.
 * @param { object[] } products an array of products which ea. include an array of variants
 * @return { Variant[] } a reduced array of variants
 */

export function reduceVariantsToPDPConfigurations(products) {
  const configVariants = [];

  products?.forEach((product) => {
    if (product.variants) {
      for (const variant of product.variants) {
        // Ignore variants which are not the default size
        // TODO: get default size base on product type
        const { ringSize, metal, goldPurity } = variant.options;

        if (product.productType === ProductType.EngagementRing) {
          // We only need to work with the default size
          // except when looking for ring size options
          if (ringSize && ringSize !== DEFAULT_RING_SIZE) {
            continue;
          }
          /* 
            Engagement Rings are available in specific metals 
            Yellow Gold, White Gold => 18k
            RoseGold => 14k
          */
          if (metal && goldPurity) {
            if (
              (metal === MetalType.YellowGold && goldPurity !== GoldPurityValue._18K) ||
              (metal === MetalType.WhiteGold && goldPurity !== GoldPurityValue._18K) ||
              (metal === MetalType.RoseGold && goldPurity !== GoldPurityValue._14k)
            ) {
              continue;
            }
          }
        }
        configVariants.push(variant);
      }
    }
  });

  return configVariants;
}

export function compareProductConfigurations(
  a: VraiProduct,
  b: VraiProduct,
  sortOptionKey: string,
  comparatorMap = optionTypesComparators,
) {
  const compareFn = comparatorMap[sortOptionKey];

  if (compareFn) {
    if (a.configuration[sortOptionKey] && b.configuration[sortOptionKey]) {
      const compValA = compareFn(a.configuration[sortOptionKey]);
      const compValB = compareFn(b.configuration[sortOptionKey]);

      return compValA - compValB;
    }
  }

  return 0;
}

export const getCurrencyCode = (countryCode: string): string => {
  if (countryCode === 'US') {
    return 'USD';
  }
  if (countryCode === 'CA') {
    return 'CAD';
  }
  if (countryCode === 'AU') {
    return 'AUD';
  }
  if (countryCode === 'GB') {
    return 'GBP';
  }
  if (countryCode === 'DE') {
    return 'EUR';
  }

  return countryCode;
};

export function includeDraftProducts() {
  // Do NOT include draft products in a production environment
  // if (process.env.NODE_ENV === 'production') {
  //   return false;
  // } else {
  //   return true;
  // }

  // Need to set PROD env var to enable this 
  return false;
}

export function getDraftQuery(): FilterQuery<{ isDraft: boolean }> {
  if (includeDraftProducts()) {
    return { isDraft: true };
  } else {
    return { isDraft: { $exists: false } };
  }
}
