import { fetchProductByVariantSlugs } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const productBlocks = createQueryKeys('product-blocks', {
  products: (locale: string, slugs: string[]) => ({
    queryKey: [locale, slugs],
    queryFn: () => fetchProductByVariantSlugs(locale, slugs),
  }),
});
