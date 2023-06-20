import { queries } from '@diamantaire/darkside/data/queries';
import { PdpTypePlural } from '@diamantaire/shared/constants';
import { useQuery } from '@tanstack/react-query';

// This hook fetches all the server-side data for a pdp

export function useProductDato(slug: string, locale: string, productType: PdpTypePlural) {
  return useQuery({
    ...queries.products.serverSideDatoProductInfo(slug, locale, productType),
  });
}

export default useProductDato;
