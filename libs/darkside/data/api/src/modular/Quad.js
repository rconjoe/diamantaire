import { ButtonFragment } from '../fragments';

const Quad = `
  ... on ModularQuadBlockRecord {
    id
    _modelApiKey
    title
    subtitle
    aboveCopy
    belowCopy
    image1 {
      url
      alt
      responsiveImage(imgixParams: {w: 400, q: 80, auto: [format, compress], fit: crop, crop: focalpoint }) {
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
    title1
    copy1
    ctaCopy1
    ctaRoute1
    darksideButtons1 {
      ${ButtonFragment}
    }
    image2 {
      url
      alt
      responsiveImage(imgixParams: {w: 400, q: 80, auto: [format, compress], fit: crop, crop: focalpoint }) {
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
    title2
    copy2
    ctaCopy2
    ctaRoute2
    darksideButtons2 {
      ${ButtonFragment}
    }
    image3 {
      url
      alt
      responsiveImage(imgixParams: {w: 400, q: 80, auto: [format, compress], fit: crop, crop: focalpoint }) {
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
    title3
    copy3
    ctaCopy3
    ctaRoute3
    darksideButtons3 {
      ${ButtonFragment}
    }
    image4 {
      url
      alt
      responsiveImage(imgixParams: {w: 400, q: 80, auto: [format, compress], fit: crop, crop: focalpoint }) {
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
    title4
    copy4
    ctaCopy4
    ctaRoute4
    darksideButtons4 {
      ${ButtonFragment}
    }
  }
`;

export default Quad;
