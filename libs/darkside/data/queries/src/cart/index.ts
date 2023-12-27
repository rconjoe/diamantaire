import { fetchCartDatoData, fetchCartGwpData, fetchCartShopifyData } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const cart = createQueryKeys('cart', {
  info: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchCartDatoData(locale),
  }),
  checkout: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchCartShopifyData(locale),
  }),
  gwp: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchCartGwpData(locale),
  }),
});
