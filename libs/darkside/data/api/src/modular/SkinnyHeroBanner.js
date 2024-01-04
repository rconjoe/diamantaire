import { ButtonFragment } from '../fragments';
const SkinnyHeroBanner = `
  ... on ModularSkinnyHeroBannerBlockRecord {
    id
    _modelApiKey
    title
    copy
    textColor {
      hex
    }
    desktopImage {
      url
      alt
      responsiveImage(imgixParams: {w: 1440, h: 338, q: 40, auto: format, fit: crop, crop: focalpoint }, sizes:"(min-width: 144rem) 144rem, (min-width: 76.8rem) 100vw") {
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
      responsiveImage(imgixParams: {w: 360, h: 173, q: 30, auto: format, fit: crop, crop: focalpoint }, sizes:"100vw") {
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
    ctaCopy
    ctaRoute
    additionalClass
    darksideButtons {
        ${ButtonFragment}
      }
  }
`;

export default SkinnyHeroBanner;
