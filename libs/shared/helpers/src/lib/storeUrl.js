import { default as URI } from 'jsuri';

import {
  VO_ROOT_URL,
  WEDDING_BAND_PRODUCT_TYPE,
  ENGAGEMENT_RING_PRODUCT_TYPE,
} from '@diamantaire/shared/constants';

// TODO: swap with VO_SHOPIFY_URL from constants and jsURI
// need jsURI to handle trailing slash from the constant
export const SHOPIFY_ROOT_URL = 'https://vrai.com';

export const getPathSpecsFromProductDetails = (productType) => {
  switch (productType) {
    case ENGAGEMENT_RING_PRODUCT_TYPE: {
      return {
        origin: VO_ROOT_URL,
        root: 'engagement-rings',
      };
    }

    case WEDDING_BAND_PRODUCT_TYPE: {
      return {
        origin: VO_ROOT_URL,
        root: 'wedding-bands',
      };
    }

    default: {
      return {
        origin: SHOPIFY_ROOT_URL,
        root: 'products',
      };
    }
  }
};

export const shopifyStoreUrl = ({ path, origin }) => {
  const url = new URI(origin).setPath(path);

  return url.toString();
};

// TODO: swap to use URI
export const storePdpUrl = ({ productHandle, productType, tags }) => {
  const { root, origin } = getPathSpecsFromProductDetails(productType, tags);
  const path = `/${root}/${productHandle}`;

  return shopifyStoreUrl({ path, origin });
};

// TODO: make this work for products on omega side as well when index data structure is finalized
export const storeCollectionUrl = ({ slug }) => {
  return `${SHOPIFY_ROOT_URL}/collections/${slug}`;
};

export const removeTrailingSlash = (str) => {
  return str.endsWith('/') ? str.slice(0, -1) : str;
};
