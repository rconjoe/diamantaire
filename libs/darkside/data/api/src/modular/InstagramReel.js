const InstagramReel = `
  ... on ModularInstagramReelBlockRecord {
    _modelApiKey
    title
    subtitle
    headingType
    headingAdditionalClass
    blocks {
      id
      ... on SocialMediaContentRecord {
        image {
          url
          alt
          responsiveImage (imgixParams: {w: 300, h:300, q: 45, auto: [format, compress], fit: clamp, crop: focalpoint, dpr: 2 }){
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
        credit
        postLink
        productLink
        productRoute
        shouldLinkToVraiInstagram
      }
    }
  }
`;

export default InstagramReel;
