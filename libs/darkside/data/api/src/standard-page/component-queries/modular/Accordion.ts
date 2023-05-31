const Accordion = `
  ... on ModularAccordionBlockRecord {
    id
    _modelApiKey
    firstItemOpen
    title
    copy
    ctaCopy
    ctaRoute
    ctaButtonType
    image {
      url
      video {
          streamingUrl
        }
      alt
      mimeType
      responsiveImage(imgixParams: {w: 637, h: 769, q: 55, auto: format, fit: crop, crop: focalpoint }, sizes:"100vw") {
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
    accordionItems {
      copy
      title
      ctacopy
      ctaroute
      supportedCountries {
        code
        name
      }
    }
    bottomCopy
    shouldUseFaqSchema
  }
`;

export default Accordion;
