import { SlideOut } from '@diamantaire/darkside/components/common-ui';
import { GlobalContext, GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { fetchWishlistProducts } from '@diamantaire/darkside/data/api';
import { useWishlistContent } from '@diamantaire/darkside/data/hooks';
import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { WishlistProductList } from './WishlistProductList';
import { StyledWishlistSlideOut } from './WishlistSlideOut.style';

const WishlistSlideOut: React.FC = () => {
  const router = useRouter();

  const updateGlobalContext = useContext(GlobalUpdateContext);

  const { isWishlistOpen, isMobile } = useContext(GlobalContext);

  const [wishlistProductData, setWishlistProductData] = useState<any>(null);

  const { locale } = router;

  const { data: { wishlist: content } = {} } = useWishlistContent(locale);

  const getWishlistProductData = async () => {
    const res = await fetchWishlistProducts(getLocalStorageWishlist(), locale);

    return res.wishlist;
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const wishlistProducts = await getWishlistProductData();

      setWishlistProductData(wishlistProducts);

      if (isWishlistOpen) {
        const currentScrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

        setScrollPosition(currentScrollPosition);
      }
    };

    fetchData();
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
          <SlideOut title={content?.modalTitle} onClose={handleClose} className="slideout" scrollPosition={scrollPosition}>
            <div className="wishlist-slide-out">
              <WishlistProductList products={wishlistProductData} content={content} />
            </div>
          </SlideOut>
        )}
      </AnimatePresence>
    </StyledWishlistSlideOut>
  );
};

export { WishlistSlideOut };
