import { ButtonFragment } from '../fragments';

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
          responsiveImage (imgixParams: {w: 300, h:300, q: 45, auto: format, fit: clamp, crop: focalpoint, dpr: 2 }){
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
        shouldLinkToVraiInstagram
        darksideButtons {
            ${ButtonFragment}
          }
      }
    }
  }
`;

export default InstagramReel;
