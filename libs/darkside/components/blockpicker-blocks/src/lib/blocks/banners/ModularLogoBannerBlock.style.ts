import { setSpace, mobileOnly, tabletAndUp, desktopAndUp, customBPAndDown } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularLogoBannerBlockContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 144rem;
  overflow: hidden;
  margin: 0 auto ${setSpace(1.5)};

  ${tabletAndUp(`
    margin: 0 auto ${setSpace(3)};
  `)}

  &.blog-entry, &.interstitial {
    max-width: 900px;
    margin: 0 auto;

    ${customBPAndDown(
      '144rem',
      `
        padding: 0 ${setSpace(3)};
      `,
    )};
  }

  &.interstitial {
    margin-top: 4rem;

    ${tabletAndUp(`
      margin-top: 8rem;
    `)}
  }

  .logo-banner__fw-image-container {
    width: 100%;
    max-width: 144rem;
    height: auto;
    margin: auto;

    /* set aspect ratio for logo picture */
    min-height: calc(100vw / 360 * 580);

    /* if this is in a blog post on mobile, then that calculation doesn't work */
    .blog-entry &,
    .interstitial & {
      min-height: unset;
    }

    ${tabletAndUp(`
    min-height: unset;
  `)}
  }

  .logo-banner__logo-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);

    &.is-randm-page {
      position: relative;
    }

    &.is-top-aligned {
      top: 10%;
      transform: translateY(0%);
    }

    &.is-top-aligned-mobile {
      ${mobileOnly(`
        top: 10%;
        transform: translateY(0%);
      `)}
    }
  }

  .logo-banner__logo {
    display: flex;
    justify-content: center;
    align-items: center;

    &.is-randm-page {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding-bottom: 39%;
      img {
        width: 100%;
        padding: 0 ${setSpace(2)};
      }

      ${tabletAndUp(`
        padding-bottom: 9%;
        img {
          max-width: 50rem;
        }
      `)}

      ${desktopAndUp(`
        padding-bottom: 5%;
        img {
          max-width: 65rem;
        }
      `)}
    }

    &.is-hearst-page {
      img {
        width: 100%;
        max-width: 20.6rem;

        ${tabletAndUp(`
          max-width: 50rem;
        `)}
        ${desktopAndUp(`
          max-width: 65rem;
        `)}
      }
    }
  }
`;
