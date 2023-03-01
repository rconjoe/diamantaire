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
      responsiveImage(imgixParams: {w: 1440, h: 338, q: 40, auto: format, fit: crop, crop: focalpoint }, sizes:"(min-width: 1440px) 1440px, (min-width: 768px) 100vw") {
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
      responsiveImage(imgixParams: {w: 360, h: 173, q: 35, auto: format, fit: crop, crop: focalpoint }, sizes:"100vw") {
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
    additionalClass
  }
`;

export default SkinnyHeroBanner;
