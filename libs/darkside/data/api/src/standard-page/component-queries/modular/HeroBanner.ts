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
      responsiveImage(imgixParams: {w: 1440, h: 480, q: 40, auto: format, fit: crop, crop: focalpoint }, sizes:"(min-width: 1440px) 1440px, (min-width: 768px) 100vw") {
            src
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            title
            width
        }
    }
    mobileImage {
      url
      alt
      responsiveImage(imgixParams: {w: 360, q: 35, auto: format, fit: crop, crop: focalpoint }, sizes:"100vw") {
            src
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            title
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
