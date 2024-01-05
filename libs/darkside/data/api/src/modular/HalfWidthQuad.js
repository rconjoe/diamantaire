import { ButtonFragment } from '../fragments';

const HalfWidthQuad = `
  ... on ModularHalfWidthQuadBlockRecord {
    id
    _modelApiKey
    desktopImage {
      url
      alt
      responsiveImage (imgixParams: {w: 384, h:461, q: 40, auto: format, fit: crop, crop: focalpoint },sizes: "(min-width: 144rem) 720px,(min-width: 76.8rem) 50vw"){
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
      responsiveImage (imgixParams: {w: 328, h:328, q: 30, auto: format, fit: crop, crop: focalpoint },sizes: "(min-width: 144rem) 568px, (min-width: 1200px) 348px, (min-width: 992px) 28.8rem, (min-width: 76.8rem) 20.8rem, calc(50vw - 4.8rem)"){
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
      responsiveImage (imgixParams: {w: 328, h:328, q: 30, auto: format, fit: crop, crop: focalpoint },sizes: "(min-width: 144rem) 568px, (min-width: 1200px) 348px, (min-width: 992px) 28.8rem, (min-width: 76.8rem) 20.8rem, calc(50vw - 4.8rem)"){
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
      responsiveImage (imgixParams: {w: 328, h:328, q: 30, auto: format, fit: crop, crop: focalpoint },sizes: "(min-width: 144rem) 568px, (min-width: 1200px) 348px, (min-width: 992px) 28.8rem, (min-width: 76.8rem) 20.8rem, calc(50vw - 4.8rem)"){
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
      responsiveImage (imgixParams: {w: 328, h:328, q: 30, auto: format, fit: crop, crop: focalpoint },sizes: "(min-width: 144rem) 568px, (min-width: 1200px) 348px, (min-width: 992px) 28.8rem, (min-width: 76.8rem) 20.8rem, calc(50vw - 4.8rem)"){
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

export default HalfWidthQuad;
