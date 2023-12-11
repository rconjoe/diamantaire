import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

// This hook fetches plp blockpicker data from dato - client-side

type PlpBlockPickerBlocksProps = {
  // blocks
  listPage: {
    belowBannerBlocks: any[];
  };
};

export function usePlpBlockPickerBlocks(locale: string, slug: string, category: string): UseQueryResult<PlpBlockPickerBlocksProps, unknown> {
  return useQuery({
    ...queries.plp.plpBlockPickerBlocks(locale, slug, category),
  });
}

export default usePlpBlockPickerBlocks;
