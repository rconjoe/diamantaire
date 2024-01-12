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
    darksideButtons1 {
     ${ButtonFragment}
    }
    title2
    image2 {
      url
      alt
    }
    darksideButtons2 {
     ${ButtonFragment}
    }
    title3
    image3 {
      url
      alt
    }
    darksideButtons3 {
     ${ButtonFragment}
    }
  }
`;

export default TrioSlide9x7;
