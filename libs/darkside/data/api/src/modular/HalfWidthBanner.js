import { ButtonFragment } from '../fragments';

const HalfWidthBanner = `
  ... on ModularHalfWidthBannerBlockRecord {
    id
    _modelApiKey
    title
    headingType
    headingAdditionalClass
    mobileTitle
    desktopCopy
    desktopImage {
        url
        alt
        responsiveImage(imgixParams: {w: 922, h: 576, q: 40, auto: format, fit: crop, crop: focalpoint }, sizes:"(min-width: 144rem) 864px, (min-width: 76.8rem) 60vw") {
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
    mobileCopy
    mobileImage {
        url
        alt
        responsiveImage (imgixParams: {w: 360, h:300, q: 30, auto: format, fit: clamp, crop: focalpoint }, sizes:"100vw"){
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
    darksideButtons {
      ${ButtonFragment}
    }
    ctaCopy
    ctaRoute
    isTextBlockWide
    textColor
    textBlockAlignment
    middleLayerImage {
      url
      alt
    }
    middleLayerImageMobile {
      url
      alt
    }        
    supportedCountries {
      code
      name
    }
    additionalClass
  }
`;

export default HalfWidthBanner;
