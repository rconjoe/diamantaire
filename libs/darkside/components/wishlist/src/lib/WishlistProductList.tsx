import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { useWishlistContent } from '@diamantaire/darkside/data/hooks';
import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { WishlistLikeButton } from './WishlistLikeButton';

const WishListProductItem: React.FC<{
  content: {
    buttonShop: string; // Add other keys here
  };
  productId?: string;
}> = ({ content: { buttonShop }, productId }) => {
  return (
    <>
      {productId}
      <WishlistLikeButton productId={productId} />
      <DarksideButton type="solid">{buttonShop}</DarksideButton>
    </>
  );
};

const WishlistProductList: React.FC = () => {
  const [wishlist, setWishlist] = useState([]);

  const router = useRouter();

  const { locale } = router;

  const { data: { wishlist: content } = {} } = useWishlistContent(locale);

  const handleUpdate = () => {
    setWishlist(getLocalStorageWishlist());
  };

  useEffect(() => {
    setWishlist(getLocalStorageWishlist());

    window.addEventListener('WISHLIST_UPDATE', handleUpdate);

    return () => {
      window.removeEventListener('WISHLIST_UPDATE', handleUpdate);
    };
  }, []);

  return (
    <div className="wishlist-product-list">
      {wishlist.map((productId, index) => (
        <WishListProductItem key={index} content={content} productId={productId} />
      ))}
    </div>
  );
};

export { WishlistProductList };
