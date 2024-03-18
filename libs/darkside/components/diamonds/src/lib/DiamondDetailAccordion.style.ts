import styled from 'styled-components';

const StyledDiamondDetailAccordion = styled.div`
  .accordion-row {
    .row {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 2rem 0;
      gap: 1rem;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        gap: 2rem;
      }
    }

    .sub {
      border: 0.1rem solid var(--color-teal);
      padding: 1rem;
      display: block;
    }

    .thb {
      display: block;
      width: 100%;
      padding: 0 1rem;
      overflow: hidden;

      img {
        width: 100%;
        max-width: 100% !important;
      }
    }

    .graph {
      margin-top: 1.5rem;
      padding: 5rem 3.5rem;
    }

    .slider {
      padding: 0;
    }

    .vo-slider-value {
      color: var(--color-black);
    }

    .vo-slider-tooltip {
      width: 7rem;
      white-space: wrap;
      font-size: var(--font-size-xxxxsmall);
      line-height: 1.2;
    }
  }

  .accordion-row .sub h3 {
    font-size: var(--font-size-xxxsmall);
  }

  .accordion-row.cut {
    .thb {
      flex: 1;
      padding: 0;
    }

    .sub {
      width: 65%;
    }
  }

  .accordion-row.color {
    .thb {
      width: 100%;
    }

    .thb img {
      width: 100%;
      margin-top: -6rem;
    }

    .sub {
      margin: 2rem 0 1rem;
    }
  }

  .accordion-row.clarity {
    .thb {
      width: 100%;
    }
    .thb img {
      width: 100%;
      margin-top: -3.5rem;
      transform: translate(0.3rem, 0);
    }
    .sub {
      margin: 2rem 0 1rem;
    }
  }

  .accordion-row.certificate {
    .row {
      margin-top: 0;
    }
    .thb {
      width: 13rem;
    }
    .description {
      flex: 1;
    }
  }
  .carbon-neutral-certification-container {
    width: 10rem;
  }
`;

export { StyledDiamondDetailAccordion };

export default StyledDiamondDetailAccordion;
