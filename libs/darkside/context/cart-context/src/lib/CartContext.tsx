import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { AttributeInput } from 'shopify-buy';

import { ERProductCartItemProps, JewelryCartItemProps } from './cart-item-types';
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
} from './cart-types';
import { addToCartMutation, createCartMutation, editCartItemsMutation, removeFromCartMutation } from './mutations/cart';
import { getCartQuery } from './queries/cart';

interface CartContextValues {
  getCart: (cartId: string) => Promise<Cart | undefined>;
  addItemToCart: (variantId: string | undefined, customAttributes?: any) => Promise<string | undefined>;
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
  removeFromCart: (lineIds: string[]) => Promise<Cart>;
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
  addERProductToCart: (data: ERProductCartItemProps) => void;
  addJewelryProductToCart: (data: JewelryCartItemProps) => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checkout: Cart;
}

export const ActionsContext = createContext(null);
export const CartContext = createContext<CartContextValues | null>(null);
// const isBrowser = typeof window !== 'undefined';

const endpoint = process.env['NEXT_PUBLIC_SHOPIFY_STOREFRONT_GRAPHQL_URI'];
const key = process.env['NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN'];

export const CartProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { locale } = useRouter();

  const { refetch } = useQuery({
    ...queries.cart.checkout(locale),
  });

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
    let nodes = [];

    console.log('array.edges', array.edges);

    array.edges.forEach((edge) => {
      const node = edge?.node;
      const quantity = node?.quantity;

      if (quantity === 0) {
        removeFromCart([node.id]);
      }

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
  async function removeFromCart(lineIds: string[]): Promise<Cart> {
    let cartId = localStorage.getItem('cartId');
    let cart;

    if (cartId) {
      cart = await getCart(cartId);
      cartId = cart.id;
      localStorage.setItem('cartId', cartId);
    }

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
      await addToCart(cartId, [{ merchandiseId: variantId, quantity: quantity || 1, attributes: customAttributes }]).then(
        () => {
          refetch();
        },
      );
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
          quantity?: number;
        }[]
      | undefined,
  ): Promise<string | undefined> => {
    console.log('customized item getting', items);
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
      const newItem = { merchandiseId: item.variantId, quantity: item?.quantity || 1, attributes: item.customAttributes };

      return refinedItems.push(newItem);
    });

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
    console.log('itemsss', items);

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

    console.log('updateMultipleItemsQuantity refinedItems', refinedItems);

    if (!cartId) {
      return 'Missing cart ID';
    }
    try {
      await updateCart(cartId, refinedItems).then(() => refetch());
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
      ]).then(() => refetch());
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

  // ===== ADD TO CART =====

  /**
   * This function works for both ER with a preset diamond, and ER with a custom diamond
   * There are duplicate attributes on the setting/diamond
   * Example order - https://admin.shopify.com/store/vo-live/orders/5341083074653
   */

  function addERProductToCart({
    settingVariantId,
    settingAttributes,
    diamondVariantId,
    diamondAttributes,
  }: ERProductCartItemProps) {
    console.log('getting attr', settingAttributes);

    const refinedSettingAttributes = Object.keys(settingAttributes)
      .map((key) => {
        return {
          key,
          value: settingAttributes[key],
        };
      })
      .filter((attr) => attr.value !== '' && attr.value !== null && attr.value !== undefined);

    // If no custom diamond, add the setting
    if (!diamondVariantId) {
      addItemToCart(settingVariantId, refinedSettingAttributes);
    } else {
      // If there is a custom diamond, add the setting and the diamond
      const refinedDiamondAttributes = Object.keys(diamondAttributes)
        .map((key) => {
          return {
            key,
            value: diamondAttributes[key],
          };
        })
        .filter((attr) => attr.value !== '' && attr.value !== null && attr.value !== undefined);

      console.log('refinedDiamondAttributes', refinedDiamondAttributes);

      addCustomizedItem([
        {
          variantId: settingVariantId,
          customAttributes: refinedSettingAttributes,
        },
        {
          variantId: diamondVariantId,
          customAttributes: refinedDiamondAttributes,
        },
      ]);
    }
  }

  /**
   * This function works for necklaces, bracelets, and earrings
   * Example order - https://admin.shopify.com/store/vo-live/orders/5340920119389
   */

  function addJewelryProductToCart({ variantId, attributes }: JewelryCartItemProps) {
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

        return addCustomizedItem(items);
      }
    }

    return addItemToCart(variantId, refinedAttributes);
  }

  return (
    <ActionsContext.Provider
      value={{
        addERProductToCart,
        addJewelryProductToCart,
        addItemToCart,
        addCustomizedItem,
        removeFromCart,
        updateItemQuantity,
        updateMultipleItemsQuantity,
        isCartOpen,
        setIsCartOpen,
        getCart,
      }}
    >
      <CartContext.Provider
        // @ts-expect-error  testing
        value={{
          checkout,
        }}
      >
        {children}
      </CartContext.Provider>
    </ActionsContext.Provider>
  );
};
