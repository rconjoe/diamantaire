import {
  TEAL,
  WHITE,
  setSpace,
  tabletAndUp,
  desktopAndUp,
  XLDesktopAndUp,
  XXLDesktopAndUp,
  customBPAndUp,
  COPY_SIZE_SMALL,
} from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const FullWidthImageContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  height: auto;
  min-height: calc(100vw / 3 * 2);
  margin: auto;

  ${tabletAndUp(`
    min-height: calc(100vw / 3 * 1);
  `)};

  ${XXLDesktopAndUp(`
    min-height: 480px;
  `)};

  &.-full-screen & {
    max-width: 100%;
  }
`;

export const HalfWidthImageContainer = styled.div`
  width: 100%;
  max-width: 767px;
  height: auto;
  margin: auto;

  ${tabletAndUp(`
    max-width: 60%;
    min-height: calc(60vw / 8 * 5);
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
  }
`;

export const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  &.-vertical-margins {
    margin-top: ${setSpace(1.5)};
    margin-bottom: ${setSpace(1.5)};

    ${tabletAndUp(`
      margin-top: ${setSpace(3)};
      margin-bottom: ${setSpace(3)};
    `)}
  }

  &.-full-screen {
    max-width: 100%;
  }

  .special_shapes & {
    margin: 0 auto !important;
  }
`;

export const BannerTextContainer = styled.div`
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
    max-width: ${setSpace(40)};
    background: white;
    padding: ${setSpace(3)};
    margin: 0 auto -70px;
    position: relative;
    bottom: 70px;

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
      max-width: ${setSpace(70)};
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

  button {
    ${desktopAndUp(`

      &.-wide-cta {
        margin-top: calc(var(--gutter) /2.5);
        width: 80% !important;
      }
    `)};
  }

  .primary,
  .secondary {
    margin-bottom: 2rem;
  }
`;

export const Title = styled.div`
  margin-bottom: ${setSpace(1)};

  ${tabletAndUp(`
      &.-white {
        color: ${WHITE};
        border-color: ${WHITE};
      }
    `)};
  ${desktopAndUp(`
      margin-bottom: ${setSpace(2.5)};
    `)};
`;

export const SubTitle = styled.div`
  margin-top: ${setSpace(2)};
  margin-bottom: ${setSpace(2)};
  font-size: ${setSpace(2.5)};
  font-weight: 500;
  line-height: ${setSpace(3)};

  ${tabletAndUp(`
    &.-white {
      color: ${WHITE};
    }
  `)};
  ${tabletAndUp(`
    font-size: ${setSpace(2.8)};
    margin-top: 0;
  `)};

  &.-blog {
    line-height: 0;
    margin-bottom: ${setSpace(3)};
    font-size: ${COPY_SIZE_SMALL};
    font-weight: 300;
    color: ${TEAL} !important;
  }
`;

export const Copy = styled.div`
  p {
    margin-bottom: 20px !important;
  }

  p:last-child {
    margin-bottom: 0;
  }

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
`;

export const MobileMiddleLayerImageContainer = styled.div`
  position: absolute;
  right: 0;
  text-align: right;
  width: 100%;
  z-index: 1;

  &.hearst-necklace {
    top: -17px;

    img {
      max-width: 160px;
    }

    ${customBPAndUp(
      '475px',
      `
        top: -7px;

        img {
          max-width: 250px;
        }
      `,
    )};
  }
`;

export const MiddleLayerImageContainer = styled.div`
  position: absolute;
  right: 0;
  text-align: right;
  width: 100%;

  &.hearst-necklace {
    top: -60px;

    img {
      max-width: 450px;
    }

    ${desktopAndUp(`
      top: -60px;
      margin-right: 75px;

      img {
        max-width: 600px;
      }
    `)};

    ${XLDesktopAndUp(`
      margin-right: 230px;
      top: 25px;

      img {
        max-width: 650px;
      }
    `)};
  }
`;
