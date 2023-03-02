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
      responsiveImage(imgixParams: {w: 864, h: 540, q: 40, auto: format, fit: crop, crop: focalpoint }, sizes:"(min-width: 1440px) 864px, (min-width: 768px) 60vw") {
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
    mobileImage {
      url
      alt
      responsiveImage (imgixParams: {w: 360, h:300, q: 35, auto: format, fit: clamp, crop: focalpoint }, sizes:"100vw"){
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
    textBlockAlignment
    additionalClass
  }
`;

export default HalfWidthBlogSummary;
