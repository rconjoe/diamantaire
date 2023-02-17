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
      height
      width
      alt
    }
  }
`;

export default Quote;
