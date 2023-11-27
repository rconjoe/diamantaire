import { MAIN_FONT, mobileOnly, tabletAndUp, desktopAndUp, setSpace, media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularTextOnlyBlockContainer = styled.div`
  .text-block__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 90vw;
    margin: 0.5rem auto;

    ${media.medium`max-width: 714px`}

    &.--mobile-no-margin-top {
      ${mobileOnly(`
        margin-top: 0;
      `)};
    }

    &.centered-text-reduced-margins {
      margin-top: 0;
      margin-bottom: ${setSpace(4)};
      text-align: center;
      padding-top: 2rem;

      ${desktopAndUp(`
        margin-bottom: ${setSpace(5)};
      `)};

      h1 {
        text-align: center;
      }

      > div {
        align-items: center;
      }

      p {
        margin: 0;
      }
    }
    &.-reduce-margins {
      margin-top: 0;
      margin-bottom: ${setSpace(4)};

      ${desktopAndUp(`
        margin-bottom: ${setSpace(5)};
      `)};
    }
    &.-no-max-width {
      max-width: none;
      ${tabletAndUp(`
        text-align: left;
      `)};
    }
    &.centered-text-with-strong-break {
      text-align: center;

      h2 {
        text-align: center;
      }
      p {
        margin: 0;
        font-size: 1.6rem;

        @media (min-width: 1200px) {
          font-size: 1.9rem;
        }
      }
      strong {
        display: block;
        font-size: 1.6rem;
        margin: 0 0 0.5rem;

        @media (min-width: 1200px) {
          font-size: 2.1rem;
        }
      }

      .primary {
        width: 32rem;
        margin: 0 auto 0.8rem;
      }
    }
  }

  .text-block__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    ${tabletAndUp(`
      max-width: unset;
      align-items: center;
    `)};
  }

  .text-block__title {
    font-family: ${(props) => (props.titleFont ? props.titleFont : MAIN_FONT)};
    font-style: ${(props) => (props.fontStyle ? props.fontStyle : 'initial')};
    margin: ${setSpace(2)} 0 ${setSpace(1)} 0;
    text-align: center;

    ${mobileOnly(`
    text-align: left;

    &.-snug-center-copy {
      text-align: center;
      margin-bottom: 0;
    }
  `)};

    & {
      text-align: left;
      margin: ${setSpace(2)} 0 ${setSpace(1)} 0;

      &.-snug-center-copy {
        text-align: center;
        margin-bottom: 0;

        ${tabletAndUp(`
          margin-bottom: 0;
        `)};
      }

      ${tabletAndUp(`
        text-align: center;
        margin: ${setSpace(4)} 0 ${setSpace(1)} 0;
      `)};
    }

    .interstitial & {
      margin: ${setSpace(2)} auto 0.5rem auto;
      font-size: 2.8rem;

      ${tabletAndUp(`
        margin: ${setSpace(3)} auto 1rem auto;
        font-size: 42px;
      `)}
    }
  }

  .text-block__copy {
    margin: ${setSpace(2)} 0 ${setSpace(1)} 0;

    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-xsmall);
    ${media.medium`max-width: 714px`}

    a {
      text-decoration: underline;
    }
    &.-no-max-width {
      max-width: none;
    }

    &.-blog {
      color: #7c7c7c;
      font-size: 1.7rem;
      text-transform: uppercase;
    }
  }

  .text-block__button-wrapper {
    margin: ${setSpace(3)} 0;
    &.-has-smaller-margin,
    &.-has-smaller-margin.centered-text-with-strong-break {
      margin: ${setSpace(3)} auto ${setSpace(2)};
      ${tabletAndUp(`
        margin: ${setSpace(3)} 0 ${setSpace(1)};
      `)}
    }
    &.centered-text-with-strong-break {
      margin: ${setSpace(3)} auto;
    }

    .interstitial & {
      margin: 0;
      text-align: left;
      width: 100%;
    }

    > div {
      margin-bottom: 2rem;
      text-align: center;

      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
  .text-block__mobile-button-wrapper {
    width: 100%;
  }
`;
