import { setSpace, mobileOnly, tabletAndUp, desktopAndUp, media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularCollectionHeroBlockContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 144rem;
  overflow: hidden;
  margin: 0 auto ${setSpace(1.5)};
  background-color: ${(props) => (props.$backgroundColor ? props.$backgroundColor : 'transparent')};

  ${tabletAndUp(`
    margin: 0 auto ${setSpace(3)};
  `)}

  &.no-margin {
    margin: 0 auto !important;
  }

  &.no-image {
    min-height: 28.2rem;
    ${tabletAndUp(`
      min-height: 336px;
    `)}
  }

  &.custom-design-hero {
    display: flex;
    align-items: center;
    padding: 5rem 2rem;
    margin: 0 auto;
  }

  .hero-block__video-wrapper {
    position: relative;
  }

  .hero-block__title-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);

    &.swap-title-and-by-vrai {
      display: flex;
      flex-direction: column-reverse;
    }

    ${(props) =>
      props.showByVrai ||
      (props.subtitle &&
        mobileOnly(`
        top: 40%;
        transform: translateY(-50%); 
      `))}

    ${(props) =>
      !props.$showByVrai &&
      !props.$showCta &&
      !props.$subtitle &&
      `
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      `}

  .our-diamonds & {
      top: 30%;
    }

    &.-center-bottom {
      left: 0 !important;
      right: 0 !important;
      ${mobileOnly(`
        top: 65% !important;
      `)}
      ${tabletAndUp(`
        top: 85% !important;
      `)}
    }

    .custom-design-hero & {
      transform: unset;
      position: relative;
      top: auto;
      left: auto;
    }
  }

  .hero-block__title {
    font-family: var(--font-family-main);
    font-style: initial;
    font-weight: 400;
    line-height: 1;
    font-size: 4rem;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
    color: ${(props) => props?.$textColor?.hex};

    ${tabletAndUp(`
      font-size: 6rem;
    `)}

    &.swap-title-and-by-vrai {
      font-size: ${setSpace(4)};
    }

    .our-diamonds & {
      font-size: 3.6rem;
      ${tabletAndUp(`
        font-size: 4rem;
      `)}
      ${desktopAndUp(`
        font-size: 6rem;
      `)}
    }

    .custom-design-hero & {
      font-size: 3.2rem;
      line-height: 1.29;
      letter-spacing: 0.35rem;

      ${tabletAndUp(`
        font-size: 42px;
      `)}
    }
  }

  .hero-block__subtitle {
    display: block;
    font-family: ${(props) => (props?.$subtitleFont ? props?.$subtitleFont : 'var(--font-family-main)')};
    font-style: 'initial';
    font-weight: 200;
    line-height: 1;
    font-size: ${setSpace(4)};
    text-align: center;
    width: fit-content;
    margin: ${setSpace(3)} auto ${setSpace(4)} auto;
    color: ${(props) => props?.$textColor?.hex};

    ${desktopAndUp(`
      margin: ${setSpace(5)} auto;
    `)}

    .our-diamonds & {
      font-size: ${setSpace(2.5)};
      line-height: 1.4;
      ${desktopAndUp(`
        font-size: ${setSpace(3)};
        margin: ${setSpace(3)} auto;
      `)}
    }

    .custom-design-hero & {
      font-size: 1.9rem;
      line-height: 1.4;
      margin-top: 1.4rem;
      max-width: 100%;
      width: 50rem;
    }
  }

  .hero-block__by-vrai-container {
    width: 100%;

    &.swap-title-and-by-vrai {
      display: flex;
      flex-direction: column-reverse;
    }
  }

  .hero-block__by-block {
    font-family: linotype-didot, serif;
    font-weight: 400;
    font-size: ${setSpace(4)};
    font-style: italic;
    text-align: center;
    width: fit-content;
    line-height: 1;
    margin: ${setSpace(3)} auto ${setSpace(4)} auto;
    color: ${(props) => props?.$textColor?.hex};
    display: block;

    &.swap-title-and-by-vrai {
      font-family: var(--font-family-main);
      font-style: initial;
    }

    ${desktopAndUp(`
      margin: ${setSpace(5)} auto;
    `)}
  }

  .hero-block__vrai-block {
    margin: ${setSpace(4)} auto;
    width: fit-content;

    ${desktopAndUp(`
      margin: ${setSpace(5)} auto;
    `)}

    .logo-svg {
      position: relative;
      width: 12.7rem;
      height: auto;
      margin: auto;
      left: -0.8rem; // This helps to visually center the VRAI logo, which would otherwise center above the R because the I is so narrow.
      fill: ${(props) => props?.$textColor?.hex};
    }

    &.swap-title-and-by-vrai {
      margin: 0 auto;

      .logo-svg {
        width: 20rem;
      }
    }
  }

  .hero-block__cta {
    display: block;
    width: fit-content;
    margin: 0 auto;
  }

  .hero-block__button-container {
    width: 100%;
    text-align: center;
    max-width: 35rem;
    margin: 0 auto;
  }

  .hero-block__button {
    margin: ${setSpace(2.5)} auto;

    ${tabletAndUp(`
      margin-top: 0;
    `)};

    .custom-design-hero & {
      width: auto !important;
      max-width: 100%;
      padding-left: 2rem;
      padding-right: 2rem;
      margin: 0;
    }
  }

  .hero-block__image-wrapper {
    img {
      min-height: 710px;
      ${media.medium`min-height: 576px;`}
    }
  }
`;
