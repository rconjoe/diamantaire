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
        responsiveImage(imgixParams: {w: 1000, q: 40, auto: format, fit: crop, crop: focalpoint }, sizes:"(min-width: 1440px) 864px, (min-width: 768px) 60vw") {
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
    mobileCopy
    mobileImage {
        url
        alt
        responsiveImage (imgixParams: {w: 360, q: 35, auto: format }){
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
    ctaCopy
    ctaRoute
    isTextBlockWide
    textColor
    textBlockAlignment
    middleLayerImage {
      responsiveImage(imgixParams: {w: 720, q: 40, auto: format, fit: crop, crop: focalpoint }) {
        ...responsiveImageFragment
      }
    }
    middleLayerImageMobile {
      responsiveImage(imgixParams: {w: 420, q: 40, auto: format }) {
        ...responsiveImageFragment
      }
    }
    additionalClass
    supportedCountries {
      code
      name
    }
}
`;

export default HalfWidthBanner;
