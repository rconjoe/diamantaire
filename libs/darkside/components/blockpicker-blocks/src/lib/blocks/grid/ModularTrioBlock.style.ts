import { setSpace, tabletAndUp, desktopAndUp, media, contentBlockMargin } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularTrioBlockContainer = styled.div`
  max-width: var(--max-width-small);
  ${contentBlockMargin}
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
    gap: 1.6rem;
    ${tabletAndUp(`
      grid-template-columns: 1fr 1fr 1fr;

    `)};
  }

  .above-copy {
    text-align: center;
    padding-bottom: ${setSpace(2)};
    ${tabletAndUp(`
    padding-bottom: ${setSpace(3)};

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
