import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useProductIconList(productType: string, locale: string) {
  return useQuery({
    ...queries.products.productIconList(productType, locale),
  });
}

export default useProductIconList;
