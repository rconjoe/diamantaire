import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery, QueryOptions } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseProducts {
  productSlug: string;
  variantSlug: string;
  options?: QueryOptions;
}

export function useProduct({ productSlug, variantSlug }: UseProducts) {
  return useQuery({ ...queries.products.variant(productSlug, variantSlug), staleTime: Infinity });
}

export default useProduct;
