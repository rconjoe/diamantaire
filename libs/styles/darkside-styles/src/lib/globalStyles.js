import { css, injectGlobal } from '@emotion/css';

import { TEAL } from './colors';
import { WEDDING_TITLE_FONTS } from './fonts';
import * as mediaQueries from './mediaQueries';
import { setSpace } from './setSpace';
import { CART_DRAWER_Z_INDEX, POPUP_Z_INDEX } from './zIndexMap';

/**
 * Eventually will go truly global with typography reset
 * This will also allow us to delete a lot of the scss base
 * once this is in effect not just on HP
 * import { injectGlobal } from 'emotion';
 *
 */

// Remove !important once there are no global conflicts
export function makeFuturaPTBook() {
  return css`
    font-weight: 400 !important;
  `;
}

export function makeFuturaPTMedium() {
  return css`
    font-weight: 500 !important;
  `;
}

export function makeFuturaPTDemi() {
  return css`
    font-weight: 600 !important;
  `;
}

export const MAIN_FONT = 'futura-pt, sans-serif';
export const HEADLINE_SIZE = '2rem';
export const COPY_SIZE = '1.9rem';
export const COPY_SIZE_SMALL = '1.7rem';
export const COPY_SIZE_TINY = '1.4rem';
export const NAV_MENU_FONT_SIZE = '1.7rem';

// generic helper for the teal links that are all over the site
export function makeTealLink() {
  return css`
    ${makeFuturaPTMedium}
    font-size: ${COPY_SIZE};
    color: ${TEAL};
    font-family: ${MAIN_FONT};
    text-decoration: underline;
  `;
}

export const getGlobalStyles = () => {
  return injectGlobal`
    ${getNewGlobalTypography()}
    ${getModularHeadingStyles()}
    ${getNProgressStyles()}
    ${getExtraStyles()}
  `;
};

// any generic global styles
export function getExtraStyles() {
  return css`
    iframe#kustomer-ui-sdk-iframe {
      z-index: ${CART_DRAWER_Z_INDEX - 1} !important;
    }
    .grecaptcha-badge {
      visibility: hidden;
    }
    .ReactModalPortal {
      z-index: ${POPUP_Z_INDEX};
      position: relative;
    }
  `;
}

export function getNewGlobalTypography() {
  return css`
    .fpo-spacer {
      margin-top: ${setSpace(3)};
      margin-bottom: ${setSpace(1)};
    }
    .fpo-spacer-2 {
      margin-top: ${setSpace(1)};
      margin-bottom: ${setSpace(2)};
    }

    h1,
    h2,
    h3,
    h4,
    p,
    .p-copy,
    strong {
      letter-spacing: 0px;
      font-family: ${MAIN_FONT};
      font-style: normal;
      margin: 0;

      &.small {
        font-size: ${COPY_SIZE_SMALL};
      }
    }

    p,
    .p-copy {
      /* Body copy */
      ${makeFuturaPTBook()}
      font-size: 1.6rem;
      ${mediaQueries.tabletAndUp(css`
        font-size: ${COPY_SIZE};
      `)};
      line-height: 1.3;

      &.-medium {
        ${makeFuturaPTMedium()};
      }

      &.-bold {
        ${makeFuturaPTDemi()};
      }

      &.small {
        font-size: ${COPY_SIZE_SMALL};
      }
    }

    h1 {
      /* Main Headline */
      &.primary {
        ${makeFuturaPTBook()};
        font-size: 2.8rem;
        line-height: ${setSpace(4.5)};
        ${mediaQueries.tabletAndUp(css`
          font-size: 4.2rem;
          line-height: ${setSpace(6)};
        `)};
      }

      /* PDP Product Name / Secondary content block headline */
      &.secondary {
        ${makeFuturaPTMedium()};
        font-size: 2.2rem;
        line-height: ${setSpace(3.5)};
        ${mediaQueries.tabletAndUp(css`
          font-size: 2.8rem;
          line-height: ${setSpace(4.5)};
        `)};
      }
    }

    h2 {
      &.primary {
        ${makeFuturaPTMedium()};
        font-size: ${HEADLINE_SIZE};
        line-height: 1.3;
        ${mediaQueries.tabletAndUp(css`
          font-size: 2rem;
        `)};
      }
      /* PLP product names  */
      &.secondary {
        ${makeFuturaPTBook()};
        font-size: 1.4rem;
        line-height: ${setSpace(2)};
        &.-medium {
          ${makeFuturaPTMedium()};
        }
        &.-bold {
          ${makeFuturaPTDemi()};
        }
      }
    }

    h3 {
      /* Category headers */
      &.primary {
        ${makeFuturaPTMedium()};
        font-size: 1.4rem;
        line-height: ${setSpace(2.5)};
        text-transform: uppercase;

        &.-bold {
          ${makeFuturaPTDemi()};
        }
      }
    }

    h4,
    strong,
    p {
      /* Label text | TODO: should this be a heading? */
      &.primary {
        ${makeFuturaPTBook()};
        font-size: ${COPY_SIZE_TINY};
        line-height: 1.5;
        &.-medium {
          ${makeFuturaPTMedium()};
        }
        &.-bold {
          ${makeFuturaPTDemi()};
        }
      }
      &.secondary {
        ${makeFuturaPTBook()};
        font-size: ${COPY_SIZE_SMALL};
        line-height: 1.7;
        &.-medium {
          ${makeFuturaPTMedium()};
        }
        &.-bold {
          ${makeFuturaPTDemi()};
        }
      }
    }
    button {
      &:focus:not(:focus-visible) {
        outline: none;
      }
    }
  `;
}

export function getModularHeadingStyles() {
  return css`
    .h1 {
      &.primary {
        ${makeFuturaPTBook()};
        font-size: 2.8rem;
        line-height: ${setSpace(4.5)};
        text-transform: none;
        ${mediaQueries.tabletAndUp(css`
          font-size: 4.2rem;
          line-height: ${setSpace(6)};
        `)};
      }
      &.secondary {
        ${makeFuturaPTMedium()};
        font-size: 2.2rem;
        line-height: ${setSpace(3.5)};
        ${mediaQueries.tabletAndUp(css`
          font-size: 2.8rem;
          line-height: ${setSpace(4.5)};
        `)};
      }
    }

    .h2 {
      &.primary {
        ${makeFuturaPTMedium()};
        font-size: ${HEADLINE_SIZE};
        line-height: 1.3;
        text-transform: none;
        ${mediaQueries.tabletAndUp(css`
          font-size: 2rem;
        `)};
      }
      &.secondary {
        ${makeFuturaPTBook()};
        font-size: 1.4rem;
        line-height: ${setSpace(2)};
        &.-medium {
          ${makeFuturaPTMedium()};
        }
        &.-bold {
          ${makeFuturaPTDemi()};
        }
      }
    }

    .h3 {
      &.primary {
        ${makeFuturaPTMedium()};
        font-size: 1.4rem;
        line-height: ${setSpace(2.5)};
        text-transform: uppercase;

        &.-bold {
          ${makeFuturaPTDemi()};
        }
      }
    }

    .h4,
    .h5 {
      &.primary {
        ${makeFuturaPTBook()};
        font-size: ${COPY_SIZE_TINY};
        line-height: 1.5;
        text-transform: none;
        &.-medium {
          ${makeFuturaPTMedium()};
        }
        &.-bold {
          ${makeFuturaPTDemi()};
        }
      }
      &.secondary {
        ${makeFuturaPTBook()};
        font-size: ${COPY_SIZE_SMALL};
        line-height: 1.7;
        &.-medium {
          ${makeFuturaPTMedium()};
        }
        &.-bold {
          ${makeFuturaPTDemi()};
        }
      }
    }
  `;
}

export function getNProgressStyles() {
  // https://raw.githubusercontent.com/rstacruz/nprogress/master/nprogress.css
  return css`
    /* Make clicks pass-through */
    #nprogress {
      pointer-events: none;
    }

    #nprogress .bar {
      background: ${TEAL};

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
    }

    /* Fancy blur effect */
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${TEAL}, 0 0 5px ${TEAL};
      opacity: 1;

      -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
      transform: rotate(3deg) translate(0px, -4px);
    }
  `;
}

export const getGlobalTypography = () => {
  return css`
    h1,
    h2,
    h3 {
      letter-spacing: 0px;
      font-family: ${WEDDING_TITLE_FONTS};
      font-weight: normal;
    }

    h1 {
      font-size: ${setSpace(3.5)};
      line-height: ${setSpace(5)};

      ${mediaQueries.tabletAndUp(css`
        font-size: ${setSpace(5.25)};
        line-height: ${setSpace(6.75)};
      `)};
    }

    h2 {
      font-size: ${setSpace(3)};
      line-height: ${setSpace(4)};

      ${mediaQueries.tabletAndUp(css`
        font-size: ${setSpace(4.5)};
        line-height: ${setSpace(5)};
      `)};
    }

    h3 {
      font-size: ${setSpace(2.5)};
      line-height: ${setSpace(4)};

      ${mediaQueries.tabletAndUp(css`
        font-size: ${setSpace(3.5)};
        line-height: ${setSpace(5)};
      `)};
    }
  `;
};

export const getGlobalContainer = () => {
  return css`
    .container-emotion {
      width: 100%;
      padding-left: ${setSpace(3)};
      padding-right: ${setSpace(3)};
      margin-right: auto;
      margin-left: auto;

      ${mediaQueries.tabletAndUp(css`
        max-width: 720px;
        padding-left: initial;
        padding-right: initial;
      `)};

      ${mediaQueries.desktopAndUp(css`
        max-width: 960px;
      `)};

      ${mediaQueries.XLDesktopAndUp(css`
        max-width: 1140px;
      `)};

      ${mediaQueries.XXLDesktopAndUp(css`
        max-width: 1440px;
      `)};
    }

    // Simpler container that maxes out at 1440px then scales with the screen size
    .container-1440 {
      max-width: 1440px;
      margin: 0 auto ${setSpace(4)} auto;

      // When the user is on a screen less than 1440px, then show some padding
      ${mediaQueries.customBPAndDown(
        '1440px',
        css`
          padding-left: ${setSpace(3)};
          padding-right: ${setSpace(3)};
        `,
      )};
    }
    .okeReviews-widget-holder {
      padding: 0 30px 40px !important;

      ${mediaQueries.desktopAndUp(css`
        padding: 0 50px 50px !important;
      `)}
    }
  `;
};
