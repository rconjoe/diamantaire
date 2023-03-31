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
        responsiveImage(imgixParams: {w: 1440, q: 40, auto: format, fit: crop, crop: focalpoint }) {
          ...responsiveImageFragment
        }
    }
    mobileCopy
    mobileImage {
        url
        alt
        mimeType
        responsiveImage (imgixParams: {w: 375, q: 35, auto: format, fit: crop, crop: focalpoint }){
          ...responsiveImageFragment
        }
    }
    copyPrices{
      prices {
        priceValue
        currencyCode
      }
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
`;

export default FullWidthBanner;
