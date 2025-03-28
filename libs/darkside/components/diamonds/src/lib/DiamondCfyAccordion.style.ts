import styled from 'styled-components';

const StyledDiamondCfyAccordion = styled.div`
  border-top: 0.1rem solid var(--color-lighter-grey);
  margin: 2rem 0 0;

  @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
    border-top: 0;
    margin: 0;
  }

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
  }

  .description {
    p {
      font-size: var(--font-size-xxsmall);
    }

    img {
      max-width: 100%;
    }
  }

  .accordion-row.clarity {
    img {
      aspect-ratio: 175/68;
    }
  }

  .accordion-row.color {
    .description {
      margin-top: -2rem;
    }

    img {
      /* aspect-ratio: 25/9; */
      margin-bottom: 1rem;
    }
  }

  .upgrade {
    background: var(--color-lightest-grey);
    justify-content: space-between;
    margin: 2rem 0 0;
    padding: 1rem;
    display: flex;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      padding: 1rem 2rem;
    }

    * {
      font-size: var(--font-size-xxsmall) !important;
    }

    form {
      display: flex;
      align-items: center;
      gap: 1rem;

      .price {
        margin: 0;
        display: flex;
        gap: 0.25rem;
        align-items: center;

        i {
          font-style: normal;
        }
      }
    }

    input {
      cursor: pointer;
      margin: 0 0 0 0;
    }
  }
  .carbon-neutral-certification-container {
    padding-top: 1rem;
  }
`;

export { StyledDiamondCfyAccordion };

export default StyledDiamondCfyAccordion;
