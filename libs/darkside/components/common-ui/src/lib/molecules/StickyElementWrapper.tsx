import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';

import { StyledStickyElementWrapper } from './StickyElementWrapper.style';

interface StickyElementWrapperProps {
  children?: ReactNode;
  mobileOnly?: boolean;
}

const StickyElementWrapper = ({ children, mobileOnly = true }: StickyElementWrapperProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const stickyEl = useRef(null);

  const { isMobile } = useContext(GlobalContext);

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

  if (mobileOnly && !isMobile) return children;

  return (
    <StyledStickyElementWrapper>
      <div ref={stickyEl}>{children}</div>
      {isSticky && <div className={`sticky ${isSticky ? 'show' : ''}`}>{children}</div>}
    </StyledStickyElementWrapper>
  );
};

export default StickyElementWrapper;

export { StickyElementWrapper };
