import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { LoveIcon, LoveIconActive } from '@diamantaire/shared/icons';
import { useEffect, useState } from 'react';

// interface WishlistSlideOutButtonProps {}

const WishlistSlideOutButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('WISHLIST_SLIDEOUT'));
  };

  const handleUpdate = () => {
    setIsActive(getLocalStorageWishlist().length > 0);
  };

  useEffect(() => {
    setIsActive(getLocalStorageWishlist().length > 0);
    window.addEventListener('WISHLIST_UPDATE', handleUpdate);

    return () => {
      window.removeEventListener('WISHLIST_UPDATE', handleUpdate);
    };
  }, []);

  return (
    <div className="wishlist-slideout-button" onClick={handleClick}>
      {isActive ? <LoveIconActive /> : <LoveIcon />}
    </div>
  );
};

export { WishlistSlideOutButton };
