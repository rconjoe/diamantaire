import ResponsiveImageFragment from '../../fragments/ResponsiveImageFragment';
import Accordion from '../../modular/Accordion';
import Carousel from '../../modular/Carousel';
import CarouselHover from '../../modular/CarouselHover';
import CelebrityCarousel from '../../modular/CelebrityCarousel';
import CelebrityReel from '../../modular/CelebrityReel';
import Duo from '../../modular/Duo';
import EmailSignup from '../../modular/EmailSignup';
import FullWidthBanner from '../../modular/FullWidthBanner';
import GridCarousel from '../../modular/GridCarousel';
import HalfWidthQuad from '../../modular/HalfWidthQuad';
import InstagramReel from '../../modular/InstagramReel';
import MiniBanner from '../../modular/MiniBanner';
import ModularQuadGrid from '../../modular/ModularQuadGrid';
import ProductSlider from '../../modular/ProductSlider';
import Quad from '../../modular/Quad';
import Showroom from '../../modular/Showroom';
import SideBySide from '../../modular/SideBySide';
import SingleVideo from '../../modular/SingleVideo';
import SocialMediaSection from '../../modular/SocialMediaSection';
import TallHalfWidthBlock from '../../modular/TallHalfWidthBlock';
import TextOnly from '../../modular/TextOnly';
import Trio9x7 from '../../modular/Trio9x7';
import TrioSlide9x7 from '../../modular/TrioSlide9x7';
import TrioStaggered9x7 from '../../modular/TrioStaggered9x7';

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
        id
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
        ${Carousel}
        ${CarouselHover}
        ${CelebrityCarousel}
        ${CelebrityReel}
        ${Duo}
        ${EmailSignup}
        ${FullWidthBanner}
        ${GridCarousel}
        ${HalfWidthQuad}
        ${InstagramReel}
        ${MiniBanner}
        ${ProductSlider}
        ${Quad}
        ${ModularQuadGrid}
        ${Showroom}
        ${SideBySide}
        ${SingleVideo}
        ${TallHalfWidthBlock}
        ${TextOnly}
        ${Trio9x7}
        ${TrioSlide9x7}
        ${TrioStaggered9x7}
        ${SocialMediaSection}
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
        assetStack {
          url
          mimeType
          video {
            streamingUrl
          }
          alt
          title
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
          id
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
        id
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
        title
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
      charm
      bandWidth
      ringFace
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
