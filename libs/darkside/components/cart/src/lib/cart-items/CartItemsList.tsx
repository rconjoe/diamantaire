import { updateItemQuantity } from '@diamantaire/darkside/data/api';
import { useCartData, useCartInfo } from '@diamantaire/darkside/data/hooks';
import { useRouter } from 'next/router';

import MultiVariantCartItem from './MultiVariantCartItem';
import SingleVariantCartItem from './SingleVariantCartItem';

const SINGLE_VARIANT_PRODUCT_TYPES = [
  'Necklace',
  'Bracelet',
  'Engagement Ring',
  'Wedding Band',
  'Earrings',
  'Diamonds',
  'Diamond',
  'Ring',
  'Gift Card',
  'Ring Sizer',
];

const CartItemsList = ({ singleVariantProductTypes = SINGLE_VARIANT_PRODUCT_TYPES }) => {
  const { locale } = useRouter();

  const { data: checkout } = useCartData(locale);
  const { data: { cart: cartData } = {} } = useCartInfo(locale);

  const { certificates, cartItemDetails } = cartData || {};

  return (
    <>
      {checkout?.lines?.map((item) => {
        const cartItemInfo = {
          _productType: null,
          childProduct: null,
        };

        const childProductAttribute = item.attributes?.find((attr) => attr.key === 'childProduct');
        const engravingProductAttribute = item.attributes?.find((attr) => attr.key === 'engravingProduct');
        const isHiddenProduct = item.attributes?.find((attr) => attr.key === '_hiddenProduct');

        const hasChildProduct =
          (childProductAttribute &&
            childProductAttribute?.value !== null &&
            JSON.parse(childProductAttribute?.value).behavior !== 'duplicate') ||
          (engravingProductAttribute &&
            engravingProductAttribute?.value !== null &&
            JSON.parse(engravingProductAttribute?.value).behavior !== 'duplicate');

        item.attributes?.map((attr) => {
          cartItemInfo[attr.key] = attr.value;
        });

        // Exclude child products or hidden products in this rendering
        if (item.attributes.find((item) => item.key === 'isChildProduct') || isHiddenProduct) {
          return null;
        }

        if (hasChildProduct) {
          // Builder Products
          return (
            <MultiVariantCartItem
              item={item}
              info={cartItemInfo}
              updateItemQuantity={updateItemQuantity}
              key={`cart-item-${item.id}`}
              certificate={certificates?.[0]}
              hasChildProduct={hasChildProduct}
            />
          );
        } else if (singleVariantProductTypes.includes(cartItemInfo._productType)) {
          // Non-Builder Products + Paired Earing Products
          return (
            <SingleVariantCartItem
              item={item}
              info={cartItemInfo}
              updateItemQuantity={updateItemQuantity}
              cartItemDetails={cartItemDetails}
              key={`cart-item-${item.id}`}
              certificate={certificates?.[0]}
            />
          );
        }

        // Fallback for unexpected cases
        return null;
      })}
    </>
  );
};

export { CartItemsList };

export default CartItemsList;
