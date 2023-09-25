import { ReactNode, useEffect, useRef, useState } from 'react';

import { StyledStickyElementWrapper } from './StickyElementWrapper.style';

interface StickyElementWrapperProps {
  children: ReactNode;
}

// const StickyElementWrapper = ({ children }: StickyElementWrapperProps) => {
//   const [isSticky, setIsSticky] = useState(false);

//   useEffect(() => {
//     // Function to handle scroll events
//     const handleScroll = () => {
//       // Calculate the scroll position and the main element's position
// const mainElement = document.getElementById('will-be-sticky');

// if (mainElement) {
// const mainElementRect = mainElement.getBoundingClientRect();

// // Check if the main element is out of the viewport
// if (mainElementRect.bottom <= window.innerHeight) {
//   setIsSticky(true);
// } else {
//   setIsSticky(false);
// }
//     }
//     };

//     // Add an event listener to monitor scroll position
//     window.addEventListener('scroll', handleScroll);

//     // Initial check for visibility
//     handleScroll();

//     // Remove the event listener when the component unmounts
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <StyledStickyElementWrapper className={`sticky-wrapper ${isSticky ? 'sticky' : ''}`}>
//       <div id="will-be-sticky">{children}</div>
//     </StyledStickyElementWrapper>
//   );
// };

const StickyElementWrapper = ({ children }: StickyElementWrapperProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const stickyEl = useRef(null);

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      // Calculate the scroll position and the child element's position
      const mainElement = stickyEl.current;

      if (!mainElement) return;

      const mainElementRect = mainElement.getBoundingClientRect();

      // Check if the main element is out of the viewport
      if (mainElementRect.bottom <= window.innerHeight) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    // Add an event listener to monitor scroll position
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
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
