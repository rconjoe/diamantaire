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

  .accordion-row.color .accordion-content {
    img {
      width: 100%;
      object-fit: cover;
      clip-path: inset(30px 0 0 0);
      margin: -30px 0 0;
    }
  }
`;

export { StyledDiamondTableRowAccordion };

export default StyledDiamondTableRowAccordion;
