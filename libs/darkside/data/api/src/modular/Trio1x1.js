import { responsiveImage } from './ResponsiveImage';

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
    ctaCopy1
    ctaRoute1
    title2
    copy2
    image2 {
      ${responsiveImage()}
    }
    ctaCopy2
    ctaRoute2
    title3
    copy3
    image3 {
      ${responsiveImage()}
    }
    ctaCopy3
    ctaRoute3
  }
`;

export default Trio1x1;
