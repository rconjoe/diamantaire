const Quote = `
  ... on ModularQuoteBlockRecord {
    id
    _modelApiKey
    quote
    quoteFont
    quoteStyle
    attribution
    attributionFont
    backgroundColor {
      hex
    }
    textColor {
      hex
    }
    quotationMarksImage {
      url
      alt
      responsiveImage(imgixParams: {w: 200, q: 40, auto: format, fit: crop, crop: focalpoint }) {
        ...responsiveImageFragment
      }
    }
  }
`;

export default Quote;
