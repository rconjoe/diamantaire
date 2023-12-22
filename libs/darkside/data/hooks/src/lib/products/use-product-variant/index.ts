import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useProductVariant(variantSlugOrConfigurationVariantId: string, productType: string, locale: string) {
  console.log('variantSlug', variantSlugOrConfigurationVariantId);

  return useQuery({
    ...queries.products.datoVariant(variantSlugOrConfigurationVariantId, productType, locale),
  });
}

export default useProductVariant;
