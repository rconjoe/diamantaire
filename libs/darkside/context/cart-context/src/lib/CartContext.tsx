import { createContext, useEffect, useState } from 'react';
import { AttributeInput } from 'shopify-buy';

import { addToCartMutation, createCartMutation, editCartItemsMutation } from './mutations/cart';
import { getCartQuery } from './queries/cart';
import {
  Cart,
  Connection,
  ExtractVariables,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
  ShopifyUpdateCartOperation,
} from './types';

interface CartContextValues {
  getCart: (cartId: string) => Promise<Cart | undefined>;
  addItem: (variantId: string | undefined, customAttributes?: any) => Promise<string | undefined>;
  updateItemQuantity: ({
    lineId,
    variantId,
    quantity,
    attributes,
  }: {
    lineId: string;
    variantId: string;
    quantity: number;
    attributes: AttributeInput[];
  }) => Promise<string | undefined>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checkout: Cart;
}

export const CartContext = createContext<CartContextValues | null>(null);
// const isBrowser = typeof window !== 'undefined';

const endpoint = process.env['NEXT_PUBLIC_SHOPIFY_STOREFRONT_GRAPHQL_URI'];
const key = process.env['NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN'];

export const CartProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  async function addToCart(
    cartId: string,
    lines: { merchandiseId: string; quantity: number; attributes?: AttributeInput[] }[],
  ): Promise<Cart> {
    const res = await shopifyFetch<ShopifyAddToCartOperation>({
      query: addToCartMutation,
      variables: {
        cartId,
        lines,
      },
      cache: 'no-store',
    });

    return reshapeCart(res.body.data.cartLinesAdd.cart);
  }

  const removeEdgesAndNodes = (array: Connection<any>) => {
    // This also adds duplicate nodes for products that are the same variant
    const nodes = [];

    array.edges.forEach((edge) => {
      const node = edge?.node;
      const quantity = node?.quantity;

      if (quantity > 1) {
        for (let i = 0; i < quantity; i++) {
          console.log('node', node);
          nodes.push(node);
        }
      } else {
        nodes.push(node);
      }
    });

    return nodes;
  };

  const reshapeCart = (cart: ShopifyCart): Cart => {
    if (!cart.cost?.totalTaxAmount) {
      cart.cost.totalTaxAmount = {
        amount: '0.0',
        currencyCode: 'USD',
      };
    }

    setCheckout({
      ...cart,
      lines: removeEdgesAndNodes(cart.lines),
    });

    return {
      ...cart,
      lines: removeEdgesAndNodes(cart.lines),
    };
  };

  // Saving for later
  // async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  //   const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
  //     query: removeFromCartMutation,
  //     variables: {
  //       cartId,
  //       lineIds,
  //     },
  //     cache: 'no-store',
  //   });

  //   return reshapeCart(res.body.data.cartLinesRemove.cart);
  // }

  async function updateCart(
    cartId: string,
    lines: { id: string; merchandiseId: string; quantity: number; attributes: AttributeInput[] }[],
  ): Promise<Cart> {
    const res = await shopifyFetch<ShopifyUpdateCartOperation>({
      query: editCartItemsMutation,
      variables: {
        cartId,
        lines,
      },
      cache: 'no-store',
    });

    return reshapeCart(res.body.data.cartLinesUpdate.cart);
  }

  async function getCart(cartId: string): Promise<Cart | undefined> {
    const res = await shopifyFetch<ShopifyCartOperation>({
      query: getCartQuery,
      variables: { cartId },
      cache: 'no-store',
    });

    // Old carts becomes `null` when you checkout.
    if (!res.body.data.cart) {
      return undefined;
    }

    console.log('get cart res', res);

    return reshapeCart(res.body.data.cart);
  }

  const addItem = async (
    variantId: string | undefined,
    customAttributes?: AttributeInput[],
  ): Promise<string | undefined> => {
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
      await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1, attributes: customAttributes }]);
    } catch (e) {
      return 'Error adding item to cart';
    }
  };

  const updateItemQuantity = async ({
    lineId,
    variantId,
    quantity,
    attributes,
  }: {
    lineId: string;
    variantId: string;
    quantity: number;
    attributes: AttributeInput[];
  }): Promise<string | undefined> => {
    const cartId = localStorage.getItem('cartId');

    console.log('update preview', {
      lineId,
      variantId,
      quantity,
    });

    if (!cartId) {
      return 'Missing cart ID';
    }
    try {
      await updateCart(cartId, [
        {
          id: lineId,
          merchandiseId: variantId,
          quantity,
          attributes,
        },
      ]);
    } catch (e) {
      return 'Error updating item quantity';
    }
  };

  async function initializeCheckout() {
    async function fetchCart() {
      const cartId = localStorage.getItem('cartId');

      const cart = await getCart(cartId);

      console.log('cart stat', cart);

      return cart;
    }

    async function loadCart() {
      const tempCheckout = await fetchCart();

      return setCheckout(tempCheckout);
    }

    loadCart();
  }

  useEffect(() => {
    initializeCheckout();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addItem,
        updateItemQuantity,
        isCartOpen,
        setIsCartOpen,
        getCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
