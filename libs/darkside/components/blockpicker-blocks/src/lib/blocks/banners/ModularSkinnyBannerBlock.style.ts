import { setSpace, tabletAndUp, XXLDesktopAndUp, desktopAndUp, media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularSkinnyBannerBlockContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;

  .skinny-banner__image-container {
    width: 100%;
    max-width: 144rem;
    height: auto;
    min-height: calc(100vw / 375 * 180);
    ${desktopAndUp(`
    min-height: calc(100vw / 1440 * 338);
  `)};
    ${XXLDesktopAndUp(`
    min-height: 338px;
  `)};
  }

  .skinny-banner__title-copy-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${setSpace(1)};
    text-align: center;
    align-items: center;
    height: 100%;
    margin: ${setSpace(2.5)} 0;
    ${media.small`
      color: ${(props) => props.$textColor};
      margin: 0 auto;
      text-align: left;
      position: absolute;
      top:0;
      left: 0;
      right:0;

      // additional class
      &.-center-copy {
        left: 0;
        right: 0;
        text-align: center;
      }
      &.-center-bottom {
        left: 0 !important;
        right: 0 !important;
        text-align: center !important;
        top: 85% !important;
      }
    `}

    ${desktopAndUp(`
      max-width: ${setSpace(59)};
      gap: ${setSpace(2.5)};
      margin: 0 auto;
    `)}
  }

  .skinny-banner__title {
    ${desktopAndUp(`
      &.-center-bottom {
        margin-bottom: 1rem !important;
      }
    `)};
  }

  .skinny-banner__subtitle {
    ${desktopAndUp(`
      max-width: ${setSpace(63)};
      margin: unset;
    `)};
  }

  .skinny-banner__cta {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xsmall);
    color: var(--color-teal);
    font-family: var(--font-family-main);
    text-decoration: underline;
    margin: ${setSpace(2.5)} 0;

    ${desktopAndUp(`
      color: var(--color-white);
      margin-top ${setSpace(0.5)}
  `)};
  }
`;
