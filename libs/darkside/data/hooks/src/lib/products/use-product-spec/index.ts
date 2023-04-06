import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useProductSpec(id: string, locale: string) {
  return useQuery({
    ...queries.products.productSpec(id, locale),
  });
}

export default useProductSpec;
