import { AttributeInput } from 'shopify-buy';

import { JewelryCartItemProps } from './cart-item-types';
import {
  Cart,
  Connection,
  ExtractVariables,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
} from './cart-types';
import { addToCartMutation, createCartMutation } from './mutations/cart';
import { getCartQuery } from './queries/cart';

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

async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store',
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

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

async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number; attributes?: AttributeInput[] }[],
): Promise<Cart> {
  console.log('atc is getting ', cartId, lines);
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
    cache: 'no-store',
  });

  console.log('add to cart res', res);

  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

const addItemToCart = async (
  variantId: string | undefined,
  customAttributes?: AttributeInput[],
  quantity?: number,
): Promise<string | undefined> => {
  console.log('addItemToCart running');
  let cartId = localStorage.getItem('cartId');
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    localStorage.setItem('cartId', cartId);
  }

  if (!variantId) {
    return 'Missing product variant ID';
  }

  try {
    await addToCart(cartId, [{ merchandiseId: variantId, quantity: quantity || 1, attributes: customAttributes }]);
  } catch (e) {
    return 'Error adding item to cart';
  }
};

export function addJewelryProductToCart({ variantId, attributes }: JewelryCartItemProps) {
  // shopify api won't ever take a product with an empty or null attribute value
  let refinedAttributes = Object.keys(attributes)
    .map((key) => {
      return {
        key,
        value: attributes[key],
      };
    })
    .filter((attr) => attr.value !== '' && attr.value !== null && attr.value !== undefined);

  const productType = refinedAttributes.find((attr) => attr.key === '_productType')?.value;

  // This is where we apply productType specific logic
  if (productType !== 'Wedding Band') {
    refinedAttributes = refinedAttributes.filter((attr) => attr.key !== 'ringSize');
  }

  if (productType === 'Earrings') {
    const childProduct = refinedAttributes?.find((attr) => attr.key === 'childProduct')?.value;
    const childProductParsed = childProduct && JSON.parse(childProduct);
    const childProductType = childProduct && childProductParsed?.behavior;
    const isMixedPair = refinedAttributes?.find((attr) => attr.key === 'leftOrRight')?.value === 'pair';

    // Adds a duplicate of the product to the cart for pairs of that don't come in left/right
    if (!isMixedPair && childProduct && childProductType === 'duplicate') {
      return addItemToCart(variantId, refinedAttributes, 2);
    } else if (isMixedPair && childProduct && childProductType === 'linked') {
      // This is for earrings that come in left/right, as they are multi-variant
      const additionalVariantId = childProductParsed?.additionalVariantIds?.[0];

      const items = [
        {
          variantId,
          customAttributes: [
            ...refinedAttributes,
            {
              key: 'leftOrRight',
              value: 'Left',
            },
          ],
          quantity: 1,
        },
        {
          variantId: additionalVariantId,
          customAttributes: [
            ...refinedAttributes,
            {
              key: 'leftOrRight',
              value: 'Right',
            },
            // This is how we know it's a child product (and to hide it in the cart on the checkout.lines loop)
            {
              key: 'isChildProduct',
              value: 'true',
            },
          ],
          quantity: 1,
        },
      ];

      //   return addCustomizedItem(items);
      console.log('items', items);
    }
  }

  return addItemToCart(variantId, refinedAttributes);
}
