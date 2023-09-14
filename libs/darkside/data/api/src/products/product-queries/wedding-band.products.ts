import { ResponsiveImageFragment } from '../../fragments';
import { ProductIconList, ShippingProductIconList } from '../../modular';

export const WEDDING_BAND_PDP = `
  query WBPDP($collectionSlug: String, $productHandle: String, $locale: SiteLocale) {
    weddingBandProduct(filter: {slug: {eq: $collectionSlug}}, locale: $locale) {
      shouldUseDefaultPrice
      subCategory {
        title
        slug
      }
      slug
      productTitle
      productDescription
      diamondDescription(markdown: false)
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
      isPromoIconEnabled
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
          ${ProductIconList}
          ${ShippingProductIconList}
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
    }
    variantContent: omegaProduct(filter: {shopifyProductHandle: {eq: $productHandle}}) {
      id
      shopifyProductHandle
      pdpSubTitle
      caratWeightOverride
      paveCaratWeightOverride
      metalWeightOverride
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
    }
  }
  ${ResponsiveImageFragment}    
`;
