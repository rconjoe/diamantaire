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
    &.color,
    &.clarity {
      .accordion-content {
        img {
          display: block;
          margin: 1rem 0;
        }
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
