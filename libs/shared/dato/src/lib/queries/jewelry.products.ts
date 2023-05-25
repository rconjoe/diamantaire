// TODO: Unfuck this file

const ResponsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
    src
    width
    height
    aspectRatio
    title
    base64
  }
`;

const Accordion = `
  ... on ModularAccordionBlockRecord {
    id
    _modelApiKey
    firstItemOpen
    title
    copy
    ctaCopy
    ctaRoute
    ctaButtonType
    image {
      url
      video {
          streamingUrl
        }
      alt
      responsiveImage(imgixParams: {w: 637, h: 769, q: 55, auto: format, fit: crop, crop: focalpoint }, sizes:"100vw") {
        src
        alt
        aspectRatio
        base64
        bgColor
        height
        sizes
        title
        width
      }
    }
    accordionItems {
      copy
      title
      ctacopy
      ctaroute
      supportedCountries {
        code
        name
      }
    }
    bottomCopy
    shouldUseFaqSchema
  }
`;

export const JEWELRYPRODUCT = `
  query jewelryProduct($slug: String!, $locale: SiteLocale, $variantId: String!) {
    jewelryProduct(filter: {slug: {eq: $slug}}, locale: $locale) {
      subCategory {
        title
        slug
      }
      seoFields {
        seoTitle
        seoDescription
      }
      slug
      productTitle
      productDescription(markdown: false)
      diamondDescription(markdown: false)
      bottomDescription(markdown: false)
      extraOptions {
        label
        name
      }
      productIconList {
        items {
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
      shippingAndReturns {
        copy(markdown: false)
      }
      belowBannerBlocks {
        ... on FullWidthBannerBlockRecord {
          id
          _modelApiKey
          title
          desktopCopy
          desktopImage {
            url
            alt
          }
          mobileCopy
          mobileImage {
            url
            alt
          }
          ctaCopy
          ctaRoute
          isTextBlockWide
          textColor
          textBlockAlignment
        }
        ... on HalfWidthBannerBlockRecord {
          id
          _modelApiKey
          title
          desktopCopy
          desktopImage {
            url
            alt
          }
          mobileCopy
          mobileImage {
            url
            alt
          }
          ctaCopy
          ctaRoute
          isTextBlockWide
          textColor
          textBlockAlignment
        }
        ... on TrioBlockRecord {
          id
          _modelApiKey
          title
          aboveCopy
          belowCopy
          headingType
          headingAdditionalClass
          blocks {
            title
            copy
            ctaCopy
            ctaRoute
            media {
              ... on Image1x1Record {
                image {
                  url
                  alt
                  responsiveImage (imgixParams: { w: 448, q: 60, auto: format }){
                    ...responsiveImageFragment
                  }
                }
              }
              ... on Image9x7Record {
                image {
                  url
                  alt
                  responsiveImage (imgixParams: { w: 448, q: 60, auto: format }){
                    ...responsiveImageFragment
                  }
                }
              }
              ... on SvgAssetRecord {
                svg {
                  url
                  alt
                }
              }
            }
          }
        }
      }
      waitlistPageCopy {
        waitlistCtaCopy
        waitlistCopy
      }
      ctaCopy {
        addToBagCtaCopy
        outOfStockCtaCopy
        diamondPageFlowCtaCopy
        diamondPairFlowCtaCopy
      }
      specLabels {	
        labels {	
          ... on MetalLabelRecord {
            specName
            copy
          }
          ... on SettingLabelRecord {
            copy
            specName
          }
          ... on ChainLengthLabelRecord {
            copy
            specName
          }
          ... on ChainWidthLabelRecord {
            copy
            specName
          }
          ... on DiamondCountLabelRecord {
            copy
            specName
          }
          ... on ShownWithCenterStoneLabelRecord {
            specName
            copy
          }
          ... on ClosureLabelRecord {
            specName
            copy
          }
          ... on CaratLabelRecord {
            specName
            copy
          }
          ... on ClarityLabelRecord {
            specName
            copy
          }
          ... on CutLabelRecord {
            specName
            copy
          }
          ... on ColorLabelRecord {
            specName
            copy
          }
          ... on PostsLabelRecord {
            copy
            specName
          }
          ... on ShapeLabelRecord {
            copy
            specName
          }
          ... on JacketLengthLabelRecord {
            copy
            specName
          }
          ... on DiamondSizeLabelRecord {
            copy
            specName
          }
          ... on BandWidthLabelRecord {
            copy
            specName
          }
          ... on OuterDiameterLabelRecord {
            copy
            specName
          }
          ... on RingFaceLabelRecord {
            copy
            specName
          }
          ... on CharmLabelRecord {
            copy
            specName
          }
          ... on CordWidthLabelRecord {
            copy
            specName
          }
          ... on DepthLabelRecord {
            copy
            specName
          }
          ... on OriginLabelRecord {
            copy
            specName
          }
        }
      }	
      caratWeight
      configurations {
        diamondDescriptionOverride(markdown: false)
        isWaitlisted
        plpTitle
        configuredProductOptionsInOrder
        variantId
        countrySpecificPrices
        assetStack {
          url
          mimeType
          video {
            streamingUrl
          }
          alt
        }
        productIconList {
          items {
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
        shownWithCenterStone
        shape
        color
        clarity
        carat
        caratWeightOverride
        metal
        setting
        closure
        chainLength
        chainWidth
        posts
        diamondCount
        diamondSize
        jacketLength
        bandWidth
        outerDiameter
        ringFace
        cordWidth
        depth
        charm
        origin
        trioBlocks {
          id
          _modelApiKey
          title
          aboveCopy
          belowCopy
          blocks {
            title
            copy
            ctaCopy
            ctaRoute
            image {
                url
                alt
                responsiveImage (imgixParams: { w: 448, q: 60, auto: format }){
                    ...responsiveImageFragment
                }
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
          accordionBlocks {
            ${Accordion}
        }
      }
      accordionBlocks {
        ${Accordion}
    }
  }
    configuration(filter: {variantId: {eq: $variantId}}) {
      accordionBlocks {
        bottomCopy
        copy
        ctaButtonType
        ctaCopy
        ctaRoute
        firstItemOpen
        title
        shouldUseFaqSchema
      }
      plpTitle
      configuredProductOptionsInOrder
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
      shownWithCenterStone
      shape
      color
      clarity
      cut
      carat
      caratWeightOverride
      metal
      setting
      closure
      depth
      chainLength
      chainWidth
      posts
      origin
      diamondCount
      trioBlocks {
        blocks {
          title
          copy
          ctaCopy
          ctaRoute
          image {
            url
            alt
            responsiveImage(imgixParams: {w: 448, q: 40, auto: format}) {
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
    }
  }
  ${ResponsiveImageFragment}
`;
