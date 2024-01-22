import { ButtonFragment } from '../fragments';

const TrioStaggered9x7 = `
  ... on ModularTrioStaggered9x7BlockRecord {
    id
    _modelApiKey
    aboveCopy
    belowCopy
    headingAdditionalClass
    headingType
    title1
    copy1
    image1 {
      url
      alt
    }
    darksideButtons1 {
     ${ButtonFragment}
    }
    title2
    copy2
    image2 {
      url
      alt
    }
    darksideButtons2 {
     ${ButtonFragment}
    }
    title3
    copy3
    image3 {
      url
      alt
    }
    ctaCopy3
    ctaRoute3
    darksideButtons3 {
      ${ButtonFragment}
    }
  }
`;

export default TrioStaggered9x7;
