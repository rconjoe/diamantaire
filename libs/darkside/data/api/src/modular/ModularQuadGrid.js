const ModularQuadGrid = `
... on ModularQuadGridRecord {
    title
    id
    _modelApiKey
    ctaButtonText
    ctaButtonUrl
    gridItems {
      itemTitle
      itemCaption
      itemUrl
      itemImage {
        url
        alt
        responsiveImage(imgixParams: {w: 300, q: 35, auto: format, fit: crop, crop: focalpoint}) {
          ...responsiveImageFragment
        }
      }
    }
  }
`;

export default ModularQuadGrid;
