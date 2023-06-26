import React, { ReactNode } from 'react';
import { Tooltip as ReactToolTip } from 'react-tooltip';

import StyledTooltip from './Tooltip.style';

interface TooltipProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ id, children, className }) => {
  return (
    <StyledTooltip>
      <a data-tooltip-id={id} className="tooltip-trigger">
        <span>i</span>
      </a>

      <ReactToolTip id={id} className={className}>
        {children}
      </ReactToolTip>
    </StyledTooltip>
  );
};

export { Tooltip };

export default Tooltip;
