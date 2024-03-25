import { SlideOut } from '@diamantaire/darkside/components/common-ui';
import { fetchWishlistProducts } from '@diamantaire/darkside/data/api';
import { useWishlistContent } from '@diamantaire/darkside/data/hooks';
import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { WishlistProductList } from './WishlistProductList';
import { StyledWishlistSlideOut } from './WishlistSlideOut.style';

interface WishlistSlideOutProps {
  closeSlideOut: () => void;
}

const WishlistSlideOut: React.FC<WishlistSlideOutProps> = ({ closeSlideOut }) => {
  const router = useRouter();

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

      const currentScrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

      setScrollPosition(currentScrollPosition);
    };

    fetchData();
  }, []);

  const handleClose = () => {
    closeSlideOut();
  };

  router?.events?.on('routeChangeComplete', handleClose);

  return (
    <StyledWishlistSlideOut>
      <AnimatePresence>
        <SlideOut title={content?.modalTitle} onClose={handleClose} className="slideout" scrollPosition={scrollPosition}>
          <div className="wishlist-slide-out">
            <WishlistProductList products={wishlistProductData} content={content} />
          </div>
        </SlideOut>
      </AnimatePresence>
    </StyledWishlistSlideOut>
  );
};

export { WishlistSlideOut };
