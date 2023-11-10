import { gql } from 'graphql-request';

import { queryDatoGQL } from '../clients';

const GWP_PDP_QUERY = gql`
  query gwpPDPQuery($locale: SiteLocale) {
    allGwpDarksides(locale: $locale) {
      tiers {
        promotionDateRangeEnd
        promotionDateRangeStart
        minSpendByCurrencyCode
        activeCountries
        giftProduct {
          plpImage {
            responsiveImage(imgixParams: { w: 100, h: 100, q: 40, auto: format, dpr: 2 }) {
              src
              alt
              aspectRatio
              base64
              bgColor
              height
              sizes
              srcSet
              title
              webpSrcSet
              width
            }
          }
        }
        giftProductInventoryLevelCutoff
        pdpBannerBody
        pdpBannerColor {
          hex
        }
        # cartQualifiedTitle
        # cartQualifiedBody
        # cartQualifiedBackgroundColor {
        #   hex
        # }
        # cartNonQualifiedTitle
        # cartNonQualifiedBody
        # cartNonQualifiedBackgroundColor {
        #   hex
        # }
        # announcementBarQualifiedCopy
        # announcementBarNonQualifiedCopy
        # announcementBarNothingInCartCopy
        # promoCardQualifiedCopy
        # promoCardNonQualifiedCopy
        # creativeBlockQualifiedCopy
        # creativeBlockNonQualifiedCopy
      }
    }
  }
`;

const GWP_CART_QUERY = gql`
  query gwpCartQuery($locale: SiteLocale) {
    allGwpDarksides(locale: $locale) {
      tiers {
        id
        promotionDateRangeEnd
        promotionDateRangeStart
        minSpendByCurrencyCode
        activeCountries
        giftProduct {
          plpImage {
            responsiveImage(imgixParams: { w: 100, h: 100, q: 40, auto: format, dpr: 2 }) {
              src
              alt
              aspectRatio
              base64
              bgColor
              height
              sizes
              srcSet
              title
              webpSrcSet
              width
            }
          }
        }
        giftProductInventoryLevelCutoff
        cartQualifiedTitle
        cartQualifiedBody
        cartQualifiedBackgroundColor {
          hex
        }
        cartNonQualifiedTitle
        cartNonQualifiedBody
        cartNonQualifiedBackgroundColor {
          hex
        }
      }
    }
  }
`;

export async function fetchPDPGwpData(locale: string) {
  const gwpData = await queryDatoGQL({
    query: GWP_PDP_QUERY,
    variables: { locale },
  });

  return gwpData;
}

export async function fetchCartGwpData(locale: string) {
  const gwpData = await queryDatoGQL({
    query: GWP_CART_QUERY,
    variables: { locale },
  });

  return gwpData;
}
