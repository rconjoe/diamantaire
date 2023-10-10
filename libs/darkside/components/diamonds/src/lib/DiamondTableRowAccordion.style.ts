import styled from 'styled-components';

const StyledDiamondTableRowAccordion = styled.div`
  display: block;

  .accordion-row.cut .accordion-content {
    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
    }

    img {
      max-width: 20%;
    }
  }

  .accordion-row.color,
  .accordion-row.clarity {
    .accordion-content {
      img {
        display: block;
        margin: 10px 0;
      }
    }
  }
`;

export { StyledDiamondTableRowAccordion };

export default StyledDiamondTableRowAccordion;
