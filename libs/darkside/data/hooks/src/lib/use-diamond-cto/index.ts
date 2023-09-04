import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export interface DiamondCtoOptionsDataTypes {
  diamondType?: string;
  carat?: string;
}

export function useDiamondCtoData(options: DiamondCtoOptionsDataTypes) {
  return useQuery({
    ...queries.diamondCto.content(options),
    keepPreviousData: true,
    staleTime: 300000,
  });
}

export default useDiamondCtoData;
