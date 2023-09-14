import { queries } from '@diamantaire/darkside/data/queries';
import { DiamondDataTypes, DiamondPairDataTypes } from '@diamantaire/shared/types';
import { UseInfiniteQueryResult, UseQueryResult, useInfiniteQuery, useQuery } from '@tanstack/react-query';

export interface OptionsDataTypes {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  diamondType?: string;
  color?: string;
  cut?: string;
  clarity?: string;
  priceMin?: number;
  priceMax?: number;
  countryCode?: string;
  caratMin?: number;
  caratMax?: number;
  lotId?: string;
  view?: string;
}

interface MinMax {
  min?: number;
  max?: number;
}

interface Ranges {
  type?: string[];
  diamondType?: string[];
  carat?: MinMax;
  price?: MinMax;
}

interface Pagination {
  currentPage?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  itemCount?: number;
  next?: number;
  pageCount?: number;
  perPage?: number;
  prev?: number;
}

interface DiamondsDataProps {
  diamonds?: (DiamondDataTypes | DiamondPairDataTypes)[];
  diamond?: DiamondDataTypes;
  options?: OptionsDataTypes;
  pagination?: Pagination;
  ranges?: Ranges;
}

export function useDiamondsData(options: OptionsDataTypes): UseQueryResult<DiamondsDataProps, unknown> {
  return useQuery({
    ...queries.diamonds.content(options),
    keepPreviousData: true,
    staleTime: 300000,
  });
}

export function useInfiniteDiamondsData(options: OptionsDataTypes): UseInfiniteQueryResult<DiamondsDataProps, unknown> {
  return useInfiniteQuery({
    ...queries.infiniteDiamonds.content(options),
    getNextPageParam: (lastPage: any) => {
      return lastPage?.pagination?.next;
    },
    keepPreviousData: true,
    staleTime: 300000,
  });
}

export default useDiamondsData;
