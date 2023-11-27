import {
  setSpace,
  makeTealLink,
  desktopAndUp,
  mobileOnly,
  tabletAndUp,
  MAIN_FONT,
  media,
} from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularSideBySideBlockStyles = styled.div`
  justify-content: left;

  ${media.medium`
    display: flex;
    flex-direction: ${(props) => (props.$textBlockAlignment === 'left' ? 'row-reverse' : 'row')};
    justify-content: space-evenly;
    margin: ${setSpace(5)} auto;
  `}

  &.more-square {
    margin: ${setSpace(5)} auto;
    align-items: center;
    ${desktopAndUp(`
      max-width: 127rem;
      margin: 10rem auto;
    `)};
    ${mobileOnly(`
      padding-left: ${setSpace(5)};
      padding-right: ${setSpace(5)};
    `)};
  }

  .side-by-side__text-container {
    height: auto;
    margin: ${setSpace(2)} 0;

    ${desktopAndUp(`
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 ${setSpace(2)};
    `)};
  }

  .side-by-side__inner-text-container {
    ${desktopAndUp(`
    max-width: 40rem;
    overflow: visible;
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
  `)};
    &.more-square {
      height: 100%;
    }
  }

  .side-by-side__image-container {
    display: flex;
    align-items: center;
    justify-content: center;

    ${desktopAndUp(`
      width: 50%;
      max-width: 610px;
      margin: 0 ${setSpace(2)};
    `)}

    .desktop {
      flex: 1;
      display: none;
      ${media.medium`display: block;`}
    }

    .mobile {
      flex: 1;
      ${media.medium`display: none;`}
    }

    img {
      width: 100%;
      height: auto;
    }

    &.more-square {
      ${tabletAndUp(`
        max-width: ${setSpace(100)};
      `)}
    }
  }

  .side-by-side__title {
    margin: 0;
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xsmall);
    font-family: ${MAIN_FONT};
    text-align: left;

    ${desktopAndUp(`
      font-size: 2.2rem;
    `)};

    &.more-square {
      font-weight: normal !important;

      ${tabletAndUp(`
        font-size: 42px;
        line-height: 4rem;
      `)}

      ${mobileOnly(`
        font-size: 2.8rem;
      `)}
    }
  }

  .side-by-side__copy {
    text-align: left;
    margin: ${setSpace(1.5)} 0;
    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-xsmall);
    font-family: ${MAIN_FONT};
    line-height: 2rem;

    p {
      margin: 0 0 2rem;
    }

    p:last-child {
      margin-bottom: 0;
    }
  }

  .side-by-side-inline-image {
    margin: 1rem 0;
    display: none;
    ${media.medium`display: block;`}
  }

  .side-by-side__cta {
    text-align: left;
    margin: ${setSpace(1.5)} 0;
    ${makeTealLink()};
  }
`;
