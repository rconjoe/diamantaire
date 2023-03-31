const HeroBanner = `
  ... on ModularHeroBannerBlockRecord {
    id
    _modelApiKey
    ctaCopy
    ctaRoute
    ctaButtonType
    ctaCopy2
    ctaRoute2
    ctaButtonType2
    desktopCopy
    desktopImage {
      url
      alt
      responsiveImage(imgixParams: {w: 1440, q: 40, auto: format, fit: crop, crop: focalpoint }) {
        ...responsiveImageFragment
      }
    }
    mobileImage {
      url
      alt
      responsiveImage (imgixParams: {w: 375, q: 35, auto: format, fit: crop, crop: focalpoint }){
        ...responsiveImageFragment
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
