import { COLOR_NAMING_MAP } from '@diamantaire/shared/constants';

export const dangerouslyExtractInternalShopifyId = (id: string) => {
  if (!id) {
    return '';
  }
  // backwards compatible if id is encoded
  const internalURI = id.includes('gid://shopify') ? id : atob(id);

  return internalURI.split('/').pop();
};

export const getShopifyNumberFromDecimal = (amount) => {
  return 100 * Number.parseFloat(amount);
};

export const mapShopifyColorsToInternal = (shopifyColor: string | number) => {
  return COLOR_NAMING_MAP[shopifyColor];
};

/**
 * Paginated data on shopify products
 * @param edgeList
 * @returns
 */

export const extractCursorFromEdgeList = (edgeList) => {
  if (!edgeList.pageInfo.hasNextPage) {
    return null;
  } else {
    const lastEdge = edgeList.edges[edgeList.edges.length - 1];

    return lastEdge.cursor;
  }
};
