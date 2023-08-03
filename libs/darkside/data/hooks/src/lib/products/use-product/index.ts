import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery, QueryOptions } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseProducts {
  collectionSlug: string;
  productSlug: string;
  options?: QueryOptions;
}

export function useProduct({ collectionSlug, productSlug }: UseProducts) {
  return useQuery({ ...queries.products.variant(collectionSlug, productSlug), staleTime: Infinity });
}

export default useProduct;
