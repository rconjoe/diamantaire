const ModularQuadGrid = `
... on ModularQuadGridRecord {
    title
    id
    _modelApiKey
    ctaButtonText
    ctaButtonUrl
    gridItems {
      itemTitle
      itemUrl
      itemCaption
      itemImage {
        url
        alt
        responsiveImage(imgixParams: {w: 300, q: 35, auto: format, fit: crop, crop: focalpoint}) {
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
      }
    }
  }
`;

export default ModularQuadGrid;
