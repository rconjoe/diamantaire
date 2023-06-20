import { fetchCartData } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const cart = createQueryKeys('cart', {
  info: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchCartData(locale),
  }),
});
