import {
  setSpace,
  desktopAndUp,
  MAIN_FONT,
  makeTealLink,
  TEAL,
  NORMAL_FONT_WEIGHT,
  MEDIUM_FONT_WEIGHT,
} from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularShowroomBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;

  ${desktopAndUp(`
    flex-direction: row-reverse;
    justify-content: space-evenly;
    margin-top: ${setSpace(5)};
    margin-bottom: ${setSpace(12)};
  `)};

  .showroom__image-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
      width: 100%;
      height: auto;
      ${desktopAndUp(`
        width: unset;
        height: 340px;
        margin: 0 ${setSpace(2)};
        margin-top: ${setSpace(9.5)};
      `)}
    }
  }

  .showroom__text-container {
    height: auto;
    margin-top: ${setSpace(2)};
    margin-bottom: ${setSpace(8)};

    ${desktopAndUp(`
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 ${setSpace(2)};
    `)};
  }

  .showroom__inner-text-container {
    ${desktopAndUp(`
      width: 400px;
      overflow: visible;
      display: flex;
      align-items: left;
      justify-content: center;
      flex-direction: column;
    `)};
  }

  .showroom__text-block {
    margin-bottom: ${setSpace(2)};
  }

  .showroom__title {
    margin-top: ${setSpace(1.5)};
    margin-bottom: ${setSpace(2.5)};
    font-family: ${MEDIUM_FONT_WEIGHT};
    font-size: 22px;
    font-family: ${MAIN_FONT};
    text-align: left;

    ${desktopAndUp(`
      font-family: ${NORMAL_FONT_WEIGHT};
      font-size: 42px;
      margin-bottom: ${setSpace(6)};
    `)};
  }

  .showroom__cta {
    line-height: 2.4rem;
    ${makeTealLink()};
  }

  .showroom__appointment-markdown {
    a {
      color: ${TEAL};
      border-bottom: 1px solid ${TEAL};
      font-weight: 500;
      text-decoration: underline;
      border: none;
    }
  }
`;
