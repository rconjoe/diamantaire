import { contentBlockMargin, mobileOnly, setSpace } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularAccordionContainer = styled.div`
  max-width: var(--max-width-small);
  ${contentBlockMargin}
  .acc__container {
    display: grid;
    width: 100%; /* Use 100% instead of 100vw to avoid horizontal scroll */
    grid-template-columns: 1fr; /* Default grid setting */
    text-align: center;
    padding: 0 2rem;
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      padding: 0 20rem;
    }
    &.-with-image {
      grid-template-columns: 1fr 1fr; /* Define two columns for larger screens */
      text-align: left;
      text-align: left;
      gap: ${setSpace(5)};
      ${mobileOnly(`
        display: flex; /* Switch to flexbox for mobile */
        flex-direction: column;
        align-items: stretch; /* Ensure children stretch to full width */
      `)}
    }

    ${mobileOnly(`
     display: flex;
      flex-direction: column;
      align-items: stretch;

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
  }

  .accordion__title {
    margin-bottom: ${setSpace(6)};
    font-size: 4.2rem;
    line-height: 1;
    font-weight: normal;

    &.-with-image {
      margin-bottom: ${setSpace(3)};
      line-height: 1.2;
    }

    ${mobileOnly(`
    font-size: 2.7rem;
    line-height: 1;
    text-align: left;
    margin-bottom: ${setSpace(2)};
  `)}
  }

  .accordion__copy {
    font-size: var(--font-size-xsmall);
    margin-bottom: ${setSpace(3)};
  }

  .accordion__bottom-copy {
    font-size: var(--font-size-xsmall);
    line-height: 1.5;
    margin-top: ${setSpace(4)};
  }
`;
