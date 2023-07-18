import { BLACK, TEAL } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const gap = '2rem';

const StyledDiamondDetailAccordion = styled.div`
  .accordion-row {
    .row {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${gap};
      margin: ${gap} 0;
    }

    .sub {
      border: 1px solid ${TEAL};
      padding: ${gap};
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
      padding: 50px 30px;
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

  .accordion-row.cut {
    .thb {
      width: 200px;
      padding: 0;
    }
  }

  .accordion-row.color {
    .thb {
      width: 100%;
    }

    .thb img {
      width: 100%;
      margin-top: -80px;
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
      margin: ${gap} 0;
    }
  }

  .accordion-row.certificate {
    .row {
      margin-top: 0;
    }
    .thb {
      width: 200px;
    }
    .description {
      flex: 1;
    }
  }
`;

export { StyledDiamondDetailAccordion };

export default StyledDiamondDetailAccordion;
