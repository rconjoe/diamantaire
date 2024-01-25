import React, { ReactNode, useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleTooltip = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseTooltip = () => {
    setIsOpen(false);
  };

  return (
    <StyledTooltip>
      <button data-tooltip-id={id} className="tooltip-trigger" onClick={handleToggleTooltip} onBlur={handleCloseTooltip}>
        <span>i</span>
      </button>

      <ReactToolTip
        id={id}
        place={place}
        className={`tooltip-window ${className}`}
        classNameArrow="tooltip-arrow"
        data-tooltip-variant="light"
        isOpen={isOpen}
      >
        {children}
      </ReactToolTip>
    </StyledTooltip>
  );
};

export { Tooltip };

export default Tooltip;
