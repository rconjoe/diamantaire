import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export interface DiamondPdpDataTypes {
  id: string;
  header: string;
  productTitle: string;
  carat: string;
  cut: string;
  color: string;
  clarity: string;
  certificate: string;
  dfCertificateDetail: string;
  thirdPartyCertificateDetail: string;
  certificateLabel: string;
  originLabel: string;
  specsHeadline: string;
  seoFields: {
    seoTitle: string;
    seoDescription: string;
  };
  content: (
    | {
        id?: string;
        _modelApiKey?: string;
        aboveCopy?: string;
        belowCopy?: string;
        title1?: string;
        copy1?: string;
        image1?: {
          url?: string;
          alt?: string;
        };
        ctaCopy1?: string;
        ctaRoute1?: string;
        title2?: string;
        copy2?: string;
        image2?: {
          url?: string;
          alt?: string;
        };
        ctaCopy2?: string;
        ctaRoute2?: string;
        title3?: string;
        copy3?: string;
        image3?: {
          url?: string;
          alt?: string;
        };
        ctaCopy3?: string;
        ctaRoute3?: string;
      }
    | {
        id?: string;
        _modelApiKey?: string;
        title?: string;
        headingType?: string;
        headingAdditionalClass?: string;
        desktopCopy?: string;
        desktopImage?: {
          url?: string;
          alt?: string;
        };
        mobileCopy?: string;
        mobileImage?: {
          url?: string;
          alt?: string;
        };
        ctaCopy?: string;
        ctaRoute?: string;
        ctaButtonType?: string;
        isTextBlockWide?: boolean;
        textColor?: string;
        textBlockAlignment?: string;
        ctaCopy2?: string;
        ctaRoute2?: string;
        ctaButtonType2?: string;
        openInNewWindow?: boolean;
        ctaCopy3?: string;
        ctaRoute3?: string;
        ctaButtonType3?: string;
        supportedCountries?: {
          code?: string;
          name?: string;
        }[];
        additionalClass?: string;
      }
  )[];
  cutMapAbridged: {
    key: string;
    value: string;
  }[];
  colorMapAbridged: {
    key: string;
    value: string;
  }[];
  clarityMapAbridged: {
    key: string;
    value: string;
  }[];
  cutInfoMapAbridged: {
    key: string;
    value: string;
  }[];
  clarityInfoMapAbridged: {
    key: string;
    value: string;
  }[];
  colorInfoMapAbridged: {
    key: string;
    value: string;
  }[];
  girdleAbridged: {
    key: string;
    value: string;
  }[];
  fluorescenceAbridged: {
    key: string;
    value: string;
  }[];
  polishAndSymmetryAbridged: {
    key: string;
    value: string;
  }[];
  buttonTextDiamondFlow: string;
  buttonTextSettingFlow: string;
  quickCheckoutText: string;
  buttonTextModularJewelryFlow: string;
  specLabels?: {
    labels: {
      copy: string;
      specName: string;
    }[];
  };
}

interface DiamondPdpDataProps {
  diamondProduct: DiamondPdpDataTypes;
}

export function useDiamondPdpData(locale: string): UseQueryResult<DiamondPdpDataProps, unknown> {
  return useQuery({
    ...queries.diamondPdp.content(locale),
    meta: {
      locale,
    },
    staleTime: 300000, // Set the stale time to 5 minutes
  });
}

export default useDiamondPdpData;
