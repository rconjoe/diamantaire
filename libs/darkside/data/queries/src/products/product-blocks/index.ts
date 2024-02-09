import { fetchProductByVariantSlugs } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const productBlocks = createQueryKeys('product-blocks', {
  products: (slugs: string[], locale) => ({
    queryKey: [slugs, locale],
    queryFn: () => fetchProductByVariantSlugs(slugs, locale),
  }),
});
