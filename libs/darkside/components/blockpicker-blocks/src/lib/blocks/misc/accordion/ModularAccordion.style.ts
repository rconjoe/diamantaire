import { mobileOnly, setSpace, COPY_SIZE_SMALL } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularAccordionContainer = styled.div`
  .acc__container {
    width: 100vw;
    display: grid;
    text-align: center;
    margin: ${setSpace(10)} auto;

    &.-with-image {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      margin-bottom: ${setSpace(5)};
      text-align: left;

      ${mobileOnly(`
        flex-direction: column;
        flex: 0;
        margin: 0;
      `)}
    }

    ${mobileOnly(`
      flex-direction: column;
      flex: 0;
      margin: ${setSpace(3)} 0;

      & .title {
        font-size: ${setSpace(3.3)};
        margin-bottom: ${setSpace(3)};
      }
    `)}

    & .slide-down {
      overflow: hidden;
    }

    @keyframes slide-down {
      0% {
        opacity: 0;
        max-height: 0;
      }
      100% {
        opacity: 1;
        max-height: 4000px;
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      .slide-down[data-reach-accordion-panel] {
        animation: slide-down 0.5s ease;
      }
    }
  }

  .acc__image-container {
    position: relative;
    flex: 1 1;
    padding: 0 ${setSpace(3)};

    ${mobileOnly(`
        flex: 0;
        padding: 0;
        margin-bottom: ${setSpace(2)};
  `)}
  }

  .acc__sticky-wrapper {
    position: sticky;
    top: 0;
  }

  .acc__accordion {
    flex: 1 1;
    margin: 0 10%;

    &.-with-image {
      margin: 0 ${setSpace(2)};
    }

    ${mobileOnly(`
      margin: ${setSpace(1)} !important;
    `)}
  }

  .accordion__title {
    margin-bottom: ${setSpace(6)};
    font-size: 4.2rem;
    line-height: 2;
    font-weight: normal;

    &.-with-image {
      margin-bottom: ${setSpace(3)};
      line-height: 1.2;
    }

    ${mobileOnly(`
    font-size: 2.7rem;
    line-height: 1;
    text-align: left;
    margin-bottom: ${setSpace(5)};
  `)}
  }

  .accordion__copy {
    font-size: ${COPY_SIZE_SMALL};
    margin-bottom: ${setSpace(3)};
  }

  .accordion__bottom-copy {
    font-size: ${COPY_SIZE_SMALL};
    line-height: 1.5;
    margin-top: ${setSpace(4)};
  }
`;
