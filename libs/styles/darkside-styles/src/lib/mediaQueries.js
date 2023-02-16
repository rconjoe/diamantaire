import { BP_MD, BP_LG, BP_XL, BP_XXL } from '@diamantaire/shared/constants';

export const noHoverDevice = (noHoverStyles) => {
  return `
    @media (hover: none) {
      background: inherit;
      color: inherit;
      ${noHoverStyles};
    }
  `;
};

export const XXLDesktopAndUp = (XXLDesktopAndUpStyles) => {
  return `
    @media (min-width: ${BP_XXL}) {
      ${XXLDesktopAndUpStyles};
    }
  `;
};

export const XLDesktopAndUp = (XLDesktopAndUpStyles) => {
  return `
    @media (min-width: ${BP_XL}) {
      ${XLDesktopAndUpStyles};
    }
  `;
};

export const desktopAndUp = (desktopAndUpStyles) => {
  return `@media (min-width: ${BP_LG}) {
      ${desktopAndUpStyles};
    }
    `;
};

export const tabletAndUp = (tabletAndUpStyles) => {
  return `
    @media (min-width: ${BP_MD}) {
      ${tabletAndUpStyles};
    }
  `;
};

export const mobileOnly = (mobileOnlyStyles) => {
  return `
    @media (max-width: ${calculateMaxWidthBP(BP_MD)}) {
      ${mobileOnlyStyles};
    }
  `;
};

export const customBPAndUp = (BP, customBPAndUpStyles) => {
  return `
    @media (min-width: ${BP}) {
      ${customBPAndUpStyles};
    }
  `;
};

export const customBPAndDown = (BP, customBPAndDownStyles) => {
  return `
    @media (max-width: ${calculateMaxWidthBP(BP)}) {
      ${customBPAndDownStyles};
    }
  `;
};

export const showMobileOnly = (mobileOnlyStyles) => {
  return `
    ${mobileOnlyStyles};

    @media (min-width: ${BP_MD}) {
      display: none;
    }
  `;
};

export const showTabletAndUpOnly = (tabletAndUpOnlyStyles) => {
  return `
    display: none;

    @media (min-width: ${BP_MD}) {
      display: block;

      ${tabletAndUpOnlyStyles};
    }
  `;
};

// maxWidth should be 1px smaller to account for where min-width starts
export const calculateMaxWidthBP = (BP) => {
  const num = BP.replace(/[^0-9]/g, '');

  return `${num - 1}px`;
};
