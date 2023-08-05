import React, { ReactNode } from 'react';
import { Tooltip as ReactToolTip } from 'react-tooltip';

import StyledTooltip from './Tooltip.style';

interface TooltipProps {
  id: string;
  children: ReactNode;
  className?: string;
  background?: string;
  place?: string | any;
}

const Tooltip: React.FC<TooltipProps> = ({ id, children, className, place }) => {
  return (
    <StyledTooltip>
      <a data-tooltip-id={id} className="tooltip-trigger">
        <span>i</span>
      </a>

      <ReactToolTip
        id={id}
        place={place}
        className={`tooltip-window ${className}`}
        classNameArrow="tooltip-arrow"
        data-tooltip-variant="light"
        openOnClick={true}
      >
        {children}
      </ReactToolTip>
    </StyledTooltip>
  );
};

export { Tooltip };

export default Tooltip;
