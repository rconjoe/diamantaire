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
export const fetchWishlistProducts = async (ids: string[], locale: string) => {
  const sanitize = (type: string) => {
    return ids.filter((v) => v.includes(type)).map((v) => v.replace(type, ''));
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

  const withDiamonds = queryList.diamond.length > 0;

  const withProducts = queryList.product.length > 0;

  const productEndpoint = `/products/list?locale=${locale}&slugs=${queryList.product}`;

  const payload = {
    diamond: withDiamonds && (await fetchDiamondData({ lotId: queryList.diamond, locale })),
    product: withProducts && (await queryClientApi().request({ method: 'get', url: productEndpoint })),
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
    wishlist: {
      cfy: list.cfy.reduce((a, v) => ({ ...a, [v]: result.diamond[v] }), {}),
      diamond: list.diamond.reduce((a, v) => ({ ...a, [v]: result.diamond[v] }), {}),
      product: list.product.reduce((a, v) => ({ ...a, [v]: result.product[v] }), {}),
      bundle: list.bundle.reduce(
        (a, v) => ({
          ...a,
          [v]: [result.product[v.split('::')[0]], result.diamond[v.split('::')[1]]],
        }),
        {},
      ),
    },
  };
};
