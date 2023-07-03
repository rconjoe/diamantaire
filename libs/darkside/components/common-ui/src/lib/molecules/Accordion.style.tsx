import { BLACK, GREY_LIGHTER, WHITE } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledAccordion = styled.div`
  display: block;
  background: ${WHITE};
  color: ${BLACK};

  .accordion-row {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${GREY_LIGHTER};
  }

  .accordion-row:first-child {
    border-top: 0;
  }

  .accordion-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    cursor: pointer;

    .text {
      display: flex;
      gap: 5px;
      font-size: var(--font-size-xxsmall);
    }

    .icon {
      font-size: var(--font-size-xsmall);
    }
  }

  .accordion-body {
    height: 0;
    display: block;
    overflow: hidden;
  }

  .accordion-row-active {
    .accordion-body {
      height: auto;
    }
  }

  .accordion-content {
    display: block;
    padding: 0 10px 20px;
    font-size: var(--font-size-xxsmall);
  }

  .accordion-content * {
    font-size: var(--font-size-xxsmall);
  }

  .accordion-content p {
    margin: 5px 0 0;

    &:first-child {
      margin: 0;
    }
  }

  // Specific styles

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

  .accordion-row.clarity .accordion-content {
  }
`;

export default StyledAccordion;
