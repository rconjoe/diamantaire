import { createGlobalStyle } from 'styled-components';

import { LAYOUT_WIDTH_LG, LAYOUT_WIDTH_MD, LAYOUT_WIDTH_SM, LAYOUT_WIDTH_XL, LAYOUT_WIDTH_XXL } from './layout';
import * as mediaQueries from './mediaQueries';
import { setSpace } from './setSpace';
import { CART_DRAWER_Z_INDEX, POPUP_Z_INDEX } from './zIndexMap';

// hack for styled-components to have prettier formatting :)
const styled = { createGlobalStyle };

export const CssHelpers = styled.createGlobalStyle`
  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: auto;
  }

  button:hover {
    cursor: pointer;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .flex {
    display: flex;
  }

  .align-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-flex-end {
    justify-content: flex-end;
  }

  .justify-space-between {
    justify-content: space-between;
  }

  .list-unstyled {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .no-margin {
    margin: 0;
  }

  .font-medium {
    font-weight: var(--font-weight-medium);
  }

  .container-wrapper {
    width: ${LAYOUT_WIDTH_SM};
    padding-left: ${setSpace(3)};
    padding-right: ${setSpace(3)};
    margin-right: auto;
    margin-left: auto;

    ${mediaQueries.tabletAndUp(`
        max-width: ${LAYOUT_WIDTH_MD};
        padding-left: initial;
        padding-right: initial;
    `)};

    ${mediaQueries.desktopAndUp(`
        max-width: ${LAYOUT_WIDTH_LG};
    `)};

    ${mediaQueries.XLDesktopAndUp(`
        max-width: ${LAYOUT_WIDTH_XL};
    `)};

    ${mediaQueries.XXLDesktopAndUp(`
        max-width: ${LAYOUT_WIDTH_XXL};
    `)};
  }

  .okeReviews-widget-holder {
    padding: 0 3rem 4rem !important;

    ${mediaQueries.desktopAndUp(`
        padding: 0 5rem 5rem !important;
    `)}
  }

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

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: var(--color-teal);

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 0.2rem;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 10rem;
    height: 100%;
    box-shadow:
      0 0 1rem var(--color-teal),
      0 0 0.5rem var(--color-teal);
    opacity: 1;

    -webkit-transform: rotate(3deg) translate(0px, -0.4rem);
    -ms-transform: rotate(3deg) translate(0px, -0.4rem);
    transform: rotate(3deg) translate(0px, -0.4rem);
  }
`;
