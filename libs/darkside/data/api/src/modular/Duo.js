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
