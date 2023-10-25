import { WISHLIST_QUERY } from './query';
import { queryDatoGQL } from '../clients';
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

  const obj = {
    cfy: arr.filter((v) => v.includes('cfy-')).map((v) => v.replace('cfy-', '')),
    diamond: arr.filter((v) => v.includes('diamond-')).map((v) => v.replace('diamond-', '')),
    product: arr.filter((v) => v.includes('product-')).map((v) => v.replace('product-', '')),
  };

  const idsDiamond = obj.diamond.join(',');
  const idsCfy = obj.cfy.join(',');

  const payloadDiamond = await fetchDiamondData({ lotId: idsDiamond, locale });
  const payloadCfy = await fetchDiamondData({ lotId: idsCfy, locale });

  console.log(`payloadDiamond`, payloadDiamond);
  console.log(`payloadCfy`, payloadCfy);

  const diamonds = payloadDiamond.diamond ? [payloadDiamond.diamond] : Object.values(payloadDiamond.diamonds || {});

  // const payloadCfy = await

  // const payloadProduct = await

  return {
    diamonds,
  };
};
