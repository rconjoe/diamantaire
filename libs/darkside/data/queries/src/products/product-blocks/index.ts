import { fetchProductByVariantSlugs } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const productBlocks = createQueryKeys('product-blocks', {
  products: (id: string, slugs: string[]) => ({
    queryKey: [slugs, id],
    queryFn: () => fetchProductByVariantSlugs(slugs),
  }),
});
