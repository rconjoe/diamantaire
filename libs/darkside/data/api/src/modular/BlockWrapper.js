import SingleMediaBlock from './SingleMediaBlock';
import Quote from './Quote';

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
