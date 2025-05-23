import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export interface DiamondTableDataTypes {
  blockquote?: {
    title: string;
    copy: string;
    image: {
      url: string;
    };
  }[];
  bottomContent?: string;
  cannotFindDiamondSentence1?: string;
  cannotFindDiamondSentence2?: string;
  carat?: string;
  certificate?: string;
  certificateLabel?: string;
  clarity?: string;
  clarityFilterBelowCopy?: string;
  clarityMapAbridged: {
    key: string;
    value: string;
  }[];
  clearFiltersButtonCopy?: string;
  color?: string;
  colorFilterBelowCopy?: string;
  colorMapAbridged?: {
    key: string;
    value: string;
  }[];
  cut?: string;
  cutFilterBelowCopy?: string;
  cutInfoMapAbridged?: {
    key: string;
    value: string;
  }[];
  cutMapAbridged?: {
    key?: string;
    value?: string;
  }[];
  seo?: {
    seoDescription: string;
    seoTitle: string;
  };
  sidebar: {
    title: string;
    description: string;
  }[];
  sidebarTitle: string;
  specs: {
    key: string;
    value: string;
  }[];
  title: string;
  dynamicTitle: string;
  bottomPromoContentLargerCarat: string;
  bottomPromoContentNoShape: string;
  bottomPromoContentCtaCopy: string;
  bottomPromoContentCtaLink: string;
  bottomPromoContent: string;
  origin: string;
  originContent: string;
}

interface DiamondTableDataProps {
  diamondTable: DiamondTableDataTypes;
}

export function useDiamondTableData(locale: string): UseQueryResult<DiamondTableDataProps, unknown> {
  return useQuery({
    ...queries.diamondTable.content(locale),
    staleTime: 300000, // Set the stale time to 5 minutes
  });
}

export default useDiamondTableData;
