import { SlideOut } from '@diamantaire/darkside/components/common-ui';
import { GlobalContext, GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { useWishlistContent, useWishlistProduct } from '@diamantaire/darkside/data/hooks';
import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { WishlistProductList } from './WishlistProductList';
import { StyledWishlistSlideOut } from './WishlistSlideOut.style';

const WishlistSlideOut: React.FC = () => {
  const router = useRouter();

  const updateGlobalContext = useContext(GlobalUpdateContext);

  const { isWishlistOpen } = useContext(GlobalContext);

  const { locale } = router;

  const { isMobile } = useContext(GlobalContext);

  const { data: { wishlist: content } = {} } = useWishlistContent(locale);

  const { data: { wishlist: products = {} } = {} } = useWishlistProduct(getLocalStorageWishlist(), locale);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isWishlistOpen) {
      const currentScrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

      setScrollPosition(currentScrollPosition);
    }
  }, [isWishlistOpen]);

  const handleClose = () => {
    updateGlobalContext({
      isWishlistOpen: false,
    });
  };

  router?.events?.on('routeChangeComplete', handleClose);

  return (
    <StyledWishlistSlideOut>
      <AnimatePresence>
        {isWishlistOpen && (
          <SlideOut
            title={content.modalTitle}
            onClose={handleClose}
            width={isMobile ? '100%' : '560px'}
            className="slideout"
            scrollPosition={scrollPosition}
          >
            <div className="wishlist-slide-out">
              <WishlistProductList products={products} content={content} />
            </div>
          </SlideOut>
        )}
      </AnimatePresence>
    </StyledWishlistSlideOut>
  );
};

export { WishlistSlideOut };
