const InstagramReel = `
  ... on ModularInstagramReelBlockRecord {
    _modelApiKey
    title
    subtitle
    headingType
    headingAdditionalClass
    blocks {
      id
      image {
        url
        alt
        responsiveImage (imgixParams: {w: 300, h:300, q: 45, auto: format, fit: clamp, crop: focalpoint }){
            src
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            srcSet
            title
            webpSrcSet
            width
        }
      }
      postLink
      productLink
      shouldLinkToVraiInstagram
    }
  }
`;

export default InstagramReel;
