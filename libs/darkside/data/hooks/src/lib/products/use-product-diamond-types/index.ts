import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseProducts {
  productSlug: string;
}

export function useProductDiamondTypes({ productSlug }: UseProducts) {
  return useQuery({ ...queries.products.productDiamondTypes(productSlug), staleTime: Infinity });
}

export default useProductDiamondTypes;
