import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useBlockProducts(slugs: string[]) {
  return useQuery({ ...queries['product-blocks'].products(slugs) });
}

export default useBlockProducts;
