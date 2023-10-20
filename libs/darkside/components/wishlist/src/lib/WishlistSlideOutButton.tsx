import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { LoveIcon, LoveIconActive } from '@diamantaire/shared/icons';
import { useEffect, useState } from 'react';

// interface WishlistSlideOutButtonProps {}

const WishlistSlideOutButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(getLocalStorageWishlist().length > 0);
  }, []);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('WISHLIST_SLIDEOUT'));
  };

  return (
    <div className="wishlist-slideout-button" onClick={handleClick}>
      {isActive ? <LoveIconActive /> : <LoveIcon />}
    </div>
  );
};

export { WishlistSlideOutButton };
