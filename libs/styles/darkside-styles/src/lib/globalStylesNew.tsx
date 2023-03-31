import { createGlobalStyle } from 'styled-components';

import { TEAL } from './colors';
import * as mediaQueries from './mediaQueries';
import { setSpace } from './setSpace';
import { CART_DRAWER_Z_INDEX, POPUP_Z_INDEX } from './zIndexMap';

// for ref only
// export function makeFuturaPTBook() {
//   return css`
//     font-weight: 400 !important;
//   `;
// }

// export function makeFuturaPTMedium() {
//   return css`
//     font-weight: 500 !important;
//   `;
// }

// export function makeFuturaPTDemi() {
//   return css`
//     font-weight: 600 !important;
//   `;
// }

export const NORMAL_FONT_WEIGHT = '400 !important';
export const MEDIUM_FONT_WEIGHT = '500 !important';
export const BOLD_FONT_WEIGHT = '600 !important';

export const MAIN_FONT = 'futura-pt, sans-serif';
export const HEADLINE_SIZE = '2rem';
export const COPY_SIZE = '1.9rem';
export const COPY_SIZE_SMALL = '1.7rem';
export const COPY_SIZE_TINY = '1.4rem';
export const NAV_MENU_FONT_SIZE = '1.7rem';

export function makeTealLink() {
  return `
    font-weight: ${MEDIUM_FONT_WEIGHT};
    font-size: ${COPY_SIZE};
    color: ${TEAL};
    font-family: ${MAIN_FONT};
    text-decoration: underline;
  `;
}

const GetGlobalTypography = createGlobalStyle`


   .fpo-spacer {
      margin-top: ${setSpace(3)};
      margin-bottom: ${setSpace(1)};
    }
    .fpo-spacer-2 {
      margin-top: ${setSpace(1)};
      margin-bottom: ${setSpace(2)};
    }


    /* let's standardize heading sizes here */
    h3 {
      font-size: 2.2rem;
    }

    h1,
    h2,
    h3,
    h4,
    p,
    .p-copy,
    button,
    input,
    textarea,
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
      font-weight: ${NORMAL_FONT_WEIGHT};
      font-size: 1.6rem;
      ${mediaQueries.tabletAndUp(`
        font-size: ${COPY_SIZE};
      `)};
      line-height: 1.3;

      &.-medium {
        font-weight: ${MEDIUM_FONT_WEIGHT};
      }
      
      &.-bold {
        font-weight: ${BOLD_FONT_WEIGHT};
      }

      &.small {
        font-size: ${COPY_SIZE_SMALL};
      }
    }

    h1 {
      /* Main Headline */
      &.primary {
        font-weight: ${NORMAL_FONT_WEIGHT};
        font-size: 2.8rem;
        line-height: ${setSpace(4.5)};
        ${mediaQueries.tabletAndUp(`
          font-size: 4.2rem;
          line-height: ${setSpace(6)};
        `)};
      }

      /* PDP Product Name / Secondary content block headline */
      &.secondary {
        font-weight: ${MEDIUM_FONT_WEIGHT};
        font-size: 2.2rem;
        line-height: ${setSpace(3.5)};
        ${mediaQueries.tabletAndUp(`
          font-size: 2.8rem;
          line-height: ${setSpace(4.5)};
        `)};
      }
    }

    h2 {
      &.primary {
        font-weight: ${MEDIUM_FONT_WEIGHT};
        font-size: ${HEADLINE_SIZE};
        line-height: 1.3;
        ${mediaQueries.tabletAndUp(`
          font-size: 2rem;
        `)};
      }
      /* PLP product names  */
      &.secondary {
        font-weight: ${NORMAL_FONT_WEIGHT};
        font-size: 1.4rem;
        line-height: ${setSpace(2)};
        &.-medium {
          font-weight: ${MEDIUM_FONT_WEIGHT};
        }
        &.-bold {
          font-weight: ${BOLD_FONT_WEIGHT};
        }
      }
    }

    h3 {
      /* Category headers */
      &.primary {
        font-weight: ${MEDIUM_FONT_WEIGHT};
        font-size: 1.4rem;
        line-height: ${setSpace(2.5)};
        text-transform: uppercase;

        &.-bold {
          font-weight: ${BOLD_FONT_WEIGHT};
        }
      }
    }

    h4,
    strong,
    p {
      /* Label text | TODO: should this be a heading? */
      &.primary {
        font-weight: ${MEDIUM_FONT_WEIGHT};
        font-size: ${COPY_SIZE_TINY};
        line-height: 1.5;
        &.-medium {
          font-weight: ${MEDIUM_FONT_WEIGHT}
        }
        &.-bold {
          font-weight: ${BOLD_FONT_WEIGHT};
        }
      }
      &.secondary {
        font-weight: ${MEDIUM_FONT_WEIGHT};
        font-size: ${COPY_SIZE_SMALL};
        line-height: 1.7;
        &.-medium {
          font-weight: ${MEDIUM_FONT_WEIGHT};
        }
        &.-bold {
          font-weight: ${BOLD_FONT_WEIGHT};
        }
      }
    }
    button {
      &:focus:not(:focus-visible) {
        outline: none;
      }
    }
  `;

const GetModularHeadingStyles = createGlobalStyle`
    .h1 {
      &.primary {
        font-weight: ${NORMAL_FONT_WEIGHT};
        font-size: 2.8rem;
        line-height: ${setSpace(4.5)};
        text-transform: none;
        ${mediaQueries.tabletAndUp(`
          font-size: 4.2rem;
          line-height: ${setSpace(6)};
        `)};
      }
      &.secondary {
        font-weight: ${MEDIUM_FONT_WEIGHT};
        font-size: 2.2rem;
        line-height: ${setSpace(3.5)};
        ${mediaQueries.tabletAndUp(`
          font-size: 2.8rem;
          line-height: ${setSpace(4.5)};
        `)};
      }
    }

    .h2 {
      &.primary {
        font-weight: ${MEDIUM_FONT_WEIGHT};
        font-size: ${HEADLINE_SIZE};
        line-height: 1.3;
        text-transform: none;
        ${mediaQueries.tabletAndUp(`
          font-size: 2rem;
        `)};
      }
      &.secondary {
        font-weight: ${MEDIUM_FONT_WEIGHT};
        font-size: 1.4rem;
        line-height: ${setSpace(2)};
        &.-medium {
          font-weight: ${MEDIUM_FONT_WEIGHT};
        }
        &.-bold {
          font-weight: ${BOLD_FONT_WEIGHT};
        }
      }
    }

    .h3 {
      &.primary {
        font-weight: ${MEDIUM_FONT_WEIGHT};
        font-size: 1.4rem;
        line-height: ${setSpace(2.5)};
        text-transform: uppercase;

        &.-bold {
          font-weight: ${BOLD_FONT_WEIGHT};
        }
      }
    }

    .h4,
    .h5 {
      &.primary {
        font-weight: ${MEDIUM_FONT_WEIGHT};
        font-size: ${COPY_SIZE_TINY};
        line-height: 1.5;
        text-transform: none;
        &.-medium {
          font-weight: ${MEDIUM_FONT_WEIGHT};
        }
        &.-bold {
          font-weight: ${BOLD_FONT_WEIGHT};
        }
      }
      &.secondary {
        font-weight: ${MEDIUM_FONT_WEIGHT};
        font-size: ${COPY_SIZE_SMALL};
        line-height: 1.7;
        &.-medium {
          font-weight: ${MEDIUM_FONT_WEIGHT};
        }
        &.-bold {
          font-weight: ${BOLD_FONT_WEIGHT};
        }
      }
    }
  `;

export const GetNProgressStyles = createGlobalStyle`
  
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

const GetExtraStyles = createGlobalStyle`
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

const GlobalContainer = createGlobalStyle`
img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: auto;
}
.text-center {
  text-align: center;
}
.container-emotion {
      width: 100%;
      padding-left: ${setSpace(3)};
      padding-right: ${setSpace(3)};
      margin-right: auto;
      margin-left: auto;

      ${mediaQueries.tabletAndUp(`
        max-width: 720px;
        padding-left: initial;
        padding-right: initial;
      `)};

      ${mediaQueries.desktopAndUp(`
        max-width: 960px;
      `)};

      ${mediaQueries.XLDesktopAndUp(`
        max-width: 1140px;
      `)};

      ${mediaQueries.XXLDesktopAndUp(`
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
        `
          padding-left: ${setSpace(3)};
          padding-right: ${setSpace(3)};
        `,
      )};
    }
    .okeReviews-widget-holder {
      padding: 0 30px 40px !important;

      ${mediaQueries.desktopAndUp(`
        padding: 0 50px 50px !important;
      `)}
    }
  `;

export const GlobalStyles = () => {
  return (
    <>
      <GetGlobalTypography />
      <GetModularHeadingStyles />
      <GetNProgressStyles />
      <GlobalContainer />
      <GetExtraStyles />
    </>
  );
};
