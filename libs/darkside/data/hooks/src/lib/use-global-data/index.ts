import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export type GlobalDataResponse = {
  headerNavigationDynamic: object;
  section: object[][];
  mobileAccordionOrder: object[][];
  mobileLocalizationAccordionOrder: object[][];
  iconsAltText: object[][];
  footerNavigation: {
    columns: object[];
    emailSignUpColumn: object[][];
    emailSignUpCopy: object[][];
    copyright: string;
    countryPicker: object[][];
  };
  diamondTable: {
    carbonNeutralCertification: {
      id: string;
      url: string;
      alt?: string;
    }
  }
};

export function useGlobalData(locale: string): UseQueryResult<GlobalDataResponse> {
  return useQuery({
    ...queries.template.global(locale),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}

export default useGlobalData;
