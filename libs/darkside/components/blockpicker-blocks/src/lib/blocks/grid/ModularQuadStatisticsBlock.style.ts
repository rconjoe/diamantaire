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
    min-height: 350px;
    max-width: 960px !important;
  `)}

  .quad-block__title {
    text-align: center;
    line-height: 30px;
    font-size: ${setSpace(3)};
    margin-bottom: 25px;

    ${tabletAndUp(`
      font-size: ${setSpace(4.5)};
      line-height: 40px;
      margin-bottom: 60px;
    `)}

    &.line1 {
      font-weight: normal;
      max-width: 275px;
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
        padding-bottom: 20px;
      `)}
    }
  }

  .quad-block__stats-container {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 25px;
    ${mobileOnly(`
      flex-direction: column;
      justify-content: left;
      gap: 40px;
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
    font-size: 60px;

    font-weight: var(--font-weight-medium);
    letter-spacing: -3px;
    line-height: 45px;
    margin-bottom: ${setSpace(1)};
    overflow-wrap: break-word;
    ${tabletAndUp(`
      font-size: 50px;
      margin-bottom: 0;
    `)}
    ${desktopAndUp(`
      font-size: 60px;
      margin-bottom: ${setSpace(2)};
    `)}
  }

  .quad-block__image {
    max-height: 45px;
    max-width: 70px;

    margin-right: 15px;

    ${mobileOnly(`
      width: 55px;
    `)}

    &.-halfmoon {
      max-width: 55px;
      ${mobileOnly(`
        width: 50px;
      `)}
    }
    &.-pear {
      max-height: 48px;
      ${mobileOnly(`
        max-height: 52px;
      `)}
    }
  }

  .quad-block__stats-copy {
    line-height: 1.3;
    ${tabletAndUp(`
      font-size: 14px;
    `)}
    ${desktopAndUp(`
      font-size: var(--font-size-xsmall);
    `)}
  }
`;
