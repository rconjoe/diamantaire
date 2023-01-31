import ResponsiveImageFragment from './fragments/ResponsiveImageFragment';

const customProduct = `
  query customProduct($slug: String!, $locale: SiteLocale){
    customProduct(filter: {slug: {eq: $slug}}, locale: $locale) {
      productSubtitle
      productDescription
      id
      productTitle
      seoDescription
      seoTitle
      slug
      assetStack {
        url
        alt
        height
        width
        mimeType
        video {
          streamingUrl
        }
      }
      trioBlocks {
        aboveCopy
        belowCopy
        headingType,
        headingAdditionalClass
        title
        blocks {
          title
          copy
          image {
            alt
            height
            width
            url
          }
        }
      }
      productSuggestionQuadBlock {
        _modelApiKey
        name
        content {
          ... on ModularProductSuggestionQuadBlockRecord {
            id
            _modelApiKey
            aboveCopy
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
        }
      }
      productIconList {
        items {
          ... on ModularProductIconListItemRecord {
            _modelApiKey
            icon {
              url
            }
            copy
            ctaCopy
            ctaRoute
            additionalInfo {
              text
              title
              image {
                url
                alt
                responsiveImage (imgixParams: { w: 448, q: 60, auto: format }){
                  ...responsiveImageFragment
                }
              }
            }
          }
          ... on ModularShippingProductIconListItemRecord {
            id
            _modelApiKey
            shippingBusinessDays
            shippingText
            useStaticText
            staticText
            icon {
              url
            }
            shippingBusinessDaysCountryMap
          }
        }
      }
    }
  }
  ${ResponsiveImageFragment}
`;

export default customProduct;
