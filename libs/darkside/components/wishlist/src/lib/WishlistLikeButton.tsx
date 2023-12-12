import { GlobalContext, GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { LoveIcon, LoveIconActive } from '@diamantaire/shared/icons';
import { useCallback, useContext, useEffect, useState } from 'react';

import { StyledWishlistLikeButton } from './WishlistLikeButton.style';

interface WishlistLikeButtonProps {
  extraClass?: string;
  productId?: string;
}

const WishlistLikeButton: React.FC<WishlistLikeButtonProps> = (props) => {
  const { productId, extraClass } = props;

  const [active, setActive] = useState(false);

  const updateGlobalContext = useContext(GlobalUpdateContext);

  const { isWishlistUpdated } = useContext(GlobalContext);

  const handleStorage = useCallback(
    (isActive) => {
      const list = isActive
        ? [...getLocalStorageWishlist(), productId]
        : [...getLocalStorageWishlist().filter((v) => v !== productId)];

      localStorage.setItem('diamantaireWishlist', list.join(','));

      updateGlobalContext({
        isWishlistUpdated: isWishlistUpdated + 1,
      });
    },
    [productId, isWishlistUpdated, updateGlobalContext],
  );

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();

      handleStorage(!active);

      setActive(!active);
    },
    [handleStorage, active],
  );

  useEffect(() => {
    if (productId) {
      setActive(getLocalStorageWishlist().includes(productId));
    }
  }, [productId]);

  if (!productId) return;

  return (
    <StyledWishlistLikeButton className={extraClass}>
      <button className={`wishlist-like-button ${active ? 'active' : ''}`} onClick={(e) => handleClick(e)}>
        {active ? <LoveIconActive /> : <LoveIcon />}
      </button>
    </StyledWishlistLikeButton>
  );
};

export { WishlistLikeButton };
