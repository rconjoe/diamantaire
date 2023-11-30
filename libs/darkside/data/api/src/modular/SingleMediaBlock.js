import { responsiveImage } from './ResponsiveImage';

const SingleMediaBlock = `
... on ModularSingleMediaBlockRecord {
    _modelApiKey
    id
    title
    headingType
    headingAdditionalClass
    copy
    media {
        ${responsiveImage()}
        video {
            streamingUrl
            thumbnailUrl
        }
    }
    supportedCountries {
      code
      name
    }
}

`;

export default SingleMediaBlock;
