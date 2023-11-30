import { responsiveImage } from './ResponsiveImage';

const Leo = `
  ... on ModularLeoBlockRecord {
    _modelApiKey
    id
    copy
    title
    image {
      ${responsiveImage(130, 95)}
    }
  }
`;

export default Leo;
