import { SlideOut } from '@diamantaire/darkside/components/common-ui';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { AnimatePresence } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';

import { WishlistProductList } from './WishlistProductList';

const WishlistSlideOut: React.FC = () => {
  const { isMobile } = useContext(GlobalContext);

  const [scrollPosition, setScrollPosition] = useState(0);

  const [active, setActive] = useState(false);

  const handleOpen = () => {
    const currentScrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

    setScrollPosition(currentScrollPosition);

    setActive(true);
  };

  const handleClose = () => {
    setActive(false);
  };

  useEffect(() => {
    window.addEventListener('WISHLIST_SLIDEOUT', handleOpen);

    return () => {
      window.removeEventListener('WISHLIST_SLIDEOUT', handleOpen);
    };
  });

  return (
    <AnimatePresence>
      {active && (
        <SlideOut
          title={'Your Wishlist'}
          onClose={handleClose}
          width={isMobile ? '100%' : '560px'}
          className="slideout"
          scrollPosition={scrollPosition}
        >
          <div className="wishlist-slide-out">
            <WishlistProductList />
          </div>
        </SlideOut>
      )}
    </AnimatePresence>
  );
};

export { WishlistSlideOut };
