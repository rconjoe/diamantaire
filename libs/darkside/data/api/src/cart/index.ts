import { queryDatoGQL } from '../clients';

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
              termsAndConditionsCtaLink
              addNoteOptionCta
              emptyCartMainCopy
              emptyCartMainCtaCopy
              emptyCartMainCtaLink
            }
          }
    }
  `;

export async function fetchCartData(locale: string) {
  const cartData = await queryDatoGQL({
    query: CART_QUERY,
    variables: { locale },
  });

  return cartData;
}
