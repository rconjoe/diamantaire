import {
  XLDesktopAndUp,
  XXLDesktopAndUp,
  customBPAndUp,
  desktopAndUp,
  setSpace,
  tabletAndUp,
} from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularHalfBannerBlockContainer = styled.div`
  position: relative;
  &.-vertical-margins {
    margin-top: ${setSpace(1.5)};
    margin-bottom: ${setSpace(1.5)};

    ${tabletAndUp(`
      margin-top: ${setSpace(3)};
      margin-bottom: ${setSpace(3)};
    `)}
  }

  &.container-wrapper {
    padding: 0;
  }

  .half-width__image-wrapper {
    width: 100%;
    max-width: 76.7rem;
    height: auto;
    margin: auto;
    position: relative;

    ${tabletAndUp(`
    max-width: 60%;
    min-height: calc(60vw / 8 * 5);
  `)};

    ${XXLDesktopAndUp(`
    min-height: 54rem;
  `)};

    &.-left {
      ${tabletAndUp(`
      margin-left: auto;
      margin-right: 0;
    `)}
    }

    &.-right {
      ${tabletAndUp(`
      margin-right: auto;
      margin-left: 0;
    `)}
    }

    img {
      width: 100%;
    }
  }

  .half-width__middle-layer-image {
    position: absolute;
    right: 0;
    text-align: right;
    width: 100%;

    &.hearst-necklace {
      top: -6rem;

      img {
        max-width: 450px;
        margin-left: auto;
      }

      ${desktopAndUp(`
      top: -6rem;
      margin-right: 7.5rem;

      img {
        max-width: 600px;
        

      }
    `)};

      ${XLDesktopAndUp(`
      margin-right: 23rem;
      top: 2.5rem;

      img {
        max-width: 65rem;
      }
    `)};
    }
  }

  .half-width__mobile-middle-layer-image {
    position: absolute;
    right: 0;
    text-align: right;
    width: 100%;
    z-index: 1;

    &.hearst-necklace {
      top: -1.7rem;

      img {
        max-width: 16rem;
        margin-left: auto;
      }

      ${customBPAndUp(
        '475px',
        `
        top: -0.7rem;

        img {
          max-width: 25rem;
        }
      `,
      )};
    }
  }

  .half-width-banner__text {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: ${setSpace(40)};
    margin: ${setSpace(3)} auto ${setSpace(5)};

    ${tabletAndUp(`
    text-align: left;
    margin-top: 0;
    margin-bottom: ${setSpace(3.5)};
    padding: 0 ${setSpace(3)};
    padding: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    min-height: ${setSpace(28)};
  `)}

    ${desktopAndUp(`
    min-height: ${setSpace(41)};
    max-width: ${setSpace(63)};
  `)}

  &.hearst-necklace {
      ${desktopAndUp(`
      margin-top: ${setSpace(4)};
    `)}

      ${XLDesktopAndUp(`
      margin-top: ${setSpace(8)};
    `)}
    }
    &.-no-max-width {
      max-width: ${setSpace(50)};
      ${desktopAndUp(`
      max-width: none;
    `)}
    }
    &.-white {
      .primary,
      .secondary {
        ${tabletAndUp(`
        color: var(--color-white);
        border-color: var(--color-white);
      `)};

        &:hover {
          ${tabletAndUp(`
          color: var(--color-white);
          border-color: var(--color-white);
        `)}
        }
      }
    }

    &.-bg {
      max-width: ${setSpace(40)};
      background: white;
      padding: ${setSpace(3)};
      margin: 0 auto -7rem;
      position: relative;
      bottom: 7rem;

      ${tabletAndUp(`
      position: absolute;
      margin: unset;
      bottom: unset;
      max-width: ${setSpace(50)};
      padding: ${setSpace(4)} 0 ${setSpace(4)} ${setSpace(4)};
    `)};

      ${desktopAndUp(`
      max-width: ${setSpace(60)};
      padding: ${setSpace(7)};
      max-height: 50%;
    `)};

      ${XLDesktopAndUp(`
      max-width: ${setSpace(70)};
    `)};

      ${XXLDesktopAndUp(`
      max-width: 63rem;
      padding: ${setSpace(12)};
    `)};
    }

    &.-bg.-wide {
      ${tabletAndUp(`
      padding: ${setSpace(3)} 0 ${setSpace(3)} ${setSpace(3)};
      max-width: ${setSpace(60)};
    `)};

      ${desktopAndUp(`
      max-width: ${setSpace(80)};
      padding: ${setSpace(5)};
    `)};

      ${XLDesktopAndUp(`
      max-width: ${setSpace(78)};
    `)};

      ${XXLDesktopAndUp(`
      max-width: 100%;
      width: ${setSpace(90)};
      padding: ${setSpace(7)};
    `)};
    }

    &.-left {
      ${tabletAndUp(`
      left: ${setSpace(5)};
    `)};

      ${desktopAndUp(`
      left: ${setSpace(7)};
    `)};

      ${XLDesktopAndUp(`
      left: ${setSpace(15)};
    `)};
    }

    &.-right {
      ${tabletAndUp(`
      right: ${setSpace(5)};
    `)};

      ${desktopAndUp(`
      right: ${setSpace(7)};
    `)};

      ${XLDesktopAndUp(`
      right: ${setSpace(15)};
    `)};
    }

    &.-right.-bg.-wide {
      ${tabletAndUp(`
      right: ${setSpace(3)};
    `)};

      ${desktopAndUp(`
      right: ${setSpace(3)};
    `)};

      ${XLDesktopAndUp(`
      right: ${setSpace(5)};
    `)};

      ${XXLDesktopAndUp(`
      right: 0;
    `)};
    }

    &.-tall-block {
      ${tabletAndUp(`
      max-width: ${setSpace(70)};
    `)};

      ${desktopAndUp(`
      max-width: ${setSpace(70)};
    `)};
    }

    .cta {
      display: flex;
      flex-direction: column;
    }

    button {
      margin-top: ${setSpace(2)};

      ${tabletAndUp(`
      margin-top: ${setSpace(1)};
    `)};

      ${desktopAndUp(`
      margin-top: ${setSpace(2.5)};

      &.-wide-cta {
        margin-top: ${setSpace(5)};
        width: 80% !important;
      }
    `)};
    }

    .primary,
    .secondary {
      margin-bottom: 2.5rem;
    }
  }

  .half-width-banner__title {
    margin-top: ${setSpace(2)};
    margin-bottom: ${setSpace(2)};

    font-weight: 400;

    ${tabletAndUp(`
    &.-white {
      color: var(--color-white);
    }
  `)};
    ${tabletAndUp(`
    
    margin-top: 0;
  `)};

    &.-blog {
      line-height: 0;
      margin-bottom: ${setSpace(3)};
      font-size: var(--font-size-xsmall);
      font-weight: 300;
      color: var(--color-teal) !important;
    }
  }

  .half-width-banner__subtitle {
    margin-top: ${setSpace(2)};
    margin-bottom: ${setSpace(2)};
    font-size: ${setSpace(2.5)};
    font-weight: 500;
    line-height: ${setSpace(3)};

    ${tabletAndUp(`
    &.-white {
      color: var(--color-white);
    }
  `)};
    ${tabletAndUp(`
    font-size: ${setSpace(2.8)};
    margin-top: 0;
  `)};

    &.-blog {
      line-height: 0;
      margin-bottom: ${setSpace(3)};
      font-size: var(--font-size-xsmall);
      font-weight: 300;
      color: var(--color-teal) !important;
    }
  }

  .half-width-banner__copy {
    p {
      margin-bottom: 2rem;
    }

    p:last-child {
      margin-bottom: 0;
    }

    a {
      text-decoration-line: underline;
      text-decoration-style: solid;
      text-decoration-thickness: 0.1rem;
    }

    ${tabletAndUp(`
    &.-white {
      color: var(--color-white);
      border-color: var(--color-white);
      a {
        color: inherit;
      }
    }
    &.-tall-block p {
      margin-bottom: 1rem;
    }
  `)};
  }
`;
