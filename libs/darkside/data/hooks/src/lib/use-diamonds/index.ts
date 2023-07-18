import { queries } from '@diamantaire/darkside/data/queries';
import { DiamondDataTypes } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

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
  diamonds?: DiamondDataTypes[];
  diamond?: DiamondDataTypes;
  options?: OptionsDataTypes;
  pagination?: Pagination;
  ranges?: Ranges;
}

export function useDiamondsData(options: OptionsDataTypes): UseQueryResult<DiamondsDataProps, unknown> {
  return useQuery({
    ...queries.diamonds.content(options),
    keepPreviousData: true,
    staleTime: 300000, // Set the stale time to 5 minutes
  });
}

export default useDiamondsData;
