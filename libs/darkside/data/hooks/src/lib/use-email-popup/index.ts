import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export type EmailPopupProps = {
  emailPopup: {
    image: {
      url: string;
      blurUpThumb: string;
    };
    title: string;
    copy: string;
    countrySpecificCopy: {
      countryCode: string;
      copy: string;
    };
    placeholder1: string;
    placeholder2: string;
    privacyctacopy: string;
    privacyctalink: string;
    submitCopy: string;
    successCopy: string;
    errorCopy: string;
    copyPrices: {
      prices: {
        priceValue: number;
        currencyCode: string;
      };
    };
    supportedCountries: {
      code: string;
      name: string;
    };
    optInCopy: string;
  };
};

export function useEmailPopup(locale: string): UseQueryResult<EmailPopupProps, unknown> {
  return useQuery({
    ...queries.emailPopup.content(locale),
    meta: {
      locale,
    },
  });
}

export default useEmailPopup;
