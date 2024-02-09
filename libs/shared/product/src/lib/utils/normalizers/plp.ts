import { replacePlaceholders } from '@diamantaire/shared/helpers';

import { VraiProduct, ListPageItemConfiguration } from '../../types';

export const createPlpProduct = (product: VraiProduct, content: Record<string, any>): ListPageItemConfiguration => {
  return {
    title: content['plpTitle'] || product.collectionTitle,
    productSlug: product.productSlug,
    collectionSlug: product.collectionSlug,
    configuration: product.configuration,
    productType: product.productType,
    primaryImage: content['plpImage'].responsiveImage,
    hoverImage: content['plpImageHover'].responsiveImage,
    price: product.price,
  };
};

type ProductConfiguration = {
  metal: string;
  diamondType: string;
} & Record<string, string>;

export function createPlpTitle(
  placeholderString: string,
  productTitle: string,
  plpTitle: string,
  { metal, diamondType }: ProductConfiguration,
  isMultiShape: boolean,
  useProductTitleOnly: boolean,
): string {
  let genTitle = productTitle;

  if (useProductTitleOnly) return plpTitle || productTitle;

  let placeholderResult: string | string[];

  if (plpTitle) {
    placeholderResult = replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [plpTitle, '']);
  } else if (diamondType && !isMixedDiamondType(diamondType) && !isMultiShape) {
    placeholderResult = replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [productTitle, diamondType]);
  } else if (isMultiShape) {
    placeholderResult = replacePlaceholders(placeholderString, ['%%title%%'], [productTitle]);
    placeholderResult =
      typeof placeholderResult === 'string'
        ? placeholderResult.replace('%%shape%%', '')
        : placeholderResult.join('').replace('%%shape%%', '');
  } else {
    placeholderResult = replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [productTitle, '']);
  }

  genTitle = typeof placeholderResult === 'string' ? placeholderResult : placeholderResult.join('');
  genTitle += ` ${metal}`;

  // Clean up the resulting string to remove extra spaces or commas
  genTitle = genTitle.replace(/,+/g, ',').replace(/ ,/g, ' ').trim();

  return genTitle;
}

export function isMixedDiamondType(diamondType: string): boolean {
  const regex = /\w+(\+\w+)/;

  return regex.test(diamondType);
}

// https://diamondfoundry.atlassian.net/wiki/spaces/DGT/pages/971407413/Product+Titles+on+PLPs
