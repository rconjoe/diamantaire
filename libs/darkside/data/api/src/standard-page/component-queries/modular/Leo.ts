const Leo = `
  ... on ModularLeoBlockRecord {
    _modelApiKey
    id
    copy
    title
    image {
      url
      alt
      responsiveImage(imgixParams: {w: 350, q: 40, auto: format, fit: crop, crop: focalpoint }) {
        ...responsiveImageFragment
      }
    }
  }
`;

export default Leo;
