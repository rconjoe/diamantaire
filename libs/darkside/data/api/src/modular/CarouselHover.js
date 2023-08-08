const CarouselHover = `
  ... on ModularCarouselHoverBlockRecord{
    _modelApiKey
    id
    title
    additionalClass
    blocks {
      _modelApiKey
      id
      title
      url
      image {
        url
        alt
        width
        height
        responsiveImage (imgixParams: {w: 400, h: 400, auto: format, fit: crop}) {
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
      hover {
        url
        alt
        width
        height
        responsiveImage (imgixParams: {w: 400, h: 400, auto: format, fit: crop}) {
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
        video {
          streamingUrl
        }
      }
    }
  }
`;

export default CarouselHover;
