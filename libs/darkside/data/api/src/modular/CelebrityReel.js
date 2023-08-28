import { ButtonFragment } from '../fragments';

const CelebrityReel = `
  ... on ModularCelebrityReelBlockRecord {
    _modelApiKey
    id
    title
    blocks {
      _modelApiKey
      id
      title
      desktopImage {
        url
        alt
        responsiveImage (imgixParams: {w: 240, h:240, q: 30, auto: format, fit: clamp, crop: focalpoint },sizes: "240px"){
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
    }
    shouldIncludeCelebrityNames
    ctaCopy
    ctaLink
    darksideButtons {
      ${ButtonFragment}
    }
  }
`;

export default CelebrityReel;
