const ListPageCreativeBlock = `
creativeBlocks {
  title
  desktopCopy
  mobileCopy
  ctaCopy
  ctaRoute
  desktopImage {
      url
      alt
      responsiveImage(imgixParams: {w: 666, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
          ...responsiveImageFragment
      }
  }
  mobileImage {
      url
      alt
      responsiveImage(imgixParams: {w: 375, q: 55, auto: [format, compress], fit: crop, crop: focalpoint }) {
          ...responsiveImageFragment
      }
  }
  supportedCountries {
      code
  }
  gtmClass
  openInNewTab
  configurationsInOrder {
      ... on OmegaProductRecord {
          collection {
              ... on WeddingBandProductRecord {
                  slug
                  productType
                  subCategory {
                      slug
                      title
                  }
              }
              ... on EngagementRingProductRecord {
                  slug
                  productType
                  subCategory {
                      slug
                      title
                  }
              }
          }
          shopifyProductHandle
          _modelApiKey
          plpTitle
      }
      ... on ConfigurationRecord {
          jewelryProduct {
              slug
              category
              subCategory {
                  slug
                  title
              }
              productLabel {
                  title
              }
              productAccordionSpecsLabel {
                  productType
              }
          }
          plpImage {
              responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
                  ...responsiveImageFragment
              }
          }
          plpImageHover {
              responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
                  ...responsiveImageFragment
              }
          }
          plpTitle
          configuredProductOptionsInOrder
          variantId
          _modelApiKey
      }
  }
}
`;

export default ListPageCreativeBlock;
