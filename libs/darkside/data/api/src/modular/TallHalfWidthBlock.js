// utilizes responsiveImageFragment in parent query (homepage or standardPage)

import { ButtonFragment } from '../fragments';

const TallHalfWidthBlock = `
  ... on ModularTallHalfWidthBlockRecord {
    id
    _modelApiKey
    title
    titleImage {
        responsiveImage {
            ...responsiveImageFragment
        }
    }
    headingType
    headingAdditionalClass
    mobileTitle
    desktopCopy
    mobileCopy
    darksideButtons {
        ${ButtonFragment}
    }
    desktopImage {
        url
        alt
        mimeType
        responsiveImage(imgixParams: {w: 800, h: 650, q: 40, auto: [format, compress], fit: crop, crop: focalpoint }, sizes:"(min-width: 144rem) 864px, (min-width: 76.8rem) 60vw") {
            ...responsiveImageFragment
        }
    }
    mobileImage {
        url
        alt
        mimeType
        responsiveImage (imgixParams: {w: 375, h:290, q: 35, auto: [format, compress], fit: clamp, crop: focalpoint }, sizes:"100vw"){
            ...responsiveImageFragment
        }
    }
    isTextBlockWide
    textColor
    textBlockAlignment
    additionalClass
    supportedCountries {
      code
      name
    }
}
`;

export default TallHalfWidthBlock;
