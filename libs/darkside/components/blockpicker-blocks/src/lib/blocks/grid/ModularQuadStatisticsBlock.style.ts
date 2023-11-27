import { setSpace, mobileOnly, tabletAndUp, desktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularQuadStatisticsBlockContainer = styled.div`
  padding: ${setSpace(3)} ${setSpace(3)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: auto;
  ${mobileOnly(`
    padding: ${setSpace(3)};
  `)}
  ${tabletAndUp(`
    min-height: 35rem;
    max-width: 960px !important;
  `)}

  .quad-block__title {
    text-align: center;
    line-height: 3rem;
    font-size: ${setSpace(3)};
    margin-bottom: 2.5rem;

    ${tabletAndUp(`
      font-size: ${setSpace(4.5)};
      line-height: 4rem;
      margin-bottom: 6rem;
    `)}

    &.line1 {
      font-weight: normal;
      max-width: 27.5rem;
      ${tabletAndUp(`
        max-width: unset;
      `)}
    }
    &.line2 {
      &::before {
        content: '\\a';
        white-space: pre;
      }
      padding-bottom: ${setSpace(7)};
      ${mobileOnly(`
        padding-bottom: 2rem;
      `)}
    }
  }

  .quad-block__stats-container {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
    ${mobileOnly(`
      flex-direction: column;
      justify-content: left;
      gap: 4rem;
    `)}

    ${desktopAndUp(`
      width: 100%;
      justify-content: space-between;
    `)}
  }

  .quad-block__stats-inner {
    display: flex;
    flex-direction: column;
  }

  .quad-block__stats-outer {
    display: flex;
    align-items: start;
    justify-content: left;
    ${mobileOnly(`
      overflow: hidden;
    `)}
  }

  .quad-block__stats-title {
    font-size: 6rem;

    font-weight: var(--font-weight-medium);
    letter-spacing: -0.3rem;
    line-height: 4.5rem;
    margin-bottom: ${setSpace(1)};
    overflow-wrap: break-word;
    ${tabletAndUp(`
      font-size: 5rem;
      margin-bottom: 0;
    `)}
    ${desktopAndUp(`
      font-size: 6rem;
      margin-bottom: ${setSpace(2)};
    `)}
  }

  .quad-block__image {
    max-height: 4.5rem;
    max-width: 7rem;

    margin-right: 1.5rem;

    ${mobileOnly(`
      width: 55px;
    `)}

    &.-halfmoon {
      max-width: 55px;
      ${mobileOnly(`
        width: 5rem;
      `)}
    }
    &.-pear {
      max-height: 4.8rem;
      ${mobileOnly(`
        max-height: 5.2rem;
      `)}
    }
  }

  .quad-block__stats-copy {
    line-height: 1.3;
    ${tabletAndUp(`
      font-size: 1.4rem;
    `)}
    ${desktopAndUp(`
      font-size: var(--font-size-xsmall);
    `)}
  }
`;
