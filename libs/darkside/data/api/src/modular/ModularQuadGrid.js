import { ButtonFragment } from '../fragments';

const ModularQuadGrid = `
... on ModularQuadGridRecord {
    title
    id
    _modelApiKey
    ctaButtonText
    ctaButtonUrl
    darksideButtons {
      ${ButtonFragment}
    }
    gridItems {
      itemTitle
      itemCaption
      itemUrl
      itemImage {
        url
        alt
        responsiveImage(imgixParams: {w: 400, q: 50, auto: format, fit: crop, crop: focalpoint}) {
          ...responsiveImageFragment
        }
      }
    }
  }
`;

export default ModularQuadGrid;
