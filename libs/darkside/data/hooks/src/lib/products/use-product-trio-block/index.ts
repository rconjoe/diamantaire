import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType, DatoDarksideButtonProps } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type TrioBlockProps = {
  trioBlock: {
    id: string;
    blocks: {
      title: string;
      copy: string;
      ctaCopy: string;
      ctaRoute: string;
      image: DatoImageType;
      darksideButtons: DatoDarksideButtonProps[];
    }[];
  };
};

export function useProductTrioBlock(id: string, locale: string): UseQueryResult<TrioBlockProps, unknown> {
  return useQuery({
    ...queries.products.productTrioBlock(id, locale),
  });
}

export default useProductTrioBlock;
