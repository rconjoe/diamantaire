const ProductSlider = `
... on ModularProductSliderBlockRecord {
  id
  title
  _modelApiKey
  productListItems {
    id
    title
    link
    _modelApiKey
    configuration {
      ... on OmegaProductRecord {
        id
        _modelApiKey
        shopifyProductHandle
        collection {
          ... on WeddingBandProductRecord {
            slug
          }
          ... on EngagementRingProductRecord {
            slug
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
