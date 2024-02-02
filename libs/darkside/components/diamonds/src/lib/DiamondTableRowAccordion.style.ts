import styled from 'styled-components';

const StyledDiamondTableRowAccordion = styled.div`
  display: block;

  .accordion-row {
    &.cut {
      .accordion-content {
        p {
          display: flex;
          justify-content: space-between;
          align-items: center;
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
        margin-bottom: 1rem;
        object-fit: cover;
        height: 11rem;
        display: block;
        width: 100%;

        @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
          height: 10rem;
          width: 43.1rem;
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
