const responsiveImage = `
responsiveImage(imgixParams: {w: 400, h: 400, q: 60, auto: format, fit: crop, crop: focalpoint }) {
  title
  height
  width
  src
  base64
}
`;

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
      url
      alt
      ${responsiveImage}
    }
    ctaCopy1
    ctaRoute1
    title2
    copy2
    image2 {
      url
      alt
      ${responsiveImage}
    }
    ctaCopy2
    ctaRoute2
    title3
    copy3
    image3 {
      url
      alt
      ${responsiveImage}
    }
    ctaCopy3
    ctaRoute3
  }
`;

export default Trio1x1;
