import { ButtonFragment } from '../fragments';

const CelebrityCarousel = `
  ... on ModularCelebrityCarouselBlockRecord {
    id
    _modelApiKey
    additionalClass
    thumbnailCarouselTitle
    showBottomCarouselOnly
    blocks {
      ... on CelebrityBlockRecord {
        id
        _modelApiKey
        title
        copy
        bottomCarouselCopy
        desktopImage {
          url
          alt
          responsiveImage (imgixParams: {w: 461, h:461, q: 30, auto: format, fit: crop, crop: focalpoint },sizes: "(min-width: 76.8rem) 461px, 100vw"){
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
        bottomCarouselImage {
          url
          alt
          responsiveImage (imgixParams: {w: 461, q: 30, auto: format, fit: crop, crop: focalpoint },sizes: "(min-width: 76.8rem) 461px, 100vw"){
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
        jewelry {
          ... on CelebrityJewelryRecord {
            id
            _modelApiKey
            itemName
            ctaCopy
            ctaRoute
            darksideButtons {
              ${ButtonFragment}
            }
            image {
              url
              alt
              responsiveImage (imgixParams: {w: 186, h:186, q: 30, auto: format, fit: max, crop: focalpoint },sizes: "18.6rem"){
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
  }
`;

export default CelebrityCarousel;
