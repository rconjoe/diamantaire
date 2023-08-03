const SingleMediaBlock = `
... on ModularSingleMediaBlockRecord {
    _modelApiKey
    id
    title
    headingType
    headingAdditionalClass
    copy
    media {
        url
        alt
        responsiveImage (imgixParams: { w: 1000, q: 60, auto: format }){
            ...responsiveImageFragment
        }
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
