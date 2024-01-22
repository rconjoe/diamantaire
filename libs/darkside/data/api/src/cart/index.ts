import { getCountry } from '@diamantaire/shared/helpers';

import { getCart, updateCartBuyerIdentity } from './cart-actions';
import { Cart, ExtractVariables, Connection, ShopifyCart, ShopifyCreateCartOperation } from './cart-types';
import { createCartMutation } from './mutations/cart';
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

// NEW

const endpoint = process.env['NEXT_PUBLIC_SHOPIFY_STOREFRONT_GRAPHQL_URI'];
const key = process.env['NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN'];

async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    console.log('shopifyFetch error', e);
  }
}

// React Query

async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store',
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart) return;

  if (!cart?.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'USD',
    };
  }

  const refinedItems = removeEdgesAndNodes(cart.lines);

  return {
    ...cart,
    lines: refinedItems,
  };
};

const removeEdgesAndNodes = (array: Connection<any>) => {
  let nodes = [];

  array.edges.forEach((edge) => {
    const node = edge?.node;

    nodes.push(node);
  });

  nodes = nodes.sort((a, b) => {
    const dateA = parseFloat(a?.attributes?.filter((attr) => attr?.key === '_dateAdded')[0]?.value);
    const dateB = parseFloat(b?.attributes?.filter((attr) => attr?.key === '_dateAdded')[0]?.value);

    if (dateA && dateB) {
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    }

    return 0;
  });

  return nodes;
};

export async function fetchCartShopifyData(locale) {
  let cartId = localStorage.getItem('cartId');

  if (!cartId) {
    const newCart = await createCart();

    localStorage.setItem('cartId', newCart.id);
    cartId = newCart.id;
  }

  let cartData = await getCart(cartId, locale);
  const countryCode = getCountry(locale);

  if (cartData && cartData?.buyerIdentity && cartData.buyerIdentity?.countryCode !== countryCode) {
    await updateCartBuyerIdentity({ locale });

    cartData = await getCart(cartId, locale);

    return cartData;
  }

  return cartData;
}
