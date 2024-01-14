import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

// This hook fetches plp creative blocks data from dato - client-side

type PlpDatoCreativeBlocksProps = {
  allCreativeBlocks: {
    id: string;
    desktopImage: DatoImageType;
    mobileImage: DatoImageType;
    desktopCopy: string;
    mobileCopy: string;
    title: string;
    ctaCopy: string;
    ctaRoute: string;
  }[];
};

export function usePlpDatoCreativeBlocks(
  locale: string,
  ids: string[],
  useProductTitleOnly: boolean,
): UseQueryResult<PlpDatoCreativeBlocksProps, unknown> {
  return useQuery({
    ...queries.plp.creativeBlocks(locale, ids, useProductTitleOnly),
  });
}

export default usePlpDatoCreativeBlocks;
