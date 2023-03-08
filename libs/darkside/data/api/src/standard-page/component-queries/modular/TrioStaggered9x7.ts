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
      responsiveImage(imgixParams: {w: 600, q: 40, auto: format, fit: crop, crop: focalpoint }) {
        ...responsiveImageFragment
      }
    }
    ctaCopy1
    ctaRoute1
    title2
    copy2
    image2 {
      url
      alt
      responsiveImage(imgixParams: {w: 600, q: 40, auto: format, fit: crop, crop: focalpoint }) {
        ...responsiveImageFragment
      }
    }
    ctaCopy2
    ctaRoute2
    title3
    copy3
    image3 {
      url
      alt
      responsiveImage(imgixParams: {w: 600, q: 40, auto: format, fit: crop, crop: focalpoint }) {
        ...responsiveImageFragment
      }
    }
    ctaCopy3
    ctaRoute3
  }
`;

export default TrioStaggered9x7;
