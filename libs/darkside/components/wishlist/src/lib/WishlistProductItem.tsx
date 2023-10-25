import { DarksideButton } from '@diamantaire/darkside/components/common-ui';

import { WishlistLikeButton } from './WishlistLikeButton';

const WishListProductItem: React.FC<{
  content: {
    buttonShop: string; // Add other keys here
  };
  productId?: string;
}> = ({ productId, content: { buttonShop } }) => {
  return (
    <>
      {productId}
      <WishlistLikeButton productId={productId} />
      <DarksideButton type="solid">{buttonShop}</DarksideButton>
    </>
  );
};

export { WishListProductItem };
