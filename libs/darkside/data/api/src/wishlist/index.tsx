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

  const list = {
    cfy: sanitize('cfy-').join(','),
    bundle: sanitize('bundle-').join(','),
    diamond: sanitize('diamond-').join(','),
    product: sanitize('product-').join(','),
  };

  const fetchProductData = async (productIds: string) => {
    const url = `/products/list?slugs=${productIds}`;

    return await queryClientApi().request({ method: 'GET', url });
  };

  const payload = {
    cfy: (list.cfy && (await fetchDiamondData({ lotId: list.cfy, locale }))) || null,
    diamond: (list.diamond && (await fetchDiamondData({ lotId: list.diamond, locale }))) || null,
    product: list.product && (await fetchProductData(list.product)),
  };

  const getDiamondArray = (type) => {
    if (type && payload[type]) {
      if (payload[type].diamond) {
        return [payload[type].diamond];
      } else {
        return Object.values(payload[type].diamonds);
      }
    }

    return [];
  };

  const getProductArray = () => {
    const data = payload.product.data;

    if (!data) return [];

    return Object.keys(data).reduce((a, v) => {
      return [...a, { id: v, ...data[v] }];
    }, []);
  };

  return {
    diamonds: getDiamondArray('diamond'),
    cfy: getDiamondArray('cfy'),
    products: getProductArray(),
  };
};
