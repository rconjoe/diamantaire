import { setSpace, tabletAndUp, mobileOnly, XXLDesktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const MINI_BANNER_IMAGE_WIDTH = '1180px';

export const ModularContentQuadBlockContainer = styled.div`
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  position: relative;
  display: block;
  margin: 50px 0;

  ${tabletAndUp(`
    padding-left: 0;
    padding-right: 0;
    margin: 80px 0;
  `)};

  .content-block__layout {
    position: relative;
    padding: 0;

    ${tabletAndUp(`
    padding: 0 ${setSpace(3)}
  `)}

    ${XXLDesktopAndUp(`
    padding: 0;
  `)}
  }

  .content-block__title {
    position: relative;
    text-align: center;
    margin: ${setSpace(3)} 0;
    ${tabletAndUp(`
      margin: ${setSpace(3)} 0 ${setSpace(6)} 0;
    `)}
    &.-no-margin {
      margin: 0;
    }
    &.-no-margin-top {
      margin-top: 0;
    }
    .primary {
      font-weight: 400 !important;
      line-height: 3.6rem;
      font-size: 3.2rem;

      ${XXLDesktopAndUp(`
      font-size: 4.2rem;
      line-height: 4.8rem;
    `)}
    }
  }

  .content-block__subtitle {
    font-size: 16px;
    margin-top: 10px;
  }

  .content-block__container {
    display: grid;
    max-width: ${MINI_BANNER_IMAGE_WIDTH};
    margin: auto;
    grid-gap: 10px;

    ${tabletAndUp(`
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 20px;
    `)};
    ${mobileOnly(`
      grid-template-columns: 1fr 1fr;
    `)};
  }

  .image-tile__container {
    margin: 0;
    padding: 0;

    ${mobileOnly(`
    &:nth-child(odd) {
      margin: 0 ${setSpace(1.5)} 0 0;
    }
    &:nth-child(even) {
      margin: 0 0 0 ${setSpace(1.5)};
    }
  `)};
    &.-modular-content-quad-block {
      ${mobileOnly(
        `
        margin: 0;
      `,
      )}
    }
  }
`;
