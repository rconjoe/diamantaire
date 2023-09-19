import { setSpace, desktopAndUp, tabletAndUp, MAIN_FONT, makeTealLink } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularShowroomBlockStyles = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1140px;
  margin: 0 auto;
  ${desktopAndUp(`
    flex-direction: row;
    justify-content: space-between;
    padding: 0 40px;
  `)};

  .showroom__image-container {
    display: block;
    width: 100%;
    max-width: 600px;
    margin: auto;
    ${desktopAndUp(`
    margin: 0 ${setSpace(2)};
  `)};
    img {
      width: 100%;
      height: auto;
    }
  }

  .showroom__text-container {
    height: auto;
    margin-top: ${setSpace(2)};
    margin-bottom: ${setSpace(2.5)};
    line-height: 1.2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;

    ${desktopAndUp(`
    display: flex;
    justify-content: flex-start;
    padding-right: ${setSpace(4)};
    margin: 0 ${setSpace(2)};
  `)};
  }
  .showroom__text-inner-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: ${setSpace(2.5)};
    ${desktopAndUp(`
      overflow: visible;
      align-items: left;
      gap: ${setSpace(4)};
    `)};
  }

  .showroom__text-section {
    font-size: var(--font-size-xsmall);
  }

  .showroom__title {
    margin-bottom: ${setSpace(1)} !important;
    font-weight: var(--font-weight-medium);
    font-size: 22px;
    font-family: ${MAIN_FONT};
    text-align: left;

    ${desktopAndUp(`
    font-weight: var(--font-weight-normal);
    font-size: 42px;
    margin-bottom: ${setSpace(2)} !important;
  `)};
  }

  .showroom__cta {
    line-height: 2.4rem;
    ${makeTealLink()};
  }

  .showroom__side-direction-image {
    display: none;
    ${tabletAndUp(`
    display: block;
    margin-top: ${setSpace(3)};
  `)}
  }
  .showroom__bottom-direction-image {
    display: block;
    width: 100%;
    img {
      margin: auto;
      width: 100%;
    }
    ${desktopAndUp(`
      display: none;
    `)}
  }

  .showroom__appt-cta-button button {
    font-size: var(--font-size-xsmall) !important;
    margin-top: ${setSpace(0.5)};
    text-align: left;
  }

  p {
    strong {
      margin-bottom: 5px;
      display: block;
    }
  }
`;
