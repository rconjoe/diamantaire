import { MAIN_FONT, FONT_SIZE_9 } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledTooltip = styled.div`
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
      font-size: ${FONT_SIZE_9};
      font-family: ${MAIN_FONT};
      text-transform: none;
      color: var(--color-teal);
    }
  }
`;

export default StyledTooltip;
