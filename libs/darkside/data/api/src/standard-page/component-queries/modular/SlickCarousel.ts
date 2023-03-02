const SlickCarousel = `
  ... on ModularSlickCarouselBlockRecord{
    _modelApiKey
    id
    title
    blocks {
      _modelApiKey
      id
      itemName
      url
      image {
        url
        alt
        responsiveImage (imgixParams: {w: 280, q: 35, auto: format, fit: clamp, crop: focalpoint },sizes: "280px"){
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
        responsiveImage (imgixParams: {w: 280, q: 35, auto: format, fit: clamp, crop: focalpoint },sizes: "280px"){
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
