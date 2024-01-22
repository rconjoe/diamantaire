import { ButtonFragment } from '../fragments';

const ListTitle = `
  ... on ModularListTitleBlockRecord {
    id
    _modelApiKey
    title
    linkCopy
    linkRoute
    additionalClass
    showHorizontalLine
    darksideButtons {
      ${ButtonFragment}
    }
  }
`;

export default ListTitle;
