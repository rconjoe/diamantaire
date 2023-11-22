import { desktopAndUp, setSpace, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularTrioStaggeredBlockContainer = styled.div`
  .trio-block__above-copy {
    padding: ${setSpace(4)} 0;
    text-align: center;

    ${tabletAndUp(`
      padding-bottom: 0;
      padding-top: ${setSpace(6)};
      margin: auto;
      max-width: ${setSpace(60)};
    `)};
    ${desktopAndUp(`
      max-width: unset;
    `)};
  }

  .trio-block__below-copy {
    padding-bottom: ${setSpace(6)};
    padding-top: ${setSpace(2)};
    text-align: center;
    max-width: 27.5rem;
    margin: 0 auto;

    ${tabletAndUp(`
      padding: ${setSpace(6)} 0;
      max-width: unset;
    `)};
  }

  .trio-block__content-block-container {
    display: flex;
    flex-direction: column;
    padding: 0 ${setSpace(3)};
    margin-top: ${setSpace(3)};

    ${tabletAndUp(`
      display: grid;
      padding: unset;
      grid-template-columns: 1fr 1fr 1fr;
    `)};
  }

  .trio-block__tile-wrapper {
    width: 100%;
    display: flex;

    &.-end {
      justify-content: flex-end;
    }

    & > div {
      width: 60%;
    }

    ${tabletAndUp(`
      display: block;

      aspect-ratio: 218 / 281;

      & > div {
        width: 100%;
      }
    `)};
  }
`;
