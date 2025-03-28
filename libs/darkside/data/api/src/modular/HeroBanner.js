import { ButtonFragment } from '../fragments';

const HeroBanner = `
  ... on ModularHeroBannerBlockRecord {
    id
    _modelApiKey
    ctaCopy
    darksideButtons {
      ${ButtonFragment}
    }
    ctaRoute
    ctaButtonType
    ctaCopy2
    ctaRoute2
    ctaButtonType2
    desktopCopy
    desktopImage {
      url
      alt
      responsiveImage(imgixParams: {w: 1440, h: 480, q: 40, auto: [format, compress], fit: crop, crop: focalpoint, dpr: 2 }, sizes:"(min-width: 144rem) 144rem, (min-width: 76.8rem) 100vw") {
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
    mobileImage {
      url
      alt
      responsiveImage(imgixParams: {w: 360, q: 30, auto: [format, compress], fit: crop, crop: focalpoint, dpr: 2 }, sizes:"100vw") {
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
    title
    textColor
    textBlockAlignment
    mobileCopy
    isTextBlockWide
    headingType
    headingAdditionalClass
    additionalClass
  }
`;

export default HeroBanner;
