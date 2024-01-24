import { createGlobalStyle } from 'styled-components';

export const FreezeBody = createGlobalStyle`
  body, html {
    overflow: clip;
  }
`;
