import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { LoveIcon, LoveIconActive } from '@diamantaire/shared/icons';

// interface WishlistSlideOutButtonProps {}

const WishlistSlideOutButton: React.FC = () => {
  const isActive = getLocalStorageWishlist()?.length;

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
