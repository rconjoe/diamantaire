import { createContext, useEffect, useState } from 'react';
import { AttributeInput } from 'shopify-buy';

import { addToCartMutation, createCartMutation, editCartItemsMutation, removeFromCartMutation } from './mutations/cart';
import { getCartQuery } from './queries/cart';
import {
  Cart,
  Connection,
  ExtractVariables,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
} from './types';

interface CartContextValues {
  getCart: (cartId: string) => Promise<Cart | undefined>;
  addItem: (variantId: string | undefined, customAttributes?: any) => Promise<string | undefined>;
  addCustomizedItem: (
    items: {
      variantId: string | undefined;
      customAttributes?: AttributeInput[];
    }[],
  ) => Promise<string | undefined>;
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
  updateMultipleItemsQuantity: ({
    items,
  }: {
    items: {
      lineId: string;
      variantId: string;
      quantity: number;
      attributes: AttributeInput[];
    }[];
  }) => Promise<string | undefined>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checkout: Cart;
}

export const CartContext = createContext<CartContextValues | null>(null);
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

  const removeEdgesAndNodes = (array: Connection<any>) => {
    // This also adds duplicate nodes for products that are the same variant, and sorts by _datedAdded
    let nodes = [];
    const cartId = localStorage.getItem('cartId');

    console.log('case 1', array.edges);

    array.edges.forEach((edge) => {
      const node = edge?.node;
      const quantity = node?.quantity;

      if (quantity === 0) {
        removeFromCart(cartId, [node.id]);
      }

      if (quantity > 1) {
        for (let i = 0; i < quantity; i++) {
          nodes.push(node);
        }
      } else {
        nodes.push(node);
      }
    });

    nodes = nodes.sort((a, b) => {
      const dateA = parseFloat(a?.attributes?.filter((attr) => attr?.key === '_dateAdded')[0]?.value);
      const dateB = parseFloat(b?.attributes?.filter((attr) => attr?.key === '_dateAdded')[0]?.value);

      if (dateA && dateB) {
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      }

      return 0;
    });

    console.log('case 2', nodes);

    return nodes;
  };

  const reshapeCart = (cart: ShopifyCart): Cart => {
    console.log('reshape running', cart);
    if (!cart.cost?.totalTaxAmount) {
      cart.cost.totalTaxAmount = {
        amount: '0.0',
        currencyCode: 'USD',
      };
    }

    const refinedItems = removeEdgesAndNodes(cart.lines);

    setCheckout({
      ...cart,
      lines: removeEdgesAndNodes(cart.lines),
    });

    return {
      ...cart,
      lines: refinedItems,
    };
  };

  // Saving for later
  async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
    const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
      query: removeFromCartMutation,
      variables: {
        cartId,
        lineIds,
      },
      cache: 'no-store',
    });

    return reshapeCart(res.body.data.cartLinesRemove.cart);
  }

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

  async function getCart(): Promise<Cart | undefined> {
    const cartId = localStorage.getItem('cartId');
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

  // Customized ER
  const addCustomizedItem = async (
    items:
      | {
          variantId: string | undefined;
          customAttributes?: AttributeInput[];
        }[]
      | undefined,
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

    if (items.length === 0) {
      return 'Missing product or diamond';
    }

    const refinedItems = [];

    items?.map((item) => {
      const newItem = { merchandiseId: item.variantId, quantity: 1, attributes: item.customAttributes };

      return refinedItems.push(newItem);
    });
    console.log('addCustomizedItem refinedItems', Array.from(refinedItems));
    console.log('addCustomizedItem cartId', cartId);

    try {
      await addToCart(cartId, Array.from(refinedItems));
    } catch (e) {
      console.log('Error adding customized item to cart', e);
    }
  };

  const updateMultipleItemsQuantity = async ({
    items,
  }: {
    items: {
      lineId: string;
      variantId: string;
      quantity: number;
      attributes: AttributeInput[];
    }[];
  }): Promise<string | undefined> => {
    const cartId = localStorage.getItem('cartId');

    const refinedItems = [];

    items.map((item) => {
      const newItem = {
        id: item.lineId,
        merchandiseId: item.variantId,
        quantity: item.quantity,
        attributes: item.attributes,
      };

      return refinedItems.push(newItem);
    });

    if (!cartId) {
      return 'Missing cart ID';
    }
    try {
      await updateCart(cartId, refinedItems);
    } catch (e) {
      return 'Error updating item quantity';
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
      let cartId = localStorage.getItem('cartId');

      if (!cartId) {
        const cart = await createCart();

        cartId = cart.id;

        localStorage.setItem('cartId', cartId);

        return cart;
      } else {
        const cart = await getCart(cartId);

        return cart;
      }
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
        addCustomizedItem,
        updateItemQuantity,
        updateMultipleItemsQuantity,
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
