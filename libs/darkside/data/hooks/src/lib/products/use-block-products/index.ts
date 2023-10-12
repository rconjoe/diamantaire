import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useBlockProducts(id: string, slugs: string[]) {
  return useQuery({ ...queries['product-blocks'].products(id, slugs) });
}

export default useBlockProducts;
