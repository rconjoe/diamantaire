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
        responsiveImage (imgixParams: {w: 240, h:240, q: 45, auto: format, fit: clamp, crop: focalpoint },sizes: "240px"){
            src
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            title
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
