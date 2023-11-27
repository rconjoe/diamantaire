const CelebrityGallery = `
... on CelebrityGalleryRecord {
    _modelApiKey
    title
    celebrities {
      _modelApiKey
      id
      title
      copy
      desktopImage {
        url
        alt
        responsiveImage(
          imgixParams: {w: 500, h: 500, q: 50, auto: format, fit: clamp, crop: focalpoint}
          sizes: "50rem"
        ) {
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
      jewelry {
        ... on CelebrityJewelryRecord {
          id
          _modelApiKey
          itemName
          ctaCopy
          ctaRoute
          image {
            url
            alt
            responsiveImage(
              imgixParams: {w: 186, h: 186, q: 30, auto: format, fit: max, crop: focalpoint}
              sizes: "18.6rem"
            ) {
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
      }
    }
  }
`;

export default CelebrityGallery;
