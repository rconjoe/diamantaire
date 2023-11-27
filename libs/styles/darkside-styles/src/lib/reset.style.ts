import { createGlobalStyle } from 'styled-components';

// hack for styled-components to have prettier formatting :)
const styled = { createGlobalStyle };

const ResetStyles = styled.createGlobalStyle`
  *,
  :after,
  :before {
    box-sizing: border-box;
    border: 0 solid;
  }

  html {
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family:
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Helvetica Neue,
      Arial,
      Noto Sans,
      sans-serif,
      Apple Color Emoji,
      Segoe UI Emoji,
      Segoe UI Symbol,
      Noto Color Emoji;
    line-height: 1.5;
    tab-size: 4;
    scroll-behavior: smooth;
    overflow-x: hidden;
    width: 100%;
    /* All fonts sizes based on this: 1rem = 10px */
    font-size: 62.5%;
  }

  body {
    line-height: inherit;
    margin: 0;
    font-family: var(--font-family-main), sans-serif;
    width: 100%;
    box-sizing: border-box;
    overflow-x: clip;
  }

  a {
    text-decoration: none;
    color: #000000;
    cursor: pointer;
  }

  button:hover {
    cursor: pointer;
  }

  a.disabled {
    pointer-events: none;
  }

  div[data-lastpass-icon-root='true'] {
    display: none !important;
  }
`;

export { ResetStyles };
