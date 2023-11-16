import { StyledWishlistSlideoutProductItem, StyledWishlistPageProductItem } from './WishlistProductItem.style';
import { CardDiamond, CardProduct, CardBundle } from './WishlistProductItemCard';

type HandleOpenDropHintModalProps = (data: { link: string; image: string }) => void;

interface WishlistProductItemProps {
  handleOpenDropHintModal: HandleOpenDropHintModalProps;
  isWishlistPage?: boolean;
  locale: string;
  content: {
    buttonShop: string;
  };
  productId?: string;
  productData?: {
    [key: string]: any;
  };
}

const WishlistProductItem: React.FC<WishlistProductItemProps> = ({
  handleOpenDropHintModal,
  productId,
  isWishlistPage,
  content: { buttonShop },
  productData,
  locale,
}) => {
  if (!productData) return;

  let card;

  // productId with following prefix are treated as diamond products
  if (productId.includes('diamond-') || productId.includes('cfy-')) {
    card = (
      <CardDiamond
        handleOpenDropHintModal={handleOpenDropHintModal}
        isWishlistPage={isWishlistPage}
        diamond={productData}
        button={buttonShop}
        locale={locale}
        id={productId}
      />
    );
  }

  // productId with following prefix are treated as regular products
  if (productId.includes('product-')) {
    const { product, content } = productData;

    card = (
      <CardProduct
        handleOpenDropHintModal={handleOpenDropHintModal}
        isWishlistPage={isWishlistPage}
        button={buttonShop}
        product={product}
        content={content}
        locale={locale}
        id={productId}
      />
    );
  }

  // productId with following prefix are treated as engagement ring products
  if (productId.includes('bundle-')) {
    card = (
      <CardBundle
        handleOpenDropHintModal={handleOpenDropHintModal}
        isWishlistPage={isWishlistPage}
        setting={productData[0]}
        diamond={productData[1]}
        button={buttonShop}
        id={productId}
        locale={locale}
      />
    );
  }

  return isWishlistPage ? (
    <StyledWishlistPageProductItem>{card}</StyledWishlistPageProductItem>
  ) : (
    <StyledWishlistSlideoutProductItem>{card}</StyledWishlistSlideoutProductItem>
  );
};

export { WishlistProductItem };
