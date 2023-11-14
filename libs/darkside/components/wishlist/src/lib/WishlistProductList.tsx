import { DarksideButton, UniLink } from '@diamantaire/darkside/components/common-ui';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { WishListNoResultItem } from './WishlistNoResultItem';
import { WishlistProductItem } from './WishlistProductItem';
import { StyledWishlistSlideoutProductList, StyledWishlistPageProductList } from './WishlistProductList.style';
import { WishlistShareModal, WishlistDropHintModal } from './WishlistShareModal';

interface WishlistProductListProps {
  isWishlistPage?: boolean;
  content?: any;
  products?: {
    cfy?: {
      [key: string]: any;
    };
    diamond?: {
      [key: string]: any;
    };
    product?: {
      [key: string]: any;
    };
    bundle?: {
      [key: string]: any;
    };
  };
}

const WishlistProductList: React.FC<WishlistProductListProps> = ({ isWishlistPage = false, products, content }) => {
  const router = useRouter();

  const { locale } = router;

  const { _t } = useTranslations(locale);

  const [wishlist, setWishlist] = useState(getLocalStorageWishlist());

  const [dropHintData, setDropHintData] = useState(null);

  const { cfy = {}, diamond = {}, product = {}, bundle = {} } = products || {};

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

  const [openShareWishlistModal, setOpenShareWishlistModal] = useState(false);

  const [openDropHintModal, setOpenDropHintModal] = useState(false);

  const handleOpenShareWishlistModal = () => {
    setOpenShareWishlistModal(true);
  };

  const handleOpenDropHintModal = (data: { link: string; image: string }) => {
    setOpenDropHintModal(true);
    setDropHintData(data);
  };

  const handleModalClose = () => {
    setOpenShareWishlistModal(false);
    setOpenDropHintModal(false);
    setDropHintData(null);
  };

  const wishlistResult = (
    <>
      <div className="cta">
        <DarksideButton type="outline" onClick={handleOpenShareWishlistModal}>
          {content.shareWishlistModalTitle}
        </DarksideButton>
      </div>

      <div className="list">
        {wishlist.map((productId, i) => (
          <WishlistProductItem
            key={i}
            locale={locale}
            content={content}
            productId={productId}
            isWishlistPage={isWishlistPage}
            productData={getProductData(productId)}
            handleOpenDropHintModal={handleOpenDropHintModal}
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

      {openShareWishlistModal && (
        <WishlistShareModal title={content?.shareWishlistModalTitle} onClose={handleModalClose} locale={locale} />
      )}

      {openDropHintModal && (
        <WishlistDropHintModal
          title={_t('Drop a hint')}
          onClose={handleModalClose}
          locale={locale}
          productImage={dropHintData?.image || ''}
          productLink={dropHintData?.link || ''}
        />
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
