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
      responsiveImage(imgixParams: {w: 592, q: 40, auto: format, fit: crop, crop: focalpoint}, sizes: "(min-width: 1440px) 1440px, (min-width: 768px) 100vw") {
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
      responsiveImage(imgixParams: {w: 482, q: 35, auto: format, fit: crop, crop: focalpoint}, sizes: "100vw") {
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
