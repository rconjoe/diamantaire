import { gql } from 'graphql-request';

const ProductSuggestionQuad = gql`
  ... on ModularProductSuggestionQuadBlockRecord {
    id
    _modelApiKey
    productsPerRow
    aboveCopy
    isHalfWidth
    halfWidthImageAlignment
    halfWidthDesktopImage {
      url
      alt
      responsiveImage(imgixParams: {w: 720, h: 825, q: 40, auto: format }, sizes:"(min-width: 144rem) 864px, (min-width: 76.8rem) 60vw") {
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
    halfWidthMobileImage {
      url
      alt
    }
    configurationsInOrder {
        ... on OmegaProductRecord {
        collection {
          ... on WeddingBandProductRecord {
              slug
          }
          ... on EngagementRingProductRecord {
              slug
          }
        }
        _modelApiKey
        shopifyProductHandle
      }
      ... on ConfigurationRecord {
        jewelryProduct {
          slug
        }
        _modelApiKey
        configuredProductOptionsInOrder
        variantId
      }
    }
    title1
    configuration1 {
      ... on OmegaProductRecord {
        collection {
          ... on WeddingBandProductRecord {
              slug
          }
          ... on EngagementRingProductRecord {
              slug
          }
        }
        _modelApiKey
        shopifyProductHandle
        plpImage {
          responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
          }
        }
      }
      ... on ConfigurationRecord {
        jewelryProduct {
          slug
        }
        _modelApiKey
        configuredProductOptionsInOrder
        variantId
      }
    }
    title2
    configuration2 {
      ... on OmegaProductRecord {
        collection {
          ... on WeddingBandProductRecord {
              slug
          }
          ... on EngagementRingProductRecord {
              slug
          }
        }
        _modelApiKey
        shopifyProductHandle
        plpImage {
          responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
          }
        }

      }
      ... on ConfigurationRecord {
        jewelryProduct {
          slug
        }
        _modelApiKey
        configuredProductOptionsInOrder
        variantId
      }
    }
    title3
    configuration3 {
      ... on OmegaProductRecord {
        collection {
          ... on WeddingBandProductRecord {
              slug
          }
          ... on EngagementRingProductRecord {
              slug
          }
        }
        _modelApiKey
        shopifyProductHandle
        plpImage {
          responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
          }
        }
      }
      ... on ConfigurationRecord {
        jewelryProduct {
          slug
        }
        _modelApiKey
        configuredProductOptionsInOrder
        variantId
      }
    }
    title4
    configuration4 {
      ... on OmegaProductRecord {
        collection {
          ... on WeddingBandProductRecord {
              slug
          }
          ... on EngagementRingProductRecord {
              slug
          }
        }
        _modelApiKey
        shopifyProductHandle
        plpImage {
          responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
          }
        }
      }
      ... on ConfigurationRecord {
        jewelryProduct {
          slug
        }
        _modelApiKey
        configuredProductOptionsInOrder
        variantId
      }
    }
  }
`;

export default ProductSuggestionQuad;
