const SideBySide = `
  ... on ModularSideBySideBlockRecord {
    id
    _modelApiKey
    image {
      url
      alt
      responsiveImage(imgixParams: {w: 635, q: 35, auto: format, fit: max, crop: focalpoint }) {
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
    imageMobile {
      url
      alt
      responsiveImage(imgixParams: {w: 635, q: 35, auto: format, fit: max, crop: focalpoint }) {
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
    imageInline {
      url
      alt
      responsiveImage(imgixParams: {w: 635, q: 35, auto: format, fit: max, crop: focalpoint }) {
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
    copy
    ctaCopy
    ctaButtonType
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
