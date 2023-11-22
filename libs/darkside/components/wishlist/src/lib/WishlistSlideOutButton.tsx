import { GlobalContext, GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { LoveIcon, LoveIconActive } from '@diamantaire/shared/icons';
import { useContext, useEffect, useState } from 'react';

const WishlistSlideOutButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const updateGlobalContext = useContext(GlobalUpdateContext);

  const { isWishlistUpdated } = useContext(GlobalContext);

  const handleClick = () => {
    updateGlobalContext({
      isWishlistOpen: true,
    });
  };

  useEffect(() => {
    setIsActive(getLocalStorageWishlist().length > 0);
  }, [isWishlistUpdated]);

  return (
    <div className={`wishlist-slideout-button ${isActive ? 'active' : ''}`} onClick={handleClick}>
      {isActive ? <LoveIconActive /> : <LoveIcon />}
    </div>
  );
};

export { WishlistSlideOutButton };
