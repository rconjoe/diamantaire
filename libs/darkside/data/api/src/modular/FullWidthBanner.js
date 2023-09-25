import { ButtonFragment } from '../fragments';

const FullWidthBanner = `
  ... on ModularFullWidthBannerBlockRecord {
    id
    _modelApiKey
    title
    subTitle
    headingType
    headingAdditionalClass
    desktopCopy
    desktopImage {
        url
        alt
        mimeType
        responsiveImage(imgixParams: {w: 1440, q: 60, auto: format, fit: crop, crop: focalpoint },sizes:"(min-width: 1440px) 1440px, (min-width: 768px) 100vw") {
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
        mimeType
        responsiveImage(imgixParams: {w: 360, q: 55, auto: format, fit: crop, crop: focalpoint },sizes:"100vw") {
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
    copyPrices{
      prices {
        priceValue
        currencyCode
      }
    }
    darksideButtons {
      ${ButtonFragment}
    }
    ctaCopy
    ctaRoute
    ctaButtonType
    isTextBlockWide
    textColor
    textBlockAlignment
    ctaCopy2
    ctaRoute2
    ctaButtonType2
    openInNewWindow
    ctaCopy3
    ctaRoute3
    ctaButtonType3
    supportedCountries {
      code
      name
    }
    gtmClass
    additionalClass
    darksideButtons {
      ${ButtonFragment}
    }
  }
`;

export default FullWidthBanner;
