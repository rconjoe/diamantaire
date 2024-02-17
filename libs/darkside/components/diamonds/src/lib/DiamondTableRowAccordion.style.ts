import styled from 'styled-components';

const StyledDiamondTableRowAccordion = styled.div`
  display: block;

  .accordion-row {
    &.cut {
      .accordion-content {
        p {
          display: block;

          gap: 1.5rem;
        }

        img {
          max-width: 20%;

          @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
            height: 7.7rem;
            width: 8.6rem;
          }
        }
      }
    }

    &.color {
      img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: contain;

        @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
          max-width: 48rem;
          margin: 1rem 0;
          /* object-fit: cover; */
        }
      }
    }

    &.clarity {
      img {
        margin-top: 1rem;
        display: block;

        @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
          height: 16.7rem;
          width: 43.1rem;
        }
      }
    }

    &.certificate {
      .accordion-content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
    }
  }
`;

export { StyledDiamondTableRowAccordion };

export default StyledDiamondTableRowAccordion;
