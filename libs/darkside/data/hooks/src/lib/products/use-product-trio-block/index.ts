import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useProductTrioBlock(id: string, locale: string) {
  return useQuery({
    ...queries.products.productTrioBlock(id, locale),
  });
}

export default useProductTrioBlock;
