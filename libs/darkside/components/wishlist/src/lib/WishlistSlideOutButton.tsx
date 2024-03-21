import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { LoveIcon, LoveIconActive } from '@diamantaire/shared/icons';
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { WishlistSlideOut } from './WishlistSlideOut';

const WishlistSlideOutButton: React.FC = () => {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const { isWishlistUpdated } = useContext(GlobalContext);

  const openSlideOut = () => {
    setIsWishlistOpen(true);
  };

  const closeSlideOut = () => {
    setIsWishlistOpen(false);
  };

  useEffect(() => {
    setIsActive(getLocalStorageWishlist().length > 0);
  }, [isWishlistUpdated]);

  return (
    <>
      <div className={`wishlist-slideout-button ${isActive ? 'active' : ''}`} onClick={openSlideOut}>
        {isActive ? <LoveIconActive /> : <LoveIcon />}
      </div>

      {isWishlistOpen &&
        createPortal(<WishlistSlideOut closeSlideOut={closeSlideOut} />, document.getElementById('vrai-site'))}
    </>
  );
};

export { WishlistSlideOutButton };
