import { BLACK, GREY_LIGHTER, WHITE, desktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledAccordion = styled.div`
  display: block;
  background: ${WHITE};
  border-bottom: 1px solid ${GREY_LIGHTER};
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
    padding: 10px 0;
    cursor: pointer;

    .text {
      gap: 10px;
      display: flex;
      align-items: center;
      font-size: var(--font-size-xxsmall);
      font-weight: var(--font-weight-normal);

      ${desktopAndUp(`
        font-size: var(--font-size-xsmall);
      `)}

      .value {
        padding: 0 1rem 0 0;
        line-height: 1.2;
      }
    }

    .icon {
      font-size: var(--font-size-xsmall);
    }
  }

  .accordion-body {
    transition: all 0.2s ease;
    max-height: 0;
    display: block;
    overflow: hidden;
  }

  .accordion-row-active {
    .accordion-body {
      max-height: inherit;
    }
  }

  .accordion-content {
    display: block;

    position: relative;
  }

  .accordion-content-wrapper {
    display: block;
    position: relative;
    padding: 0 0 20px;
  }

  .accordion-content-wrapper * {
    font-size: var(--font-size-xsmall);
  }

  .accordion-content-wrapper p {
    margin: 5px 0 0;

    &:first-child {
      margin: 0;
    }
  }
`;

export default StyledAccordion;
