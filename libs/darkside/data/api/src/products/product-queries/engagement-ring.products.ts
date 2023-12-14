export const ERPDP = `
  query erPDP($collectionSlug: String, $productHandle: String, $locale: SiteLocale) {
    engagementRingProduct(filter: {slug: {eq: $collectionSlug}}, locale: $locale) {
        productTitle
        productType
        slug
        bandDepth
        bandWidth
        hasDiamond
        paveCaratWeight
        productDescription
        ctaCopy {
          buyButtonCopy
          diamondFlowCtaCopy
          settingFlowCtaCopy
          settingFlowCtaPluralCopy
          unavailableCtaCopy
          belowOptionsCopy
        }
        metalWeight
        shownWithCtwLabel
        productIconList {
          items {
            ... on ModularProductIconListItemRecord {
              id
              ctaCopy
              copy
              ctaRoute
            }
            ... on ModularShippingProductIconListItemRecord {
              id
              shippingBusinessDays
              shippingBusinessDaysCountryMap
              shippingText
            }
          }
        }
      }
      variantContent: omegaProduct(filter: {shopifyProductHandle: {eq: $productHandle}}) {
        id
        shopifyProductHandle
        pdpSubTitle
        caratWeightOverride
        paveCaratWeightOverride
        metalWeightOverride
        assetStack {
          id
          alt
          url
          mimeType
          size
          height
          width
          mimeType
          customData
          title
          video {
            streamingUrl
            thumbnailUrl
          }
          responsiveImage {
            base64
            height
            width
          }
        }
      }
    }    
`;
