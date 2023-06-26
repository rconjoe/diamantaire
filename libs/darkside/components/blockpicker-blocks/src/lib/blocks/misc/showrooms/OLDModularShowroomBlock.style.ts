import { setSpace, desktopAndUp, MAIN_FONT, makeTealLink } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularShowroomBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;

  ${desktopAndUp(`
    flex-direction: row-reverse;
    justify-content: space-evenly;
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
    margin: 0 0 ${setSpace(2.5)};
    font-weight: var(--font-weight-medium);
    font-size: 22px;
    font-family: ${MAIN_FONT};
    text-align: left;

    ${desktopAndUp(`
      font-family: var(--font-weight-normal);
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
      color: var(--color-teal);
      border-bottom: 1px solid var(--color-teal);
      font-weight: 500;
      text-decoration: underline;
      border: none;
    }
  }
`;
