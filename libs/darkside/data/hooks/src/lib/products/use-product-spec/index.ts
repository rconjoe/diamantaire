import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export type ProductSpecProps = {
  data: {
    productSpecLabelCollection: {
      id: string;
      labels: {
        [key: string]: string;
      }[];
    };
  };
};

export function useProductSpec(id: string, locale: string): UseQueryResult<ProductSpecProps, unknown> {
  return useQuery({
    ...queries.products.productSpec(id, locale),
  });
}

export default useProductSpec;
