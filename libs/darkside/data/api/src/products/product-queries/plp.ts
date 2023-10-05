import { gql } from 'graphql-request';

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
      shopifyProductHandle
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

export const PLP_QUERY = gql`
  query PLP($slug: String!, $category: String!, $locale: SiteLocale) {
    listPage(filter: { slugNew: { eq: $slug }, category: { eq: $category } }, locale: $locale) {
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
            responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
            alt
          }
          plpImageHover {
            responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
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
            hasOnlyOnePrice
          }
          variantId
          plpImage {
            responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
            alt
          }
          plpImageHover {
            responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
          plpTitle
        }
      }
      productsInOrder {
        _modelApiKey
        shopifyProductHandle
        plpImage {
          responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
          }
          alt
        }
        plpImageHover {
          responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
          }
        }
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
      }
      collectionsInOrder {
        ... on EngagementRingProductRecord {
          id
          _modelApiKey
          slug
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
  }
`;
