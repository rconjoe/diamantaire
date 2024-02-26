import { getCountry, getFormattedShipByDate, getLanguage } from '@diamantaire/shared/helpers';
import { createShopifyVariantId } from '@diamantaire/shared-product';
import { DEFAULT_BUILDER_ENGRAVING_FONT, ENGRAVING_FONT_RENDER_MAP } from '@diamantaire/styles/darkside-styles';
import { AttributeInput } from 'shopify-buy';

import {
  ERProductCartItemProps,
  JewelryCartItemProps,
  LooseDiamondCartItemProps,
  CreateCartVariables,
  MiscCartItemProps,
} from './cart-item-types';
import {
  Cart,
  Connection,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCartUpdateGiftNoteOperation,
  ShopifyCreateCartOperation,
  ShopifyUpdateCartOperation,
  CartBuyerIdentityUpdateResponse,
  CartAttributesUpdateResponse,
  ShopifyRemoveFromCartOperation,
} from './cart-types';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  updateGiftNoteMutation,
  cartBuyerIdentityUpdateMutation,
  removeFromCartMutation,
  cartLinesUpdateMutation,
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import { getEmailFromCookies } from '../clients';
import { WEDDING_BAND_PRODUCT_TYPE } from '@diamantaire/shared/constants';

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
  variables?: Record<string, any>;
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

export async function createCart({ locale = '', lineItems = [] }): Promise<Cart> {
  const email = getEmailFromCookies();
  const countryCode = locale ? getCountry(locale) : null;
  const lang = locale ? getLanguage(locale) : null;
  const customAttributes = [{ key: 'locale', value: lang ?? '' }];
  const variables: CreateCartVariables = {
    ...(email && { email }),
    ...(countryCode && { countryCode }),
    ...(lineItems?.length > 0 && { lineItems }),
    attributes: customAttributes,
  };

  window.localStorage.setItem('locale', locale);

  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    variables,
    cache: 'no-store',
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

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

const removeEdgesAndNodes = (array: Connection<any>) => {
  let nodes = [];

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

  // setCheckout({
  //   ...cart,
  //   lines: removeEdgesAndNodes(cart.lines),
  // });

  return {
    ...cart,
    lines: refinedItems,
  };
};

export async function getCart(_cartId: string, locale?: string): Promise<Cart | undefined> {
  let cartId = _cartId || localStorage.getItem('cartId');

  if (!cartId) {
    const cart = await createCart({ locale, lineItems: [] });

    cartId = cart.id;
  }

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

  return reshapeCart(res.body.data.cart);
}

async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number; attributes?: AttributeInput[] }[],
): Promise<Cart> {
  console.log('getttinggggg', lines);
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
interface CartActionParams {
  variantId: string | undefined;
  customAttributes?: AttributeInput[];
  quantity?: number;
  locale?: string;
}

export const addItemToCart = async ({
  variantId,
  customAttributes,
  quantity,
  locale,
}: CartActionParams): Promise<string | undefined> => {
  if (!variantId) {
    return 'Missing product variant ID';
  }

  let cartId = localStorage.getItem('cartId');
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }
  if (!cart) {
    try {
      // Prepare the initial line item
      const initialItem = {
        merchandiseId: variantId,
        quantity: quantity || 1,
        attributes: customAttributes,
      };

      // Create a new cart with the initial item
      cart = await createCart({ locale, lineItems: [initialItem] });

      // Update the cart ID in local storage
      cartId = cart.id;
      localStorage.setItem('cartId', cartId);
    } catch (e) {
      return 'Error creating cart with item';
    }
  } else {
    try {
      // If a cart already exists, add the item to it
      await addToCart(cartId, [
        {
          merchandiseId: variantId,
          quantity: quantity || 1,
          attributes: customAttributes,
        },
      ]);
    } catch (e) {
      return 'Error adding item to cart';
    }
  }
};

export async function addLooseDiamondToCart({ diamondVariantId, diamondAttributes, locale }: LooseDiamondCartItemProps) {
  const refinedSettingAttributes = Object.keys(diamondAttributes)
    .map((key) => {
      return {
        key,
        value: diamondAttributes[key],
      };
    })
    .filter((attr) => attr.value !== '' && attr.value !== null && attr.value !== undefined);

  return await addItemToCart({ variantId: diamondVariantId, customAttributes: refinedSettingAttributes, locale });
}

export function addJewelryProductToCart({
  variantId,
  attributes,
  locale,
  engravingText,
  hasEngraving,
}: JewelryCartItemProps) {
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
  } else {
    // Wedding bands with engravings cost $, other jewelry items with engravings are free
    if (hasEngraving) {
      const engravingVariantId = createShopifyVariantId(12459937759298);

      // Add engraving text to setting attributes - in this case the engraving is the only child product
      refinedAttributes.filter((attr) => attr.key !== 'engravingProduct');

      refinedAttributes.push({
        key: 'engravingProduct',
        value: JSON.stringify({
          behavior: 'linked',
          additionalVariantIds: [engravingVariantId],
        }),
      });

      refinedAttributes.push({
        key: '_EngravingBack',
        value: engravingText,
      });

      if (productType === WEDDING_BAND_PRODUCT_TYPE) {
        refinedAttributes.push({
          key: '_EngravingFont',
          value: ENGRAVING_FONT_RENDER_MAP[DEFAULT_BUILDER_ENGRAVING_FONT],
        });
      }

      return addCustomizedItem(
        [
          {
            variantId: variantId,
            customAttributes: refinedAttributes,
          },
          {
            variantId: engravingVariantId,
            customAttributes: [
              {
                key: 'productAsset',
                value: attributes.productAsset,
              },
              {
                key: '_EngravingBack',
                value: engravingText,
              },
              ...(productType === WEDDING_BAND_PRODUCT_TYPE
                ? [
                    {
                      key: '_EngravingFont',
                      value: ENGRAVING_FONT_RENDER_MAP[DEFAULT_BUILDER_ENGRAVING_FONT],
                    },
                  ]
                : []),
              {
                key: '_hiddenProduct',
                value: 'true',
              },
              {
                key: 'productGroupKey',
                value: attributes.productGroupKey,
              },
              {
                key: 'engravingProduct',
                value: 'true',
              },
            ],
          },
        ],
        locale,
      );
    }
  }

  if (productType === 'Earrings') {
    const childProduct = refinedAttributes?.find((attr) => attr.key === 'childProduct')?.value;
    const childProductParsed = childProduct && JSON.parse(childProduct);
    const childProductType = childProduct && childProductParsed?.behavior;
    const isMixedPair = refinedAttributes?.find((attr) => attr.key === 'leftOrRight')?.value === 'pair';

    // Adds a duplicate of the product to the cart for pairs of that don't come in left/right
    if (!isMixedPair && childProduct && childProductType === 'duplicate') {
      return addItemToCart({ variantId, customAttributes: refinedAttributes, quantity: 2, locale });
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

      return addCustomizedItem(items, locale);
    }
  }

  // add engraving text to item for free
  if (hasEngraving) {
    refinedAttributes.push({
      key: '_EngravingBack',
      value: engravingText,
    });
  }

  return addItemToCart({ variantId, customAttributes: refinedAttributes, locale });
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

export const updateItemQuantity = async ({
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

export const updateMultipleItemsQuantity = async ({
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

// ===== ADD TO CART =====

/**
 * This function works for both ER with a preset diamond, and ER with a custom diamond
 * There are duplicate attributes on the setting/diamond
 * Example order - https://admin.shopify.com/store/vo-live/orders/5341083074653
 */

export async function addERProductToCart({
  settingVariantId,
  settingAttributes,
  diamonds,
  hasEngraving,
  engravingText,
  locale,
}: ERProductCartItemProps) {
  console.log('getting attr', settingAttributes);

  const engravingVariantId = createShopifyVariantId(12459937759298);

  let refinedSettingAttributes = Object.keys(settingAttributes)
    .map((key) => {
      return {
        key,
        value: settingAttributes[key],
      };
    })
    .filter((attr) => attr.value !== '' && attr.value !== null && attr.value !== undefined);

  // If no custom diamond, add the setting
  if (!diamonds) {
    // If engraving, update the setting attributes + add the engraving variant
    if (hasEngraving) {
      // Add engraving text to setting attributes - in this case the engraving is the only child product
      refinedSettingAttributes.filter((attr) => attr.key !== 'engravingProduct');

      refinedSettingAttributes.push({
        key: 'engravingProduct',
        value: JSON.stringify({
          behavior: 'linked',
          additionalVariantIds: [engravingVariantId],
        }),
      });

      refinedSettingAttributes.push({
        key: '_EngravingBack',
        value: engravingText,
      });

      return addCustomizedItem(
        [
          {
            variantId: engravingVariantId,
            customAttributes: [
              {
                key: 'productAsset',
                value: settingAttributes.productAsset,
              },
              {
                key: '_EngravingBack',
                value: engravingText,
              },
              {
                key: '_hiddenProduct',
                value: 'true',
              },
              {
                key: 'productGroupKey',
                value: settingAttributes.productGroupKey,
              },
              {
                key: 'engravingProduct',
                value: 'true',
              },
            ],
          },
          {
            variantId: settingVariantId,
            customAttributes: refinedSettingAttributes,
          },
        ],
        locale,
      );
    } else {
      // Add Er with preset diamond and no engraving
      return await addItemToCart({ variantId: settingVariantId, customAttributes: refinedSettingAttributes, locale });
    }
  } else {
    // If there is a custom diamond, add the setting and the diamond

    const groupedItems = diamonds.map((diamond) => {
      const refinedDiamondAttributes = Object.keys(diamond.attributes)
        .map((key) => {
          return {
            key,
            value: diamond?.attributes[key],
          };
        })
        .filter((attr) => attr.value !== '' && attr.value !== null && attr.value !== undefined);

      // Remove centerstone + diamond shape from seting
      refinedSettingAttributes = refinedSettingAttributes.filter(
        (attr) => attr.key !== 'centerStone' && attr.key !== 'diamondShape',
      );

      return {
        variantId: diamond?.variantId,
        customAttributes: refinedDiamondAttributes,
      };
    });

    groupedItems.push({
      variantId: settingVariantId,
      customAttributes: refinedSettingAttributes,
    });

    if (hasEngraving) {
      refinedSettingAttributes.push({
        key: 'engravingProduct',
        value: JSON.stringify({
          behavior: 'linked',
          additionalVariantIds: [engravingVariantId],
        }),
      });

      refinedSettingAttributes.push({
        key: '_EngravingBack',
        value: engravingText,
      });
      refinedSettingAttributes.push({
        key: '_EngravingFont',
        value: ENGRAVING_FONT_RENDER_MAP[DEFAULT_BUILDER_ENGRAVING_FONT],
      });
      groupedItems.unshift({
        variantId: engravingVariantId,
        customAttributes: [
          {
            key: 'productAsset',
            value: settingAttributes.productAsset,
          },
          {
            key: '_EngravingBack',
            value: engravingText,
          },
          {
            key: '_EngravingFont',
            value: ENGRAVING_FONT_RENDER_MAP[DEFAULT_BUILDER_ENGRAVING_FONT],
          },
          {
            key: '_hiddenProduct',
            value: 'true',
          },
          {
            key: 'productGroupKey',
            value: settingAttributes.productGroupKey,
          },
          {
            key: 'engravingProduct',
            value: 'true',
          },
        ],
      });
    }

    return addCustomizedItem(groupedItems, locale);
  }
}

// Customized ER
const addCustomizedItem = async (
  items:
    | {
        variantId: string | undefined;
        customAttributes?: AttributeInput[];
        quantity?: number;
      }[]
    | undefined,
  locale: string,
): Promise<string | undefined> => {
  console.log('customized item getting', items);
  if (!items || items.length === 0) {
    return 'Missing product or diamond';
  }

  // Refine items for cart addition
  const refinedItems = items.map((item) => ({
    merchandiseId: item.variantId,
    quantity: item?.quantity || 1,
    attributes: item.customAttributes,
  }));

  let cartId = localStorage.getItem('cartId');
  let cart;

  if (cartId) {
    cart = await getCart(cartId, locale);
  }

  // Create a new cart with initial items if no cart exists
  if (!cart) {
    try {
      cart = await createCart({ locale, lineItems: refinedItems });
      cartId = cart.id;
      localStorage.setItem('cartId', cartId);
    } catch (e) {
      console.log('Error creating cart with items', e);

      return 'Error creating cart with items';
    }
  } else {
    // If a cart exists, add items to it
    try {
      await addToCart(cartId, refinedItems);
    } catch (e) {
      console.log('Error adding customized items to cart', e);

      return 'Error adding items to cart';
    }
  }
};

// Gift Card / RingSizer
export function addMiscProductToCart({ variantId, attributes, locale }: MiscCartItemProps) {
  // shopify api won't ever take a product with an empty or null attribute value
  const refinedAttributes = Object.keys(attributes)
    .map((key) => {
      return {
        key,
        value: attributes[key],
      };
    })
    .filter((attr) => attr.value !== '' && attr.value !== null && attr.value !== undefined);

  return addItemToCart({ variantId, customAttributes: refinedAttributes, locale });
}

// Gift Note
export async function updateGiftNote({
  giftNote,
  locale,
}: {
  giftNote: string;
  locale: string;
}): Promise<Cart | string | undefined> {
  try {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      const cart = await createCart({ locale });

      cartId = cart.id;
      localStorage.setItem('cartId', cartId);
    }

    const res = await shopifyFetch<ShopifyCartUpdateGiftNoteOperation>({
      query: updateGiftNoteMutation,
      variables: {
        cartId,
        note: giftNote,
      },
      cache: 'no-store',
    });

    console.log('gift card res', res);
  } catch (e) {
    return 'Error updating gift note';
  }
}

// Specific to GWP
export async function toggleCartAddonProduct({ variantId, locale }: { variantId: string; locale: string }) {
  const cartId = localStorage.getItem('cartId');
  const cart = await getCart(cartId, locale);

  const line = cart.lines.find((line) => line.merchandise.id === variantId);

  if (line) {
    await updateItemQuantity({
      lineId: line.id,
      variantId,
      quantity: 0,
      attributes: [],
    });
  } else {
    await addItemToCart({ variantId, customAttributes: [], locale });
  }
}

export async function updateCartBuyerIdentity({ locale }) {
  const cartId = localStorage.getItem('cartId');
  const email = getEmailFromCookies();
  const countryCode = locale ? getCountry(locale) : null;

  const variables = {
    cartId,
    ...(email && { email }),
    ...(countryCode && { countryCode }),
  };

  const res = await shopifyFetch<CartBuyerIdentityUpdateResponse>({
    query: cartBuyerIdentityUpdateMutation,
    variables,
    cache: 'no-store',
  });

  return res.body.data.cartBuyerIdentityUpdate.cart;
}

export async function updateCartAttributes({ locale }) {
  const cartId = localStorage.getItem('cartId');
  const attributes = [{ key: 'locale', value: getLanguage(locale) }];

  const variables = {
    cartId,
    attributes,
  };

  const res = await shopifyFetch<CartAttributesUpdateResponse>({
    query: cartLinesUpdateMutation,
    variables,
    cache: 'no-store',
  });

  // Return the updated cart data
  return res.body.data.cartAttributesUpdate.cart;
}

// Run this when the user goes to checkout to update the line item shipping text attribute
export async function updateShippingTimes(locale) {
  const cartId = localStorage.getItem('cartId');
  const cart = await getCart(cartId, locale);

  const updatedItems = cart?.lines?.map((cartItem) => {
    const updatedAttributes = [...cartItem.attributes];

    // Extract shippingBusinessDays as an integer.
    const shippingDaysInt =
      cartItem.attributes && parseFloat(cartItem.attributes.find((item) => item.key === 'shippingBusinessDays')?.value);

    // Correctly retrieve shippingText without parsing it as a float.
    const shippingText = cartItem.attributes && cartItem.attributes.find((item) => item.key === 'shippingText')?.value;

    // Check if shippingDaysInt is valid to avoid NaN results.
    if (!isNaN(shippingDaysInt) && shippingText) {
      updatedAttributes.forEach((attr) => {
        if (attr.key === 'productIconListShippingCopy') {
          attr.value = `${shippingText} ${getFormattedShipByDate(shippingDaysInt, locale)}`;
        }
      });
    }

    const updatedItem = {
      lineId: cartItem.id,
      variantId: cartItem.merchandise.id,
      quantity: cartItem.quantity,
      attributes: updatedAttributes,
    };

    return updatedItem;
  });

  return await updateMultipleItemsQuantity({
    items: updatedItems,
  });
}
