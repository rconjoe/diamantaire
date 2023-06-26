import { createGlobalStyle } from 'styled-components';

// hack for styled-components to have prettier formatting :)
const styled = { createGlobalStyle };

const CssVariables = styled.createGlobalStyle`
  :root {
    --gutter: 50px;

    /* Colors */
    --color-teal: #5e7a7d;
    --color-black: #000;
    --color-white: #fff;

    /* Font Weights */
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 600;

    /* Font Sizes */
    --font-size-headline: 2rem;
    --font-size-copy: 1.9rem;
    --font-size-copy-sm: 1.7rem;
    --font-size-copy-xs: 1.4rem;
  }
`;

export { CssVariables };
