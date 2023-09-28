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
      responsiveImage(imgixParams: {w: 400, q: 80, auto: format, fit: crop, crop: focalpoint }) {
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
    image2 {
      url
      alt
      responsiveImage(imgixParams: {w: 400, q: 80, auto: format, fit: crop, crop: focalpoint }) {
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
    image3 {
      url
      alt
      responsiveImage(imgixParams: {w: 400, q: 80, auto: format, fit: crop, crop: focalpoint }) {
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
    image4 {
      url
      alt
      responsiveImage(imgixParams: {w: 400, q: 80, auto: format, fit: crop, crop: focalpoint }) {
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
  }
`;

export default Quad;
