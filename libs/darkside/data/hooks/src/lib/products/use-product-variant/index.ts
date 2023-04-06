import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useProductVariant(variantSlug: string, locale: string) {
  return useQuery({
    ...queries.products.datoVariant(variantSlug, locale),
  });
}

export default useProductVariant;
