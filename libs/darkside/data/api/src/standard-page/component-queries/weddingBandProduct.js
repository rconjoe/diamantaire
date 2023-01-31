import ResponsiveImageFragment from './fragments/ResponsiveImageFragment';

const weddingBandProduct = `
  query weddingBandProduct($slug: String!, $locale: SiteLocale) {
    weddingBandProduct(filter: {slug: {eq: $slug}}, locale: $locale) {
      shouldUseDefaultPrice
      subCategory {
        title
        slug
      }
      slug
      productTitle
      productDescription
      productType
      hasDiamond
      seoTitle
      seoDescription
      bandWidth
      bandDepth
      paveCaratWeight
      metalWeight
      specBlockTitle
      shownWithCtwLabel
      caratWeight
      specLabels {
        labels {
          ... on BandDepthLabelRecord {
            copy
            specName
          }
          ... on MetalWeightLabelRecord {
            copy
            specName
          }
          ... on BandWidthLabelRecord {
            copy
            specName
          }
          ... on PaveCaratWeightLabelRecord {
            copy
            specName
          }
        }
      }
      productIconList {
        items {
          ... on ModularProductIconListItemRecord {
            _modelApiKey
            icon {
              url
              alt
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
              alt
            }
            shippingBusinessDaysCountryMap
          }
        }        
      }
      trioBlocks {
        blocks {
          title
          copy
          ctaCopy
          ctaRoute
          image {
            url
            alt
            responsiveImage (imgixParams: { w: 448, q: 40, auto: format }){
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
      }
      products {
        plpTitle
        pdpSubTitle
        shopifyProductHandle
        countrySpecificPrices
        assetStack {
          url
          mimeType
          video {
            streamingUrl
          }
          alt
        }
        shownWithCtw
        bandWidthOverride
        metalWeightOverride
        paveCaratWeightOverride
        caratWeightOverride
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
      }
      pageCopy {
        ... on EngagementRingPdpCtaRecord {
          buyButtonCopy
          belowOptionsCopy
        }
        ... on EngravingOptionCopyRecord {
          modifyEngravingCopy
          currentEngravingCopy
          addEngravingOptionCopy
          addEngravingOptionCta
          removeEngravingOptionCta
          updateEngravingOptionCta
        }
        ... on RingSizeOptionCopyRecord {
          ringSizeOptionCopy
          ringSizeOptionCta
        }
      }
      optionList {
        id
        label
        option
        optionMapper {
          map {
            key
            value
          }
        }
      }
    }
  }
  ${ResponsiveImageFragment}
`;

export default weddingBandProduct;
