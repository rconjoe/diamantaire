import { SlideOut } from '@diamantaire/darkside/components/common-ui';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { useWishlistContent } from '@diamantaire/darkside/data/hooks';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { WishlistProductList } from './WishlistProductList';
import { StyledWishlistSlideOut } from './WishlistSlideOut.style';

const WishlistSlideOut: React.FC = () => {
  const router = useRouter();

  const { locale } = router;

  const { isMobile } = useContext(GlobalContext);

  const { data: { wishlist: content } = {} } = useWishlistContent(locale);

  // console.log(`wishlistContent`, content);

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
    <StyledWishlistSlideOut>
      <AnimatePresence>
        {active && (
          <SlideOut
            title={content.modalTitle}
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
    </StyledWishlistSlideOut>
  );
};

export { WishlistSlideOut };
