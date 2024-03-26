import { ButtonFragment } from '../fragments';

const SlickCarousel = `
  ... on ModularSlickCarouselBlockRecord{
    _modelApiKey
    id
    title
    darksideButtons {
      ${ButtonFragment}
    }
    blocks {
      _modelApiKey
      id
      itemName
      url
      image {
        url
        alt
        responsiveImage (imgixParams: {w: 280, q: 30, auto: [format, compress], fit: clamp, crop: focalpoint },sizes: "28rem"){
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
        width
        height
      }
    }
    blocksDesktop {
      _modelApiKey
      id
      itemName
      url
      image {
        url
        alt
        responsiveImage (imgixParams: {w: 280, q: 30, auto: [format, compress], fit: clamp, crop: focalpoint },sizes: "28rem"){
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
        width
        height
      }
    }
    ctaCopy
    ctaLink
    additionalClass
  }
`;

export default SlickCarousel;
