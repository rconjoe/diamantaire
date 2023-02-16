import InstagramReel from './modular/InstagramReel';
import ResponsiveImageFragment from './fragments/ResponsiveImageFragment';

const engagementRingProduct = `
  query engagementRingProduct($slug: String!, $locale: SiteLocale){
    engagementRingProduct(filter: {slug: {eq: $slug}}, locale: $locale) {
      subCategory {
        title
        slug
      }
      hasDiamond
      metalWeight
      paveCaratWeight
      productDescription
      productTitle
      styleGroup
      seoTitle
      productType
      seoDescription
      slug
      specBlockTitle
      specImage
      bandDepth
      bandWidth
      settingHeight
      shouldUseDatoAssets
      shouldUseDefaultPrice
      shownWithCtwLabel
      tags
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
            mp4Url(res: low)
            thumbnailUrl(format: jpg)
          }
          alt
          customData
        }
        shownWithCtw
        bandWidthOverride
        metalWeightOverride
        paveCaratWeightOverride
        caratWeightOverride
        color
        clarity
        shape
        dimensions
        origin
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
      diamondContentBlock {
        diamondBlockText
        diamondBlockTitle
        diamondBlockVideo
        videoBlock {
          ... on VideoBlockRecord {
            copy
            title
            videoSources {
              url
              alt
            }
            thumbnail {
              url
              alt
            }
          }
        }
        diamondShapes {
          diamondShape
          diamondShapeImage
          diamondShapeText
        }
      }
      productFaqBlock {
        faqTitle
        imagePath
        faqEntries {
          title
          content
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
      ctaCopy {
        diamondFlowCtaCopy
        settingFlowCtaCopy
        settingFlowCtaPluralCopy
        unavailableCtaCopy
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
      specLabels {
        labels {
          ... on BandDepthLabelRecord {
            copy
            specName
          }
          ... on SettingHeightLabelRecord {
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
      instagramReelBlock {
        id
        _modelApiKey
        content {
         ${InstagramReel}
        }
      }
    }
  }
  ${ResponsiveImageFragment}
`;

export default engagementRingProduct;
