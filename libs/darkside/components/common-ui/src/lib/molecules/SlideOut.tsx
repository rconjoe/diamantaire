import { XIcon } from '@diamantaire/shared/icons';
import React, { PropsWithChildren, ReactNode } from 'react';

import StyledSlideOut from './SlideOut.style';

interface SlideOutProps extends PropsWithChildren {
  children?: ReactNode;
  title: string;
  className?: string;
  onClose: () => void;
  width?: string;
}

const SlideOut: React.FC<SlideOutProps> = ({ children, title, onClose, className, width }) => {
  console.log(children);

  return (
    <StyledSlideOut className={className} width={width}>
      <div className="overlay" onClick={onClose}></div>
      <div className="wrapper">
        <div className="head">
          <div className="title">
            <h4>{title}</h4>
          </div>
        </div>
        <div className="body">{children}</div>
        <button className="close" onClick={onClose}>
          <XIcon />
        </button>
      </div>
    </StyledSlideOut>
  );
};

export default SlideOut;

export { SlideOut };
