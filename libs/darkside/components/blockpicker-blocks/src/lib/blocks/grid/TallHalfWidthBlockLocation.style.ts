import {
  setSpace,
  mobileOnly,
  tabletAndUp,
  desktopAndUp,
  XLDesktopAndUp,
  XXLDesktopAndUp,
} from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const TallHalfWidthBlockLocationCTAContainer = styled.div`
  position: relative;
  max-width: var(--max-width-small);
  margin: 0 auto;
  margin-bottom: 8rem;

  &.-vertical-margins {
    margin: 5rem auto;
    ${tabletAndUp(`
    margin: 8rem auto;
    width: 100%;
    padding: 0 2.4rem;
  `)}
    ${XXLDesktopAndUp(`
    padding:0;
  `)}
  }

  &.-full-screen {
    max-width: 100%;
  }

  .special_shapes & {
    margin: 0 auto !important;
  }
  .cta__image-container {
    width: 100%;
    max-width: 76.7rem;

    height: auto;
    margin: auto;

    ${tabletAndUp(`
      max-width: 60%;
      min-height: calc(60vw / 8 * 5);
      max-height: unset;
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
      object-fit: cover;
    }
  }

  .content__container {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100%;
    margin: ${setSpace(5)} auto;
    width: ${setSpace(40)};

    ${tabletAndUp(`
      text-align: left;
      margin-top: 0;
      margin-bottom: ${setSpace(3.5)};
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      min-height: ${setSpace(28)};
    `)}

    ${desktopAndUp(`
      min-height: ${setSpace(41)};
      width: ${setSpace(63)};
    `)}

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
      max-width: 100%;
      width: ${setSpace(40)};
      background: #fff;
      padding: ${setSpace(3)};
      margin: -10rem auto ${setSpace(5)};
      position: relative;

      ${tabletAndUp(`
        position: absolute;
        margin: unset;
        bottom: unset;
        width: ${setSpace(70)};
        padding: ${setSpace(4)};
      `)};

      ${desktopAndUp(`
        width: ${setSpace(70)};
      `)};

      ${XLDesktopAndUp(`
        width: ${setSpace(80)};
      `)};

      ${XXLDesktopAndUp(`
        width: ${setSpace(80)};
      `)};
    }

    &.-bg.-wide {
      max-width: 100%;

      ${tabletAndUp(`
        padding: ${setSpace(3)};
        width: ${setSpace(60)};
      `)};

      ${desktopAndUp(`
        width: ${setSpace(80)};
        padding: ${setSpace(5)};
      `)};

      ${XLDesktopAndUp(`
        width: ${setSpace(78)};
      `)};

      ${XXLDesktopAndUp(`
        width: ${setSpace(90)};
        padding: ${setSpace(7)};
      `)};
    }

    &.-left {
      ${tabletAndUp(`
        left: 0;
      `)};

      ${desktopAndUp(`
        padding: ${setSpace(7)} ${setSpace(6)};
      `)};
    }

    &.-right {
      ${tabletAndUp(`
        right: 0;
      `)};

      ${desktopAndUp(`
        padding: ${setSpace(7)} ${setSpace(6)};
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
      max-width: 100%;

      ${tabletAndUp(`
        width: ${setSpace(70)};
      `)};

      ${desktopAndUp(`
        width: ${setSpace(70)};
      `)};
    }

    .cta {
      display: flex;
      flex-direction: column;
      margin-left: -${setSpace(3)};
      margin-right: -${setSpace(3)};

      ${tabletAndUp(`
        margin-left: 0;
        margin-right: 0;
      `)};
    }

    .cta.-first {
      button {
        ${mobileOnly(`
          margin-top: ${setSpace(2)};
        `)}
      }
    }

    button {
      border-width: 0.1rem !important;
      width: 99% !important;
      margin-top: ${setSpace(1)};

      ${mobileOnly(`
        font-size: 1.6rem !important;
      `)}

      ${tabletAndUp(`
        margin-top: ${setSpace(1)};
        width: 60% !important;
      `)};

      ${desktopAndUp(`
        margin-top: ${setSpace(3)};
      `)};
    }

    .content__title {
      margin-bottom: ${setSpace(2)};
      ${tabletAndUp(`
        &.-white {
          color: var(--color-white);
          border-color: var(--color-white);
        }
      `)};
      ${desktopAndUp(`
        white-space: nowrap;
      `)}
      &.-no-margin {
        margin-bottom: 0;
      }
    }

    .content__desktop-copy {
      p {
        line-height: 1.5 !important;
      }

      p:nth-child(odd) {
        font-weight: 500 !important;
      }

      p:nth-child(even) {
        margin-bottom: ${setSpace(1.7)};
        font-size: 1.7rem;
        font-weight: 400 !important;
      }

      p:only-child {
        font-weight: 400 !important;
      }

      font-size: var(--font-size-xsmall);

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
  }
`;
