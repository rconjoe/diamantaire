import { createContext, useEffect, useState } from 'react';
import { Checkout } from 'shopify-buy';

import { client } from './client';

interface CartContextValues {
  addJewelryProductToCart: (
    variantId: string,
    pdpTitle: string,
    jewelryCategory: string,
    diamondShape: string,
    metal: string,
    size: string,
    caratWeight: string,
    image: {
      src: string;
      height: number;
      width: number;
    },
  ) => Promise<void>;
  addERProductToCartByVariantId: (
    variantId: string,
    pdpTitle: string,
    diamondShape: string,
    bandAccent: string,
    metal: string,
    ringSize: string,
    diamondInfo: string,
    image: {
      src: string;
      height: number;
      width: number;
    },
  ) => Promise<void>;
  removeAnyProductFromCart: (lineItemId: string[]) => Promise<void>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checkout: Checkout;
}

export const CartContext = createContext<CartContextValues | null>(null);
const isBrowser = typeof window !== 'undefined';

export const CartProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  async function getNewId() {
    try {
      const newCheckout = await client.checkout.create();

      if (isBrowser) {
        localStorage.setItem('checkout_id', newCheckout.id);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function initializeCheckout() {
    try {
      // Check if id exists
      const currentCheckoutId = isBrowser ? localStorage.getItem('checkout_id') : null;

      let newCheckout = null;

      if (currentCheckoutId !== null) {
        // If id exists, fetch checkout from Shopify
        newCheckout = await client.checkout.fetch(currentCheckoutId);

        if ((newCheckout && newCheckout.completedAt) || newCheckout === null) {
          newCheckout = await getNewId();
        }

        setCheckout(newCheckout);
      } else {
        // If id does not, create new checkout
        newCheckout = await client.checkout.create();
        if (isBrowser) {
          localStorage.setItem('checkout_id', newCheckout.id);
        }

        setCheckout(newCheckout);
      }
      // Set checkout to state
    } catch (e: any) {
      console.log(e.message);
      localStorage.removeItem('checkout_id');
    }
  }

  // Add single product to cart based on variant ID + customAttributes
  async function addJewelryProductToCart(
    variantId: string,
    pdpTitle: string,
    jewelryCategory: string,
    diamondShape: string,
    metal: string,
    chainLength: string,
    caratWeight: string,
    image: {
      src: string;
      height: number;
      width: number;
    },
  ) {
    try {
      const lineItems = [
        {
          variantId,
          quantity: 1,
          customAttributes: [
            {
              key: 'pdpTitle',
              value: pdpTitle,
            },
            {
              key: 'metal',
              value: metal,
            },
            {
              key: 'subCategory',
              value: jewelryCategory,
            },
            {
              key: 'diamondShape',
              value: diamondShape,
            },
            {
              key: 'caratWeight',
              value: caratWeight,
            },
            {
              key: 'chainLength',
              value: chainLength,
            },
            {
              key: '_dateAdded',
              value: Date.now().toString(),
            },
            {
              key: '_productType',
              value: 'Jewelry',
            },
            {
              key: '_image',
              value: JSON.stringify(image),
            },
          ],
        },
      ];
      // console.log("new checkout", checkout.id, lineItems);
      const newCheckout = await client.checkout.addLineItems(checkout.id, lineItems);

      setCheckout(newCheckout);
      if (!isCartOpen) {
        setIsCartOpen(true);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }

  // Custom Attributes with an _underscore don't show on the Shopify checkout
  // Add single product to cart based on variant ID
  async function addERProductToCartByVariantId(
    variantId: string,
    pdpTitle: string,
    diamondShape: string,
    bandAccent: string,
    metal: string,
    ringSize: string,
    diamondInfo: string,
    image: {
      src: string;
      height: number;
      width: number;
    },
  ) {
    try {
      const lineItems = [
        {
          variantId,
          quantity: 1,
          customAttributes: [
            {
              key: 'pdpTitle',
              value: pdpTitle,
            },
            {
              key: 'metal',
              value: metal,
            },
            {
              key: 'diamondShape',
              value: diamondShape,
            },
            {
              key: 'centerStone',
              value: diamondInfo,
            },
            {
              key: 'ringSize',
              value: ringSize,
            },
            {
              key: 'bandAccent',
              value: bandAccent,
            },
            {
              key: '_dateAdded',
              value: Date.now().toString(),
            },
            {
              key: '_image',
              value: JSON.stringify(image),
            },
            {
              key: '_productType',
              value: 'ER',
            },
          ],
        },
      ];
      // console.log("new checkout", checkout.id, lineItems);
      const newCheckout = await client.checkout.addLineItems(checkout.id, lineItems);

      setCheckout(newCheckout);
      if (!isCartOpen) {
        setIsCartOpen(true);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }

  // Remove single product from cart based on variant ID

  async function removeAnyProductFromCart(lineItemId: string[]) {
    const newCheckout = await client.checkout.removeLineItems(checkout.id, lineItemId);

    setCheckout(newCheckout);
  }

  useEffect(() => {
    initializeCheckout();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addJewelryProductToCart,
        addERProductToCartByVariantId,
        isCartOpen,
        setIsCartOpen,
        checkout,
        removeAnyProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
