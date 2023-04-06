import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useProductInstagramReel(id: string, locale: string) {
  return useQuery({
    ...queries.products.productInstagramReel(id, locale),
  });
}

export default useProductInstagramReel;
