import { DarksideButton } from '@diamantaire/darkside/components/common-ui';

import { WishlistLikeButton } from './WishlistLikeButton';

const WishListProductItem: React.FC<{
  content: {
    buttonShop: string;
  };
  productId?: string;
  productData?: {
    [key: string]: any;
  };
}> = ({ productId, content: { buttonShop }, productData }) => {
  console.log(`productData`, productData);

  if (productId.includes('cfy-') || productId.includes('diamond-')) {
    return (
      <div className="item-diamond">
        <p>diamond</p>
        <p>{productId}</p>
        <WishlistLikeButton productId={productId} />
        <DarksideButton type="solid">{buttonShop}</DarksideButton>
      </div>
    );
  }

  if (productId.includes('product-')) {
    return (
      <div className="item-product">
        <p>product</p>
        <p>{productId}</p>
        <WishlistLikeButton productId={productId} />
        <DarksideButton type="solid">{buttonShop}</DarksideButton>
      </div>
    );
  }

  if (productId.includes('bundle-')) {
    return (
      <div className="item-bundle">
        <p>bundle</p>
        <p>{productId}</p>
        <WishlistLikeButton productId={productId} />
        <DarksideButton type="solid">{buttonShop}</DarksideButton>
      </div>
    );
  }
};

export { WishListProductItem };
