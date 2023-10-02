import { createGlobalStyle } from 'styled-components';

const HideTopBar = createGlobalStyle`
  #top-bar {
    display: none;
  }
`;

export default HideTopBar;

export { HideTopBar };
