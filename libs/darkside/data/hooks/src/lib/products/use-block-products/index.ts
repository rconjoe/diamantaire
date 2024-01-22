import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type BlockProductProps = {
  products: {
    product: {
      _id: string;
      productType: string;
      productSlug: string;
      collectionSlug: string;
      collectionTitle: string;
      contentId: string;
    };
    content: {
      plpImage: DatoImageType;
      shopifyProductHandle: string;
      variantId: string;
    };
  }[];
  lowestPricesByCollection;
};

export function useBlockProducts(slugs: string[]): UseQueryResult<BlockProductProps, unknown> {
  return useQuery({ ...queries['product-blocks'].products(slugs) });
}
