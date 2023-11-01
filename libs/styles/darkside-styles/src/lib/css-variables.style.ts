import { createGlobalStyle } from 'styled-components';

// hack for styled-components to have prettier formatting :)
const styled = { createGlobalStyle };

const CssVariables = styled.createGlobalStyle`
  :root {
    --gutter: 5rem;
    --space-gutter: 0.8rem;
    --toastify-toast-width: 400px;
    --toastify-color-progress-light: #719093;

    /* Colors */
    --color-teal: #719093;
    --color-black: #000;
    --color-white: #fff;
    --color-lightest-grey: #f7f7f7;
    --color-lighter-grey: #eaeaea;
    --color-light-grey: #dcdbd5;
    --color-dark-grey: #737368;
    --color-grey: #979797;
    --color-header-bg: #faf9f7;
    --color-error-red: #d0021b;

    /* Font Weights */
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 600;

    /* Font Sizes */
    --font-size-xxlarge: 4.2rem;
    --font-size-xlarge: 3.2rem;
    --font-size-large: 2.8rem;
    --font-size-medium: 2.4rem;
    --font-size-small: 2.2rem;
    --font-size-xsmall: 1.8rem;
    --font-size-xxsmall: 1.6rem;
    --font-size-xxxsmall: 1.4rem;
    --font-size-xxxxsmall: 1.2rem;
    --font-size-xxxxxsmall: 1rem;

    /* Font Family */
    --font-family-main: 'futura-pt', sans-serif;

    /* Metals - Finish */
    --metal-yellow-gold: #f9d857;
    --metal-rose-gold: #f9d857;

    /* Z Index */
    --z-index-nav: 40;
  }
`;

export { CssVariables };
