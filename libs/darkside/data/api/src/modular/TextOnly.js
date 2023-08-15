import { ButtonFragment } from '../fragments';

const TextOnly = `
  ... on ModularTextOnlyBlockRecord {
    id
    _modelApiKey
    ctaCopy
    ctaRoute
    ctaType
    ctaCopy2
    ctaRoute2
    ctaButtonType2
    desktopCopy
    mobileCopy
    copy
    title
    titleStyle
    titleFont
    additionalClass
    openInNewWindow
    headingType
    headingAdditionalClass
    darksideButtons {
      ${ButtonFragment}
    }
  }
`;

export default TextOnly;
