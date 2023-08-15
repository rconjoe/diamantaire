const ProductSuggestionQuad = `
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
