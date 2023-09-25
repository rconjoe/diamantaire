import { ReactNode, useEffect, useRef, useState } from 'react';

import { StyledStickyElementWrapper } from './StickyElementWrapper.style';

interface StickyElementWrapperProps {
  children: ReactNode;
}

const StickyElementWrapper = ({ children }: StickyElementWrapperProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const stickyEl = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const mainElement = stickyEl.current;

      if (!mainElement) return;

      const mainElementRect = mainElement.getBoundingClientRect();

      if (mainElementRect.bottom <= window.innerHeight) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StyledStickyElementWrapper>
      <div ref={stickyEl}>{children}</div>
      {isSticky && <div className={`sticky ${isSticky ? 'show' : ''}`}>{children}</div>}
    </StyledStickyElementWrapper>
  );
};

export default StickyElementWrapper;

export { StickyElementWrapper };
