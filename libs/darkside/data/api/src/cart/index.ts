import { Cart, ExtractVariables, ShopifyCartOperation, Connection, ShopifyCart } from './cart-types';
import { getCartQuery } from './queries/cart';
import { queryDatoGQL } from '../clients';

export * from './cart-actions';

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

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart) return;

  if (!cart?.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'USD',
    };
  }

  const refinedItems = removeEdgesAndNodes(cart.lines);

  // setCheckout({
  //   ...cart,
  //   lines: removeEdgesAndNodes(cart.lines),
  // });

  return {
    ...cart,
    lines: refinedItems,
  };
};

const removeEdgesAndNodes = (array: Connection<any>) => {
  let nodes = [];

  console.log('array.edges', array.edges);

  array.edges.forEach((edge) => {
    const node = edge?.node;
    // const quantity = node?.quantity;

    // if (quantity === 0) {
    //   removeFromCart([node.id]);
    // }

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

async function getCart(_cartId: string): Promise<Cart | undefined> {
  const cartId = _cartId || localStorage.getItem('cartId');
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    cache: 'no-store',
  });

  if (!res) return;

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  console.log('get cart res', res);

  return reshapeCart(res.body.data.cart);
}

export async function fetchCartShopifyData() {
  const cartId = localStorage.getItem('cartId');
  const cartData = await getCart(cartId);

  console.log('cartData', cartData);

  return cartData;
}
