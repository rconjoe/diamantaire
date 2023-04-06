import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useProductVideo(id: string, locale: string) {
  return useQuery({
    ...queries.products.productVideoBlock(id, locale),
  });
}

export default useProductVideo;
