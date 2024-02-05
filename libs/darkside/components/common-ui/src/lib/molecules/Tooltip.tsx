import React, { ReactNode, useEffect, useRef, useState } from 'react';
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
    if (!tooltipRef.current || !tooltipRef.current.contains(e.target)) {
      e.stopPropagation();

      setIsOpen(false);

      window.removeEventListener('click', handleClick);
    }
  };

  const handleToggleTooltip = () => {
    const _isOpen = !isOpen;

    setIsOpen(_isOpen);

    if (_isOpen) window.addEventListener('click', handleClick);
  };

  const handleCloseTooltip = (e) => {
    e.stopPropagation();

    setIsOpen(false);

    window.removeEventListener('click', handleClick);
  };

  const handleOpenTooltip = (e) => {
    e.stopPropagation();

    setIsOpen(true);

    window.addEventListener('click', handleClick);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <StyledTooltip>
      <div ref={tooltipRef}>
        <button
          data-tooltip-id={id}
          className="tooltip-trigger tablet-and-up"
          onMouseEnter={handleOpenTooltip}
          onMouseLeave={handleCloseTooltip}
          onClick={handleToggleTooltip}
        >
          <span>i</span>
        </button>

        <button data-tooltip-id={id} className="tooltip-trigger mobile-only" onClick={handleToggleTooltip}>
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
      </div>
    </StyledTooltip>
  );
};

export { Tooltip };

export default Tooltip;
