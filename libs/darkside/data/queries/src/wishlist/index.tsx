import { fetchWishlistContent } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const wishlist = createQueryKeys('wishlist', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchWishlistContent(locale),
  }),
});
