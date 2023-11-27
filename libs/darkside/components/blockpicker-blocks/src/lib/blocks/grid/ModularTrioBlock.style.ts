import { setSpace, tabletAndUp, desktopAndUp, media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularTrioBlockContainer = styled.div`
  &.trio-svg {
    .content-block__container {
      img {
        max-width: 12.5rem;
        margin: 0 auto;
      }
      /* ImageTile */
      > * {
        ${media.medium`max-width: 20rem;margin: 0 auto;`}
      }
    }
  }
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
    max-width: 27.5rem;
    margin: 0 auto;

    ${tabletAndUp(`
      padding: ${setSpace(6)} 0;
      max-width: unset;
    `)};
  }
`;
