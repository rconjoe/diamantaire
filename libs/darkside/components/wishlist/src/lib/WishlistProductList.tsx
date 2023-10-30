import { DarksideButton, UniLink } from '@diamantaire/darkside/components/common-ui';
import { useWishlistContent, useWishlistProduct } from '@diamantaire/darkside/data/hooks';
import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { WishListNoResultItem } from './WishlistNoResultItem';
import { WishlistProductItem } from './WishlistProductItem';
import { StyledWishlistSlideoutProductList, StyledWishlistPageProductList } from './WishlistProductList.style';

interface WishlistProductListProps {
  isWishlistPage: boolean;
}

const WishlistProductList: React.FC<WishlistProductListProps> = ({ isWishlistPage }) => {
  const [wishlist, setWishlist] = useState([]);

  const router = useRouter();

  const { locale } = router;

  const { data: { wishlist: content } = {} } = useWishlistContent(locale);

  const { data: { wishlist: { cfy = {}, diamond = {}, product = {}, bundle = {} } = {} } = {} } = useWishlistProduct(
    wishlist.join(','),
    locale,
  );

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
      <div className="cta">
        <DarksideButton type="outline">{content.shareWishlistModalTitle}</DarksideButton>
      </div>

      <div className="list">
        {wishlist.reverse().map((productId, i) => (
          <WishlistProductItem
            key={i}
            content={content}
            productId={productId}
            productData={getProductData(productId)}
            locale={locale}
            isWishlistPage={isWishlistPage}
          />
        ))}
      </div>

      {!isWishlistPage && (
        <UniLink route="/wishlist">
          <DarksideButton colorTheme="teal" type="text-underline">
            {content.buttonView}
          </DarksideButton>
        </UniLink>
      )}
    </>
  );

  const wishlistNoResult = (
    <>
      <div className="subtitle">
        <p>{content.noResult}</p>
      </div>

      <div className="list">
        {content.noResultBlocks.map((block, i) => (
          <WishListNoResultItem key={i} {...block} />
        ))}
      </div>
    </>
  );

  const result = (
    <div className={wishlist.length > 0 ? 'wishlist-product-list' : 'wishlist-no-result'}>
      {wishlist.length > 0 ? wishlistResult : wishlistNoResult}
    </div>
  );

  return isWishlistPage ? (
    <StyledWishlistPageProductList>{result}</StyledWishlistPageProductList>
  ) : (
    <StyledWishlistSlideoutProductList>{result}</StyledWishlistSlideoutProductList>
  );
};

export { WishlistProductList };
