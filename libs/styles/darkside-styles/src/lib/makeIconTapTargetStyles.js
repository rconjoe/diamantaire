const TAP_TARGET_REM = '4.2rem';

const makeIconTapTargetStyles = tapStyleConfig => {
  return `
    height: ${TAP_TARGET_REM};
    width: ${TAP_TARGET_REM};
    display: flex;
    align-items: center;
    cursor: pointer;
    ${getConditionalTapStyles(tapStyleConfig)}
  `;
};

const getConditionalTapStyles = ({
  isAlignedRight,
  isAlignedLeft,
  isAlignedCenter,
}) => {
  if (isAlignedRight) {
    return `
      svg {
        margin-left: auto;
      }
    `;
  }
  if (isAlignedLeft) {
    return 'justify-content: left;';
  }
  if (isAlignedCenter) {
    return 'justify-content: center;';
  }
};

export default makeIconTapTargetStyles;
