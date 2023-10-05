import { BLACK, TEAL, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondDetailAccordion = styled.div`
  .accordion-header {
    .text {
      span {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 160px;
      }
    }
  }

  .accordion-row {
    .row {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 2rem 0;
      gap: 1rem;

      ${tabletAndUp(`
        gap: 2rem;
      `)}
    }

    .sub {
      border: 1px solid ${TEAL};
      padding: 1rem;
      display: block;
    }

    .thb {
      display: block;
      width: 100%;
      padding: 0 10px;
      overflow: hidden;

      img {
        width: 100%;
        max-width: 100% !important;
      }
    }

    .graph {
      margin-top: 15px;
      padding: 50px 35px;
    }

    .slider {
      padding: 0;
    }

    .vo-slider-value {
      color: ${BLACK};
    }

    .vo-slider-tooltip {
      width: 70px;
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
      margin-top: -60px;
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
      margin-top: -35px;
      transform: translate(3px, 0);
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
      width: 130px;
    }
    .description {
      flex: 1;
    }
  }
`;

export { StyledDiamondDetailAccordion };

export default StyledDiamondDetailAccordion;
