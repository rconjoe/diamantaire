import {
  setSpace,
  tabletAndUp,
  desktopAndUp,
  XLDesktopAndUp,
  XXLDesktopAndUp,
  contentBlockMargin,
} from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

interface Props {
  textAlign: string;
}

export const FullWidthImageContainer = styled.div`
  width: 100%;
  max-width: 144rem;
  height: auto;
  min-height: calc(100vw / 3 * 2);
  margin: auto;

  ${tabletAndUp(`
    min-height: calc(100vw / 3 * 1);
  `)};

  ${XXLDesktopAndUp(`
    min-height: 48rem;
    display: flex;
    align-items: center;
  `)};

  &.-full-screen & {
    max-width: 100%;
  }
`;

export const HalfWidthImageContainer = styled.div`
  width: 100%;
  max-width: 76.7rem;
  height: auto;
  margin: auto;

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
`;

export const BannerWrapper = styled.div<Props>`
  position: relative;
  width: 100%;
  max-width: 144rem;
  ${contentBlockMargin}

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

  .text-container {
    text-align: ${(props) => props?.textAlign};
  }

  .special_shapes & {
    margin: 0 auto !important;
  }

  ul {
    margin: 2rem 0 2.5rem;
    li {
      font-size: var(--font-size-xsmall);
    }
  }

  .cta {
    /* Don't edit unless absolutely neccesary. 99% of the time, it will be easier to wrap the container, and style it that way  */
    margin: 0;
    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      max-width: 35rem;
    }

    .cta__button {
      margin: 0 0 2rem;
      /* We're overriding DarksideButton styles here */
      .button-style--outline,
      .button-style--solid {
        a,
        button {
          display: inline-block;
          width: 100%;
          min-width: 30rem;
        }
      }

      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
`;

export const BannerTextContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${setSpace(40)};
  margin: ${setSpace(3)} auto 0;

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
        color: var(--color-white);
        border-color: var(--color-white);
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
`;

export const Copy = styled.div`
  p {
    margin-bottom: 2rem !important;
    font-size: var(--font-size-xsmall);
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
`;
