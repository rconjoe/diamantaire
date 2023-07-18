import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export interface DiamondInfoDataTypes {
  title: string;
  text: string;
  image: {
    alt: string;
    url: string;
  };
}

interface DiamondInfoDataProps {
  additionalInfo: DiamondInfoDataTypes;
}

export function useDiamondInfoData(locale: string): UseQueryResult<DiamondInfoDataProps, unknown> {
  return useQuery({
    ...queries.diamondInfo.content(locale),
    meta: {
      locale,
    },
    staleTime: 300000, // Set the stale time to 5 minutes
  });
}

export default useDiamondInfoData;
