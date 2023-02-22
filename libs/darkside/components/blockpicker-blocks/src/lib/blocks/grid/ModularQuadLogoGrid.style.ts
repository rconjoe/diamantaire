import { setSpace, mobileOnly, tabletAndUp, desktopAndUp, MAIN_FONT } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularLogoGridContainer = styled.div`
  width: 100%;
  background-color: #e7e3df;
  padding: ${setSpace(3)} ${setSpace(3)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${mobileOnly(`
    font-size: 3rem;
  `)};
  ${tabletAndUp(`
    min-height: 300px;
  `)}

  .logo-grid__title {
    text-align: center;
    line-height: 0.62;
    font-size: 42px;
    font-weight: normal;
    font-family: ${MAIN_FONT};
    box-sizing: border-box;

    ${tabletAndUp(`
      margin-bottom: 50px;
    `)}

    ${mobileOnly(`
      font-size: ${setSpace(2.5)};
      padding: ${setSpace(3)} ${setSpace(2.5)} ${setSpace(4.5)};
    `)}
  }

  .logo-grid__logos-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: ${setSpace(5)};
    max-width: 800px;

    ${tabletAndUp(`
      flex-direction: row;
    `)}
  }
  .logos-grid__logo {
    align-self: center;
    max-width: 100%;
    width: 100vw;
    max-height: 30px;
    margin-top: 4rem;
    object-fit: contain;
    ${tabletAndUp(`
      margin-top: unset;
      max-height: 25px;
    `)}
    ${desktopAndUp(`
      max-height: 30px;
    `)}
  &.-is-coveteur {
      max-height: 60px;

      ${tabletAndUp(`
        max-height: 45px;
      `)}
      ${desktopAndUp(`
        max-height: 50px;
      `)}
    }
  }
`;
