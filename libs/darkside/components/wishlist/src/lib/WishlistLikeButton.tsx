import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { LoveIcon, LoveIconActive } from '@diamantaire/shared/icons';
import { useCallback, useEffect, useState } from 'react';

import { StyledWishlistLikeButton } from './WishlistLikeButton.style';

interface WishlistLikeButtonProps {
  extraClass?: string;
  productId?: string;
}

const WishlistLikeButton: React.FC<WishlistLikeButtonProps> = (props) => {
  const { productId, extraClass } = props;

  const [active, setActive] = useState(false);

  const handleStorage = (active) => {
    const list = active
      ? [...getLocalStorageWishlist(), productId]
      : [...getLocalStorageWishlist().filter((v) => v !== productId)];

    localStorage.setItem('diamantaireWishlist', list.join(','));

    window.dispatchEvent(new CustomEvent('WISHLIST_UPDATE'));
  };

  const handleClick = useCallback(() => {
    handleStorage(!active);

    setActive(!active);
  }, [active]);

  const handleUpdate = useCallback(() => {
    if (productId) {
      setActive(getLocalStorageWishlist().includes(productId));
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      setActive(getLocalStorageWishlist().includes(productId));
    }

    window.addEventListener('WISHLIST_UPDATE', handleUpdate);

    return () => {
      window.removeEventListener('WISHLIST_UPDATE', handleUpdate);
    };
  }, [productId, handleUpdate]);

  if (!productId) return;

  return (
    <StyledWishlistLikeButton className={extraClass}>
      <div className={`wishlist-like-button ${active ? 'active' : ''}`} onClick={handleClick}>
        {active ? <LoveIconActive /> : <LoveIcon />}
      </div>
    </StyledWishlistLikeButton>
  );
};

export { WishlistLikeButton };
