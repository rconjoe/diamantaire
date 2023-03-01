const SideBySide = `
  ... on ModularSideBySideBlockRecord {
    id
    _modelApiKey
    image {
      url
      alt
      responsiveImage(imgixParams: {w: 635, q: 35, auto: format, fit: max, crop: focalpoint },sizes:"(min-width: 1440px) 635px, calc(100vw - 80px)") {
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
    copy
    ctaCopy
    ctaRoute
    additionalClass
    textBlockAlignment
    ctaCopy2
    ctaRoute2
    headingType
    headingAdditionalClass
    supportedCountries {
      code
      name
    }
  }
`;

export default SideBySide;
