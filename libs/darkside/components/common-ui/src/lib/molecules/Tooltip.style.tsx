import { BLACK, GREY, GREY_LIGHTER, MAIN_FONT, WHITE, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledTooltip = styled.div`
  .tooltip-window {
    opacity: 1;
    z-index: 9999;
    background: ${WHITE};
    border: 1px solid ${GREY};
    padding: 2rem;
    color: ${BLACK};

    ${tabletAndUp(`
      max-width: 360px;
    `)}

    * {
      font-size: var(--font-size-xxxsmall);
      color: ${BLACK};
    }
  }

  .tooltip-arrow {
    border: 1px solid ${GREY};
  }

  .react-tooltip__place-top .tooltip-arrow {
    border-top: 0;
    border-left: 0;
  }

  .react-tooltip__place-bottom .tooltip-arrow {
    border-bottom: 0;
    border-right: 0;
  }

  .react-tooltip__place-left .tooltip-arrow {
    border-bottom: 0;
    border-left: 0;
  }

  .react-tooltip__place-right .tooltip-arrow {
    border-top: 0;
    border-right: 0;
  }

  .tooltip-trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid var(--color-teal);
    height: 12px;
    width: 12px;

    * {
      font-size: var(--font-size-xxxxxsmall);
      font-family: ${MAIN_FONT};
      text-transform: none;
      color: var(--color-teal);
    }
  }

  #tooltip-carat,
  #tooltip-color,
  #tooltip-clarity,
  #tooltip-cut {
    max-width: 80%;
  }

  .tooltip-certificate {
    ${tabletAndUp(`
      max-width: 170px;
    `)}
  }
`;

export default StyledTooltip;
