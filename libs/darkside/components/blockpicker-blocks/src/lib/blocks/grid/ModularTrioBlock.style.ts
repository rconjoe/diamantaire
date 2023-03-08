import { setSpace, tabletAndUp, desktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularTrioBlockContainer = styled.div`
  .content-block__container {
    display: grid;

    ${tabletAndUp(`
      grid-template-columns: 1fr 1fr 1fr;
    `)};
  }

  .above-copy {
    padding: ${setSpace(4)} 0;
    text-align: center;

    ${tabletAndUp(`
    padding-bottom: ${setSpace(3)};
    padding-top: ${setSpace(6)};
    margin: auto;
    max-width: ${setSpace(60)};
  `)};
    ${desktopAndUp(`
    max-width: unset;
  `)};
  }

  .below-copy {
    padding-bottom: ${setSpace(6)};
    padding-top: ${setSpace(2)};
    text-align: center;
    max-width: 275px;
    margin: 0 auto;

    ${tabletAndUp(`
      padding: ${setSpace(6)} 0;
      max-width: unset;
    `)};
  }
`;
