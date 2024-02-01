import {
  setSpace,
  tabletAndUp,
  mobileOnly,
  XXLDesktopAndUp,
  media,
  contentBlockTitle,
  contentBlockMargin,
} from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const MINI_BANNER_IMAGE_WIDTH = 'var(--max-width-small)';

export const ModularContentQuadBlockContainer = styled.div`
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  position: relative;
  display: block;
  ${contentBlockMargin}
  ${tabletAndUp(`
    padding-left: 0;
    padding-right: 0;

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
      ${contentBlockTitle}
    }
  }

  .content-block__subtitle {
    font-size: 1.6rem;
    margin-top: 1rem;
  }

  .content-block__container {
    display: grid;
    max-width: ${MINI_BANNER_IMAGE_WIDTH};
    margin: auto;
    grid-gap: 1rem;

    ${tabletAndUp(`
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 2rem;
    `)};
    ${mobileOnly(`
      grid-template-columns: 1fr 1fr;
    `)};
  }

  .image-tile__container {
    margin: 0;
    padding: 0;
    .button-style--underline {
      button,
      a {
        font-size: 1.6rem;
        ${media.medium`font-size: 1.8rem;`}
      }
    }

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
        margin: 0 0 2rem;
      `,
      )}
    }
  }
`;
