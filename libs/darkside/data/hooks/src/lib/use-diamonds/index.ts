import { queries } from '@diamantaire/darkside/data/queries';
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

interface Variant {
  dangerousInternalShopifyVariantId?: string;
  isForSale?: boolean;
  price?: number;
  title?: string;
  variantId?: string;
  variantSku?: string;
  variantTitle?: string;
}

interface Diamond {
  availableForSale?: boolean;
  carat?: number;
  clarity?: string;
  color?: string;
  cut?: string;
  dangerousInternalProductId?: string;
  description?: string;
  dfCertificateUrl?: string;
  diamondType?: string;
  handle?: string;
  lotId?: string;
  productTitle?: string;
  slug?: string;
  type?: string;
  variants?: Variant[];
  _id?: string;
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
  diamonds?: Diamond[];
  options?: OptionsDataTypes;
  pagination?: Pagination;
  ranges?: Ranges;
}

export function useDiamondsData(options: OptionsDataTypes): UseQueryResult<DiamondsDataProps, unknown> {
  return useQuery({
    ...queries.diamonds.content(options),
    keepPreviousData: true,
  });
}

export default useDiamondsData;
