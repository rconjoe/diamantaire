// BP = Break Points
export const BP_XS = '0px';
export const BP_SM = '576px';
export const BP_MD = '768px';
export const BP_LG = '992px';
export const BP_XL = '1200px';
export const BP_XXL = '1441px';
export const BP_XXXL = '1600px';

export const noHoverDevice = (noHoverStyles = '') => {
  return `
    @media (hover: none) {
      background: inherit;
      color: inherit;
      ${noHoverStyles};
    }
  `;
};

export const XXLDesktopAndUp = (XXLDesktopAndUpStyles = '') => {
  return `
    @media (min-width: ${BP_XXL}) {
      ${XXLDesktopAndUpStyles};
    }
  `;
};

export const XLDesktopAndUp = (XLDesktopAndUpStyles = '') => {
  return `
    @media (min-width: ${BP_XL}) {
      ${XLDesktopAndUpStyles};
    }
  `;
};

export const desktopAndUp = (desktopAndUpStyles = '') => {
  return `@media (min-width: ${BP_LG}) {
      ${desktopAndUpStyles};
    }
    `;
};

export const tabletAndUp = (tabletAndUpStyles = '') => {
  return `
    @media (min-width: ${BP_MD}) {
      ${tabletAndUpStyles};
    }
  `;
};

export const mobileOnly = (mobileOnlyStyles = '') => {
  return `
    @media (max-width: ${calculateMaxWidthBP(BP_MD)}) {
      ${mobileOnlyStyles};
    }
  `;
};

export const customBPAndUp = (BP: string, customBPAndUpStyles = '') => {
  return `
    @media (min-width: ${BP}) {
      ${customBPAndUpStyles};
    }
  `;
};

export const customBPAndDown = (BP: string, customBPAndDownStyles = '') => {
  return `
    @media (max-width: ${calculateMaxWidthBP(BP)}) {
      ${customBPAndDownStyles};
    }
  `;
};

export const showMobileOnly = (mobileOnlyStyles = '') => {
  return `
    ${mobileOnlyStyles};

    @media (min-width: ${BP_MD}) {
      display: none;
    }
  `;
};

export const showTabletAndUpOnly = (tabletAndUpOnlyStyles = '') => {
  return `
    display: none;

    @media (min-width: ${BP_MD}) {
      display: block;

      ${tabletAndUpOnlyStyles};
    }
  `;
};

// maxWidth should be 1px smaller to account for where min-width starts
export const calculateMaxWidthBP = (BP: string) => {
  const num = BP.replace(/[^0-9]/g, '');

  return `${parseInt(num, 10) - 1}px`;
};
