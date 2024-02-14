import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useProductVariant(variantSlugOrConfigurationVariantId: string, productType: string, locale: string) {
  return useQuery({
    ...queries.products.datoVariant(variantSlugOrConfigurationVariantId, productType, locale),
    refetchOnWindowFocus: false,
  });
}

export default useProductVariant;
