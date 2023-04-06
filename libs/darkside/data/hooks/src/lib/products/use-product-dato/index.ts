import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useProductDato(slug: string, locale: string) {
  return useQuery({
    ...queries.products.dato(slug, locale),
  });
}

export default useProductDato;
