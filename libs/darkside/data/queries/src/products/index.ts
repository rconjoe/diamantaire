import { getProductPage } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

// import type { DarksideGlobalGatewayQueryFunctionContext } from '@diamantaire/shared/types';
// import { QueryOptions } from '@tanstack/react-query';

export const productPage = createQueryKeys('products', {
  variant: (productSlug: string, variantSlug: string) => ({
    queryKey: [productSlug, variantSlug],
    queryFn: () => getProductPage(productSlug, variantSlug),
    // https://tanstack.com/query/v4/docs/react/guides/disabling-queries
    // enabled: false, // prevent auto refetch => TODO: gateway request changes
  }),
});
