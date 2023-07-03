import { createGlobalStyle } from 'styled-components';

// hack for styled-components to have prettier formatting :)
const styled = { createGlobalStyle };

const CssVariables = styled.createGlobalStyle`
  :root {
    --gutter: 5rem;

    /* Colors */
    --color-teal: #5e7a7d;
    --color-black: #000;
    --color-white: #fff;
    --color-light-grey: #f7f7f7;
    --color-grey: #ccc;

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
  }
`;

export { CssVariables };
