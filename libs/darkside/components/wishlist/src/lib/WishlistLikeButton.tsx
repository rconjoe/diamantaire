import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { LoveIcon, LoveIconActive } from '@diamantaire/shared/icons';
import { useCallback, useEffect, useState } from 'react';

interface WishlistLikeButtonProps {
  productId?: string;
}

const WishlistLikeButton: React.FC<WishlistLikeButtonProps> = (props) => {
  const { productId } = props;

  const [active, setActive] = useState(false);

  const handleStorage = (active) => {
    const list = active
      ? [...getLocalStorageWishlist(), productId]
      : [...getLocalStorageWishlist().filter((v) => v !== productId)];

    localStorage.setItem('diamantaireWishlist', list.join('|'));

    window.dispatchEvent(new CustomEvent('WISHLIST_UPDATE'));
  };

  const handleClick = useCallback(() => {
    handleStorage(!active);

    setActive(!active);
  }, [active]);

  useEffect(() => {
    setActive(getLocalStorageWishlist().includes(productId));
  }, [productId]);

  return (
    <div className="wishlist-like-button" onClick={handleClick}>
      {active ? <LoveIconActive /> : <LoveIcon />}
    </div>
  );
};

export { WishlistLikeButton };
