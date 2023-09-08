import { queries } from '@diamantaire/darkside/data/queries';
import { DiamondCtoDataTypes } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
export interface DiamondCtoOptionsDataTypes {
  diamondType?: string;
  carat?: string;
}

export interface DiamondCtoDataProps {
  diamond?: DiamondCtoDataTypes;
  diamondCutUpgrade?: DiamondCtoDataTypes;
  diamondColorUpgrade?: DiamondCtoDataTypes;
}

export function useDiamondCtoData(options: DiamondCtoOptionsDataTypes): UseQueryResult<DiamondCtoDataProps, unknown> {
  return useQuery({
    ...queries.diamondCto.content(options),
    keepPreviousData: true,
    staleTime: 300000,
  });
}

export default useDiamondCtoData;
