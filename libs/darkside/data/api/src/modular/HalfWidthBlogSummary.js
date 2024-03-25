const HalfWidthBlogSummary = `
  ... on ModularHalfWidthBlogSummaryBlockRecord {
    id
    _modelApiKey
    blogPost {
      id
      _modelApiKey
      slug
      title
      excerpt
    }
    title
    ctaCopy
    desktopImage {
      url
      alt
      responsiveImage(imgixParams: {w: 864, h: 540, q: 40, auto: [format, compress], fit: crop, crop: focalpoint }, sizes:"(min-width: 144rem) 864px, (min-width: 76.8rem) 60vw") {
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
    mobileImage {
      url
      alt
      responsiveImage (imgixParams: {w: 360, h:300, q: 30, auto: [format, compress], fit: clamp, crop: focalpoint }, sizes:"100vw"){
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
    textBlockAlignment
    additionalClass
  }
`;

export default HalfWidthBlogSummary;
