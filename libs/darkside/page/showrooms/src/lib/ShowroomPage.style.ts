import { desktopAndUp, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ShowroomContainer = styled.div`
  max-width: 100vw;
  margin: 0 auto;

  ${tabletAndUp(`
    max-width: 90vw;
  `)}

  ${desktopAndUp(`
    display: flex;
    padding-top: var(--gutter);
  `)}

  .showroom__nav {
    flex: 1;
    ${desktopAndUp(`
      border-right: 1px solid #ccc;
      padding-right: var(--gutter);
  `)}
  }
  .showroom__content {
    flex: 10;
    max-width: 90vw;
    margin: 0 auto;
  }
`;
