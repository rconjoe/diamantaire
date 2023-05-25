import { queries } from '@diamantaire/darkside/data/queries';
import { ProductTypePlural } from '@diamantaire/shared/constants';
import { useQuery } from '@tanstack/react-query';

export function useProductDato(slug: string, locale: string, productType: ProductTypePlural) {
  return useQuery({
    ...queries.products.dato(slug, locale, productType),
  });
}

export default useProductDato;
