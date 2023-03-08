const Duo = `
  ... on ModularDuoBlockRecord {
    id
    _modelApiKey
    title
    blurb
    blocks {
      media {
        ... on Image1x1Record {
          id
          image {
            url
            responsiveImage(imgixParams: {w: 600, q: 40, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
          title
        }
      }
      ctaRoute
    }
    additionalClass
    headingAdditionalClass
    headingType
  }
`;

export default Duo;
