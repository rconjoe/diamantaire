import { fetchInternalCheckoutData } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const internalCheckout = createQueryKeys('internalCheckout', {
  content: () => ({
    queryKey: ['internalCheckout'],
    queryFn: () => fetchInternalCheckoutData(),
  }),
});
