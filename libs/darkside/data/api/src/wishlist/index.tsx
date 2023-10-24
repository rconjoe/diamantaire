import { WISHLIST_QUERY } from './query';
import { queryDatoGQL } from '../clients';

// Get Diamond CFY Page Info from Dato
export const fetchWishlistContent = async (locale: string) => {
  const wishlistContent = await queryDatoGQL({
    query: WISHLIST_QUERY,
    variables: { locale },
  });

  return wishlistContent;
};
