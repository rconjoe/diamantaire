import { gql } from 'graphql-request';

const CelebrityGallery = gql`
... on CelebrityGalleryRecord {
    _modelApiKey
    title
    celebrities {
      _modelApiKey
      id
      title
      copy
      disableProductCtas
      desktopImage {
        url
        alt
        responsiveImage(
          imgixParams: {w: 500, h: 500, q: 50, auto: [format, compress], fit: clamp, crop: focalpoint}
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
          newRoute
          image {
            url
            alt
            responsiveImage(
              imgixParams: {w: 186, h: 186, q: 30, auto: [format, compress], fit: max, crop: focalpoint}
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
      darksideCelebrityJewelryConfigurations {
          id
          _modelApiKey
          variantId
          plpImage {
            url
            alt
            responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
            alt
          }
          jewelryProduct {
              productTitle
            }
      }
    }
  }
`;

export default CelebrityGallery;
