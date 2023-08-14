import Quote from './Quote';
import SingleMediaBlock from './SingleMediaBlock';

const BlockWrapper = `
... on ModularBlockWrapperRecord {
    _modelApiKey
    title
    headingType
    headingAdditionalClass
    additionalClass
    content {
        ... on ModularBlockWrapperModelContentField {
            blocks {
                ${SingleMediaBlock}
                ${Quote}
            }
        }
    }
}
`;

export default BlockWrapper;
