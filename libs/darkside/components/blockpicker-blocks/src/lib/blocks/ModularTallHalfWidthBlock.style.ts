import {
  setSpace,
  mobileOnly,
  tabletAndUp,
  desktopAndUp,
  XLDesktopAndUp,
  XXLDesktopAndUp,
  COPY_SIZE_SMALL,
  WHITE,
} from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularTallHalfWidthBlockContainer = styled.div`
  position: relative;
  max-width: 1180px;
  margin: 0 auto;

  &.-vertical-margins {
    margin: 50px auto;
    ${tabletAndUp(`
    margin: 80px auto;
    width: 100%;
    padding: 0 24px;
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

  .image-container {
    width: 100%;
    max-width: 767px;

    height: auto;
    margin: auto;

    ${tabletAndUp(`
      max-width: 60%;
      min-height: calc(60vw / 8 * 5);
      max-height: unset;
    `)};

    ${XXLDesktopAndUp(`
      min-height: 540px;
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

  .content-container {
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
          color: ${WHITE};
          border-color: ${WHITE};
        `)};

        &:hover {
          ${tabletAndUp(`
            color: ${WHITE};
            border-color: ${WHITE};
          `)}
        }
      }
    }

    &.-bg {
      max-width: 100%;
      width: ${setSpace(40)};
      background: #fff;
      padding: ${setSpace(3)};
      margin: -100px auto ${setSpace(5)};
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
      border-width: 1px !important;
      width: 99% !important;
      margin-top: ${setSpace(1)};

      ${mobileOnly(`
        font-size: 16px !important;
      `)}

      ${tabletAndUp(`
        margin-top: ${setSpace(1)};
        width: 60% !important;
      `)};

      ${desktopAndUp(`
        margin-top: ${setSpace(3)};
      `)};
    }
  }
  .content__title {
    margin-bottom: ${setSpace(2)};
    ${tabletAndUp(`
      &.-white {
        color: ${WHITE};
        border-color: ${WHITE};
      }
    `)};
    ${desktopAndUp(`
      white-space: nowrap;
    `)}
    &.-no-margin {
      margin-bottom: 0;
    }
  }

  .logo__title-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    margin: 0 auto 20px;
    ${tabletAndUp(`
      gap: 10px;
      flex-direction: row;
      align-items: baseline;
    `)};
  }

  .content__title-image {
    max-width: 180px;
    ${tabletAndUp(`
      max-width: none;
    `)};
    img {
      max-height: 30px;
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

    font-size: ${COPY_SIZE_SMALL};

    a {
      text-decoration-line: underline;
      text-decoration-style: solid;
      text-decoration-thickness: 1px;
    }

    ${tabletAndUp(`
      &.-white {
        color: ${WHITE};
        border-color: ${WHITE};
        a {
          color: inherit;
        }
      }
      &.-tall-block p {
        margin-bottom: 10px;
      }
    `)};
  }
`;
