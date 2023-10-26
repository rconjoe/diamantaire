import { WISHLIST_QUERY } from './query';
import { queryClientApi, queryDatoGQL } from '../clients';
import { fetchDiamondData } from '../diamonds';

// Get wishlist content from Dato
export const fetchWishlistContent = async (locale: string) => {
  const wishlistContent = await queryDatoGQL({
    query: WISHLIST_QUERY,
    variables: { locale },
  });

  return wishlistContent;
};

// Get wishlist products
export const fetchWishlistProduct = async (ids: string, locale: string) => {
  const arr = ids?.split(',') || [];

  const sanitize = (type: string) => {
    return arr.filter((v) => v.includes(type)).map((v) => v.replace(type, ''));
  };

  const unbundle = (productIds: string[]) => {
    return productIds.reduce(
      (a, v) => ({
        product: [...a.product, v.split('::')[0]],
        diamond: [...a.diamond, v.split('::')[1]],
      }),
      { product: [], diamond: [] },
    );
  };

  const list = {
    cfy: sanitize('cfy-'),
    bundle: sanitize('bundle-'),
    diamond: sanitize('diamond-'),
    product: sanitize('product-'),
  };

  const queryList = {
    diamond: [...new Set([...list.cfy, ...list.diamond, ...unbundle(list.bundle).diamond])].join(','),
    product: [...new Set([...list.product, ...unbundle(list.bundle).product])].join(','),
  };

  const payload = {
    diamond: queryList.diamond.length > 0 && (await fetchDiamondData({ lotId: queryList.diamond, locale })),
    product:
      queryList.product.length > 0 &&
      (await queryClientApi().request({ method: 'get', url: `/products/list?slugs=${queryList.product}` })),
  };

  const result = {
    diamond: {},
    product: [],
  };

  if (payload.diamond?.diamond) {
    result.diamond = { [payload.diamond.diamond.lotId]: payload.diamond.diamond };
  } else if (payload.diamond?.diamonds) {
    result.diamond = Object.keys(payload.diamond.diamonds).reduce(
      (a, v) => ({ ...a, [payload.diamond.diamonds[v].lotId]: payload.diamond.diamonds[v] }),
      {},
    );
  }

  result.product = payload.product?.data || [];

  return {
    cfy: list.cfy.map((v) => result.diamond[v]),
    diamonds: list.diamond.map((v) => result.diamond[v]),
    products: list.product.map((v) => result.product[v]),
    bundle: list.bundle.map((v) => ({
      product: result.product[v.split('::')[0]],
      diamond: result.diamond[v.split('::')[1]],
    })),
  };
};
