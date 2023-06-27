export const CONFIGURATIONS_LIST = `
  query PLPIdList($productHandles: [String], $variantIds: [String], $first: IntType, $skip: IntType) {
    allConfigurations(filter: {variantId: {in: $variantIds }}, first: $first, skip: $skip){
      plpTitle
      variantId
      plpImage {
        responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
        }
        alt
      }
      plpImageHover {
        responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
        }
      }
    }
    allOmegaProducts(filter: {shopifyProductHandle: {in: $productHandles}}, first: $first, skip: $skip) {
      plpTitle
      plpImage {
        responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
          }
        alt
      }
      plpImageHover {
        responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
          }
        alt
      }
    }
  }
  fragment responsiveImageFragment on ResponsiveImage {
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`;

export const PLP_QUERY = `query PLP($slug: String!, $locale: SiteLocale) {
  listPage(filter: {slug: {eq: $slug}}, locale: $locale) {
    breadcrumb {
      name
      link {
          ... on ListPageRecord{
              slug
          }
          ... on StandardPageRecord{
              slug
          }
      }
    }
    seo {
      seoTitle
      seoDescription
    }
    showAllCtaCopy
    showAllCtaLink
    hero {
        title
        copy
        textColor {
            hex
        }
        desktopImage {
            url
            blurUpThumb
            responsiveImage(imgixParams: {w: 1440, h: 338, q: 60, auto: format, fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
            }
        }
        mobileImage {
            url
            blurUpThumb
            responsiveImage(imgixParams: {w: 375, h: 180, q: 55, auto: format, fit: crop, crop: focalpoint }) {
                ...responsiveImageFragment
            }
        }
        copyPrices {
            prices {
                priceValue
                currencyCode
            }
        }
        ctaCopy
        ctaRoute
        ctaButtonType
    }
    showHeroWithBanner
    filterAndSort {
        ... on PlpSortRecord {
            label
            sort1
            sort2
            sort3
        }
        ... on PlpFilterRecord {
            label
            filter1
            filter2
        }
    }
    creativeBlocks {
      title
      desktopCopy
      mobileCopy
      ctaCopy
      ctaRoute
      desktopImage {
          url
          alt
          responsiveImage(imgixParams: {w: 666, q: 60, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
          }
      }
      mobileImage {
          url
          alt
          responsiveImage(imgixParams: {w: 375, q: 55, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
          }
      }
      supportedCountries {
          code
      }
      gtmClass
      openInNewTab
    }
    configurationsInOrder {
      ... on OmegaProductRecord {
        _modelApiKey
        shopifyProductHandle
        collection {
          ... on WeddingBandProductRecord {
              slug
              productType
              productLabel {
                  title
              }
              subCategory {
                  slug
                  title
              }
              shouldUseDefaultPrice
          }
          ... on EngagementRingProductRecord {
              slug
              productType
              productLabel {
                  title
              }
              subCategory {
                  slug
                  title
              }
              shouldUseDefaultPrice
          }
        }
        countrySpecificPrices
        plpTitle
        plpImage {
            responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                ...responsiveImageFragment
            }
            alt
        }
        plpImageHover {
            responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                ...responsiveImageFragment
            }
        }
      }
      ... on ConfigurationRecord {
        _modelApiKey
        jewelryProduct {
          slug
          category
          subCategory {
              slug
              title
          }
          productLabel {
              title
          }
          productAccordionSpecsLabel {
              productType
          }
          shouldUseDefaultPrice
        }
        variantId
        plpImage {
          responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
          }
          alt
        }
        plpImageHover {
            responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                ...responsiveImageFragment
            }
        }
        plpTitle
      }
    }
    productsInOrder {
      _modelApiKey
      collection {
        ... on EngagementRingProductRecord {
          slug
        }
        ... on WeddingBandProductRecord {
          slug
        }
      }
    }
  }
}
fragment responsiveImageFragment on ResponsiveImage {
  webpSrcSet
  sizes
  src
  width
  height
  aspectRatio
  alt
  title
  bgColor
  base64
}`;
