import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { useWishlistContent, useWishlistProduct } from '@diamantaire/darkside/data/hooks';
import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { WishListNoResultItem } from './WishlistNoResultItem';
import { WishListProductItem } from './WishlistProductItem';

const WishlistProductList: React.FC = () => {
  const [wishlist, setWishlist] = useState([]);

  const router = useRouter();

  const { locale } = router;

  const { data: { wishlist: content } = {} } = useWishlistContent(locale);

  const { data: { wishlist: { cfy = {}, diamond = {}, product = {}, bundle = {} } = {} } = {} } = useWishlistProduct(
    wishlist.join(','),
    locale,
  );

  console.log(`data`, { cfy, diamond, product, bundle });

  const handleUpdate = () => {
    setWishlist(getLocalStorageWishlist());
  };

  useEffect(() => {
    setWishlist(getLocalStorageWishlist());

    window.addEventListener('WISHLIST_UPDATE', handleUpdate);

    return () => {
      window.removeEventListener('WISHLIST_UPDATE', handleUpdate);
    };
  }, []);

  const getProductData = (id: string): any | undefined => {
    switch (true) {
      case id.includes('cfy-'):
        return cfy[id.replace('cfy-', '')] as any;
      case id.includes('diamond-'):
        return diamond[id.replace('diamond-', '')] as any;
      case id.includes('bundle-'):
        return bundle[id.replace('bundle-', '')] as any;
      case id.includes('product-'):
        return product[id.replace('product-', '')] as any;
      default:
        return null;
    }
  };

  const wishlistResult = (
    <>
      <DarksideButton type="outline">{content.shareWishlistModalTitle}</DarksideButton>

      {wishlist.map((productId, i) => (
        <WishListProductItem key={i} content={content} productId={productId} productData={getProductData(productId)} />
      ))}
    </>
  );

  const wishlistNoResult = (
    <>
      <p>{content.noResult}</p>
      {content.noResultBlocks.map((block, i) => (
        <WishListNoResultItem key={i} {...block} />
      ))}
    </>
  );

  return <div className="wishlist-product-list">{wishlist.length > 0 ? wishlistResult : wishlistNoResult}</div>;
};

export { WishlistProductList };
