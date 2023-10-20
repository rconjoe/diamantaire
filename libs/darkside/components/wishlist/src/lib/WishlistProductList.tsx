import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { useEffect, useState } from 'react';

const WishlistProductList: React.FC = () => {
  const [wishlist, setWishlist] = useState([]);

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
      {wishlist.map((productId, index) => {
        return <div key={index}>{productId}</div>;
      })}
    </div>
  );
};

export { WishlistProductList };
