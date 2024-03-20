const GridCarousel = `
... on ModularGridCarouselBlockRecord {
  _modelApiKey
  id
  title
  subtitle
  headingType
  headingAdditionalClass
  additionalClass  
  blocks {
    _modelApiKey
    id
    title
    link
    desktopImage {
      url
      alt
      responsiveImage(imgixParams: {w: 592, q: 40, auto: [format, compress], fit: crop, crop: focalpoint}, sizes: "(min-width: 144rem) 144rem, (min-width: 76.8rem) 100vw") {
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
      responsiveImage(imgixParams: {w: 482, q: 30, auto: [format, compress], fit: crop, crop: focalpoint}, sizes: "100vw") {
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
    supportedCountries {
      code
      name
    }
  }
}
`;

export default GridCarousel;
