import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface ProductDiamondTypesDataProps {
  availableDiamondTypes: string[];
}

export function useProductDiamondTypes(productSlug: string): UseQueryResult<ProductDiamondTypesDataProps, unknown> {
  return useQuery({ ...queries.products.productDiamondTypes(productSlug), staleTime: Infinity });
}

export default useProductDiamondTypes;
