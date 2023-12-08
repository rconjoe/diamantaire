import { XIcon } from '@diamantaire/shared/icons';
import React, { PropsWithChildren, ReactNode } from 'react';

import { Heading } from './Heading';
import { SlideOutWrapper, SlideOutOverlay, SlideOutFreezeBody } from './SlideOut.style';

interface SlideOutProps extends PropsWithChildren {
  children?: ReactNode;
  title: string;
  className?: string;
  onClose: () => void;
  width?: string;
  scrollPosition?: number;
}

const SlideOut: React.FC<SlideOutProps> = ({ children, title, onClose, className, width = '100%', scrollPosition }) => {
  return (
    <>
      <SlideOutFreezeBody scrollPosition={scrollPosition} />

      <SlideOutOverlay
        key="slideout-overlay"
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { opacity: 0.6 },
          collapsed: { opacity: 0 },
        }}
        transition={{
          duration: 0.25,
        }}
        onClick={() => onClose()}
      />

      <SlideOutWrapper
        key="slideout-container"
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { x: 0, opacity: 1 },
          collapsed: { x: 300, opacity: 0 },
        }}
        transition={{
          duration: 0.5,
        }}
        className={className}
        width={width}
      >
        <div className="wrapper">
          <div className="head">
            <div className="title">
              <Heading type="h4" className="primary slideout__title">
                {title}
              </Heading>
            </div>
          </div>
          <div className="body">{children}</div>
          <button className="close" onClick={onClose}>
            <XIcon />
          </button>
        </div>
      </SlideOutWrapper>
    </>
  );
};

export default SlideOut;

export { SlideOut };
