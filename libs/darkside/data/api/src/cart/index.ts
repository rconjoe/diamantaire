import { getCountry } from '@diamantaire/shared/helpers';

import { getCart, updateCartAttributes, updateCartBuyerIdentity, createCart } from './cart-actions';
import { queryDatoGQL } from '../clients';

export * from './cart-actions';
export * from './cart-item-types';

const CART_QUERY = `
    query cartData($locale: SiteLocale) {
        cart(locale: $locale) {
            certificates {
              title
              copy
              price
            }
            cartItemDetails: productDetailInOrder {
              label
              value: option
            }
            pageCopy {
              cartHeader:title
              createdAt
              subtotalCopy
              euSubtotalCopy
              cartCtaCopy
              termsAndConditionsCtaCopy
              termsAndConditionsCtaRoute
              addNoteOptionCta
              emptyCartMainCopy
              emptyCartMainCtaCopy
              emptyCartMainCtaRoute
              addNoteOptionCta
              updateNoteOptionCta
              removeNoteOptionCta
              uniqueDiamondAlreadyInCartErrorMessage
            }
          }
    }
  `;

export async function fetchCartDatoData(locale: string) {
  const cartData = await queryDatoGQL({
    query: CART_QUERY,
    variables: { locale },
  });

  return cartData;
}

export async function fetchCartShopifyData(locale) {
  let cartId = localStorage.getItem('cartId');

  if (!cartId) {
    const newCart = await createCart({ locale });

    localStorage.setItem('cartId', newCart.id);
    cartId = newCart.id;
  }

  let cartData = await getCart(cartId, locale);
  const countryCode = getCountry(locale);

  if (cartData && cartData?.buyerIdentity && cartData.buyerIdentity?.countryCode !== countryCode) {
    await updateCartBuyerIdentity({ locale });
    await updateCartAttributes({ locale });
    cartData = await getCart(cartId, locale);

    return cartData;
  }

  return cartData;
}
