import { responsiveImage } from './ResponsiveImage';

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
      ${responsiveImage(130, 95)}
    }
  }
`;

export default Quote;
