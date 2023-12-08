import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type BlockProductProps = {
  products: {
    product: {
      id: string;
      productType: string;
      productSlug: string;
      collectionSlug: string;
      collectionTitle: string;
    };
    content: {
      plpImage: DatoImageType;
    };
  }[];
  lowestPricesByCollection;
};

export function useBlockProducts(slugs: string[]): UseQueryResult<BlockProductProps, unknown> {
  return useQuery({ ...queries['product-blocks'].products(slugs) });
}
