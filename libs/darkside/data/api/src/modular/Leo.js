const Leo = `
  ... on ModularLeoBlockRecord {
    _modelApiKey
    id
    copy
    title
    image {
      url
      alt
      responsiveImage (imgixParams: {w: 280, q: 80, auto: format },sizes: "140px"){
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
`;

export default Leo;
