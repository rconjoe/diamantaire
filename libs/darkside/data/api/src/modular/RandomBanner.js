import { ButtonFragment } from '../fragments';

const RandomBanner = `
... on ModularRandomBannerBlockRecord {
  id
  blocks {
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
      responsiveImage(imgixParams: {w: 1440, q: 40, auto: [format, compress], fit: crop, crop: focalpoint}, sizes: "(min-width: 144rem) 144rem, (min-width: 76.8rem) 100vw") {
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
      responsiveImage(imgixParams: {w: 360, q: 30, auto: [format, compress], fit: crop, crop: focalpoint}, sizes: "100vw") {
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
    copyPrices {
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
  }
  _modelApiKey
  additionalClass
}
`;

export default RandomBanner;
