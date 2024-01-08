import { responsiveImage } from './ResponsiveImage';
import { ButtonFragment } from '../fragments';

const Trio1x1 = `
  ... on ModularTrio1x1BlockRecord {
    id
    _modelApiKey
    aboveCopy
    belowCopy
    headingAdditionalClass
    headingType
    title1
    copy1
    image1 {
      ${responsiveImage()}
    }
    darksideButtons1 {
      ${ButtonFragment}
    }
    title2
    copy2
    image2 {
      ${responsiveImage()}
    }
    darksideButtons2{
      ${ButtonFragment}
    }
    title3
    copy3
    image3 {
      ${responsiveImage()}
    }
    darksideButtons3 {
      ${ButtonFragment}
    }
  }
`;

export default Trio1x1;
