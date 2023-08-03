const HalfWidthQuad = `
  ... on ModularHalfWidthQuadBlockRecord {
    id
    _modelApiKey
    desktopImage {
      url
      alt
      responsiveImage (imgixParams: {w: 384, h:461, q: 40, auto: format, fit: crop, crop: focalpoint },sizes: "(min-width: 1440px) 720px,(min-width: 768px) 50vw"){
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
      responsiveImage (imgixParams: {w: 312, h:260, q: 30, auto: format, fit: crop, crop: focalpoint },sizes: "100vw"){
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
    imageAlignment
    ctaRoute
    image1 {
      url
      alt
      responsiveImage (imgixParams: {w: 144, h:144, q: 30, auto: format, fit: crop, crop: focalpoint },sizes: "(min-width: 1440px) 568px, (min-width: 1200px) 348px, (min-width: 992px) 288px, (min-width: 768px) 208px, calc(50vw - 48px)"){
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
      responsiveImage (imgixParams: {w: 144, h:144, q: 30, auto: format, fit: crop, crop: focalpoint },sizes: "(min-width: 1440px) 568px, (min-width: 1200px) 348px, (min-width: 992px) 288px, (min-width: 768px) 208px, calc(50vw - 48px)"){
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
      responsiveImage (imgixParams: {w: 144, h:144, q: 30, auto: format, fit: crop, crop: focalpoint },sizes: "(min-width: 1440px) 568px, (min-width: 1200px) 348px, (min-width: 992px) 288px, (min-width: 768px) 208px, calc(50vw - 48px)"){
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
      responsiveImage (imgixParams: {w: 144, h:144, q: 30, auto: format, fit: crop, crop: focalpoint },sizes: "(min-width: 1440px) 568px, (min-width: 1200px) 348px, (min-width: 992px) 288px, (min-width: 768px) 208px, calc(50vw - 48px)"){
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

export default HalfWidthQuad;
