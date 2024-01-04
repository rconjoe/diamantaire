import { ButtonFragment } from '../fragments';

const TrioSlide9x7 = `
  ... on ModularTrioSlide9x7BlockRecord {
    id
    _modelApiKey
    aboveCopy
    belowCopy
    headingAdditionalClass
    headingType
    title1
    image1 {
      url
      alt
    }
    ctaCopy1
    ctaRoute1
    title2
    image2 {
      url
      alt
    }
    ctaCopy2
    ctaRoute2
    title3
    image3 {
      url
      alt
    }
    ctaCopy3
    ctaRoute3
    darksideButtons {
      ${ButtonFragment}
    }
  }
`;

export default TrioSlide9x7;
