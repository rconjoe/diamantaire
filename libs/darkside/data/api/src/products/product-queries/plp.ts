import { gql } from 'graphql-request';

export const CONFIGURATIONS_LIST = gql`
  query PLPIdList($productHandles: [String], $variantIds: [String], $first: IntType, $skip: IntType, $locale: SiteLocale) {
    allConfigurations(filter: { variantId: { in: $variantIds } }, first: $first, skip: $skip, locale: $locale) {
      plpTitle
      variantId
      plpImage {
        responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
          ...responsiveImageFragment
        }
        alt
      }
      plpImageHover {
        responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
          ...responsiveImageFragment
        }
      }
      jewelryProduct {
        slug
        category
        productTitle
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
    }
    allOmegaProducts(
      filter: { shopifyProductHandle: { in: $productHandles } }
      first: $first
      skip: $skip
      locale: $locale
    ) {
      shopifyProductHandle
      plpTitle
      plpImage {
        responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
          ...responsiveImageFragment
        }
        alt
      }
      plpImageHover {
        responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
          ...responsiveImageFragment
        }
        alt
      }
      collection {
        ... on WeddingBandProductRecord {
          slug
          productType
          productTitle
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
          productTitle
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

export const PRODUCT_BRIEF_CONTENT = gql`
  query list($productHandles: [String], $variantIds: [String], $first: IntType, $skip: IntType, $locale: SiteLocale) {
    allConfigurations(filter: { variantId: { in: $variantIds } }, first: $first, skip: $skip, locale: $locale) {
      plpTitle
      variantId
      plpImage {
        responsiveImage(imgixParams: { w: 344, h: 344, q: 80, auto: [format, compress], fit: crop, crop: focalpoint }) {
          ...responsiveImageFragment
        }
        alt
      }
      jewelryProduct {
        productTitle
      }
    }
    allOmegaProducts(
      filter: { shopifyProductHandle: { in: $productHandles } }
      first: $first
      skip: $skip
      locale: $locale
    ) {
      shopifyProductHandle
      plpTitle
      plpImage {
        responsiveImage(imgixParams: { w: 344, h: 344, q: 80, auto: [format, compress], fit: crop, crop: focalpoint }) {
          ...responsiveImageFragment
        }
        alt
      }
      collection {
        ... on EngagementRingProductRecord {
          productTitle
        }
        ... on WeddingBandProductRecord {
          productTitle
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

export const PLP_INIT_QUERY = gql`
  query PLP($slug: String!, $category: String!, $locale: SiteLocale) {
    listPage(filter: { slugNew: { eq: $slug }, category: { eq: $category } }, locale: $locale) {
      configurationsInOrder {
        ... on OmegaProductRecord {
          _modelApiKey
          shopifyProductHandle
        }
        ... on ConfigurationRecord {
          _modelApiKey
          variantId
        }
      }
      bestSellersInOrder {
        ... on OmegaProductRecord {
          _modelApiKey
          shopifyProductHandle
        }
        ... on ConfigurationRecord {
          _modelApiKey
          variantId
        }
      }
      productsInOrder {
        _modelApiKey
        shopifyProductHandle
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
`;

export const PLP_QUERY = gql`
  query PLP($slug: String!, $category: String!, $locale: SiteLocale) {
    listPage(filter: { slugNew: { eq: $slug }, category: { eq: $category } }, locale: $locale) {
      configurationsInOrder {
        ... on OmegaProductRecord {
          _modelApiKey
          plpTitle
          shopifyProductHandle
          collection {
            ... on WeddingBandProductRecord {
              slug
              productType
              productTitle
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
              productTitle
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
          plpImage {
            responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
            alt
          }
          plpImageHover {
            responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
        }
        ... on ConfigurationRecord {
          _modelApiKey
          plpTitle
          jewelryProduct {
            slug
            category
            productTitle
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
            responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
            alt
          }
          plpImageHover {
            responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
        }
      }
      bestSellersInOrder {
        ... on OmegaProductRecord {
          _modelApiKey
          shopifyProductHandle
          collection {
            ... on WeddingBandProductRecord {
              slug
              productType
              productTitle
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
              productTitle
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
          plpTitle
          plpImage {
            responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
            alt
          }
          plpImageHover {
            responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
        }
        ... on ConfigurationRecord {
          _modelApiKey
          jewelryProduct {
            slug
            category
            productTitle
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
            responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
            alt
          }
          plpImageHover {
            responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
          plpTitle
        }
      }
      productsInOrder {
        _modelApiKey
        shopifyProductHandle
        plpTitle
        plpImage {
          responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
          }
          alt
        }
        plpImageHover {
          responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
          }
        }
        collection {
          ... on WeddingBandProductRecord {
            slug
            productType
            productTitle
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
            productTitle
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
