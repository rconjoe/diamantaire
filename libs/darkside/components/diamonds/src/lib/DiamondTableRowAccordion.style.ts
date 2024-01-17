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
        }
      }
    }

    &.color {
      img {
        margin-bottom: 1rem;
        object-fit: cover;
        height: 110px;
        display: block;
        width: 100%;

        @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
          height: 100px;
        }
      }
    }

    &.clarity {
      img {
        margin-top: 1rem;
        display: block;
      }
    }

    &.certificate {
      .tooltip-trigger {
        transform: translateY(0.75rem);
      }
    }
  }
`;

export { StyledDiamondTableRowAccordion };

export default StyledDiamondTableRowAccordion;
