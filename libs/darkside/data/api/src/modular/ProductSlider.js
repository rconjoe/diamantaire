import { gql } from 'graphql-request';

const ProductSlider = gql`
... on ModularProductSliderBlockRecord {
  id
  title
  _modelApiKey
  blocks: productListItems {
    id
    title
    link
    route
    _modelApiKey
    configuration {

      ... on OmegaProductRecord {
        id
        _modelApiKey
        shopifyProductHandle

        plpImage {
          responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
          }
          alt
        }


        collection {
          ... on WeddingBandProductRecord {
            slug
            productType

          }
          ... on EngagementRingProductRecord {
            slug
            productType
          }
        }
      }
      ... on ConfigurationRecord {
        jewelryProduct {
          slug
        }
        _modelApiKey
        configuredProductOptionsInOrder
        variantId
      }
    }
  }
}
`;

export default ProductSlider;
