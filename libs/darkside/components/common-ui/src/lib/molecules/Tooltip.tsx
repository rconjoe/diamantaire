import React, { ReactNode, useRef, useState } from 'react';
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

  const tooltipRef = useRef(null);

  const handleClick = (e) => {
    if (e.relatedTarget !== tooltipRef.current) {
      setIsOpen(false);

      window.removeEventListener('click', handleClick);
    }
  };

  const handleToggleTooltip = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenTooltip = () => {
    setIsOpen(true);

    window.addEventListener('click', handleClick);
  };

  return (
    <StyledTooltip ref={tooltipRef}>
      <button
        data-tooltip-id={id}
        className="tooltip-trigger"
        onMouseEnter={handleOpenTooltip}
        onMouseLeave={() => {
          setIsOpen(false);
        }}
        onClick={handleToggleTooltip}
      >
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
