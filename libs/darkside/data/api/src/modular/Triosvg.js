import { ButtonFragment } from '../fragments';

const Triosvg = `
  ... on ModularTriosvgBlockRecord {
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
    darksideButtons3 {
     ${ButtonFragment}
    }
    backgroundColor {
      alpha
      red
      green
      blue
    }
  }
`;

export default Triosvg;
