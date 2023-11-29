import { DarksideButton, FreezeBody, UIString } from '@diamantaire/darkside/components/common-ui';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { updateItemQuantity } from '@diamantaire/darkside/data/api';
import { useCartData, useCartInfo } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { getRelativeUrl } from '@diamantaire/shared/helpers';
import { XIcon } from '@diamantaire/shared/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import CartFooter from './cart-items/CartFooter';
import MultiVariantCartItem from './cart-items/MultiVariantCartItem';
import SingleVariantCartItem from './cart-items/SingleVariantCartItem';
import { CartOverlay, CartStyles } from './Cart.style';
import CartGWP from './CartGWP';

const Cart = ({ closeCart }) => {
  const { locale } = useRouter();
  const { data: checkout, refetch } = useCartData(locale);

  const updateGlobalContext = useContext(GlobalUpdateContext);
  const [isGiftNoteOpen, setIsGiftNoteOpen] = useState(false);

  const isCartEmpty = checkout?.lines.length === 0;
  const router = useRouter();

  const { data: { cart: cartData } = {} } = useCartInfo(router.locale);

  const { pageCopy: cartCopy, certificates, cartItemDetails } = cartData || {};

  const singleVariantProductTypes = [
    'Necklace',
    'Bracelet',
    'Engagement Ring',
    'Wedding Band',
    'Earrings',
    'Diamonds',
    'Diamond',
  ];

  const {
    cartHeader,
    subtotalCopy,
    cartCtaCopy,
    termsAndConditionsCtaCopy,
    termsAndConditionsCtaLink,
    addNoteOptionCta,
    emptyCartMainCopy,
    emptyCartMainCtaCopy,
    emptyCartMainCtaLink,
  } = cartCopy?.[0] || {};

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <FreezeBody />
      <CartOverlay
        key="overlay-container"
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { opacity: 0.6 },
          collapsed: { opacity: 0 },
        }}
        transition={{
          duration: 0.25,
        }}
        onClick={() => closeCart()}
      />

      <CartStyles
        key="cart-container"
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { x: 0, opacity: 1 },
          collapsed: { x: 300, opacity: 0 },
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <div className="cart__inner">
          <div className="cart__header">
            <h2>{cartHeader}</h2>
            <div className="close">
              <button
                onClick={() =>
                  updateGlobalContext({
                    isCartOpen: false,
                  })
                }
              >
                <XIcon />
              </button>
            </div>
          </div>
          <CartGWP />
          <div className="cart__items">
            <div className="cart__items-inner">
              {checkout?.lines?.map((item) => {
                const cartItemInfo = {
                  _productType: null,
                  childProduct: null,
                };

                const childProductAttribute = item.attributes?.find((attr) => attr.key === 'childProduct');

                const hasChildProduct =
                  childProductAttribute &&
                  childProductAttribute?.value !== null &&
                  JSON.parse(childProductAttribute?.value).behavior !== 'duplicate';

                item.attributes?.map((attr) => {
                  cartItemInfo[attr.key] = attr.value;
                });

                console.log('checkout', checkout);

                // We don't show any child products in this loop, only in the multi-variant cart item
                if (item.attributes.find((item) => item.key === 'isChildProduct')) {
                  return null;
                }

                if (hasChildProduct) {
                  // Builder Products
                  return (
                    <MultiVariantCartItem
                      item={item}
                      info={cartItemInfo}
                      updateItemQuantity={updateItemQuantity}
                      cartItemDetails={cartItemDetails}
                      key={`cart-item-${item.id}`}
                      certificate={certificates?.[0]}
                      hasChildProduct={hasChildProduct}
                    />
                  );
                } else if (singleVariantProductTypes.includes(cartItemInfo._productType)) {
                  // Non-Builder Products + Paired Earing Products
                  return (
                    <SingleVariantCartItem
                      item={item}
                      info={cartItemInfo}
                      updateItemQuantity={updateItemQuantity}
                      cartItemDetails={cartItemDetails}
                      key={`cart-item-${item.id}`}
                    />
                  );
                }

                // Temp fallback while we QA
                return (
                  <>
                    <p>{cartItemInfo._productType}</p>
                    <h1>{item.merchandise.product.title}</h1>
                    <button
                      onClick={() =>
                        updateItemQuantity({
                          lineId: item.id,
                          variantId: item.merchandise.id,
                          quantity: item.quantity - 1,
                          attributes: item.attributes,
                        })
                      }
                    >
                      {' '}
                      remove
                    </button>
                  </>
                );
              })}

              {isCartEmpty ? (
                <div className="cart-empty-message">
                  <p>
                    {emptyCartMainCopy} <br />
                    {emptyCartMainCtaLink && <Link href={getRelativeUrl(emptyCartMainCtaLink)}>{emptyCartMainCtaCopy}</Link>}
                  </p>
                </div>
              ) : (
                <div className="cart-subtotal">
                  <p className="cart-subtotal__sig-text">
                    <UIString>Orders over $500 require a signature upon delivery.</UIString>
                  </p>
                  <hr />
                  <div className="cart-subtotal__summary">
                    <p>
                      {subtotalCopy} <br />{' '}
                      <span className="gift-note">
                        <button onClick={() => setIsGiftNoteOpen(!isGiftNoteOpen)}>{addNoteOptionCta}</button>{' '}
                        <span>
                          (<UIString>optional</UIString>)
                        </span>
                      </span>
                    </p>
                    <p>{getFormattedPrice(parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100, locale)}</p>
                  </div>
                  {isGiftNoteOpen && (
                    <div className="cart-subtotal__gift-note">
                      <textarea name="" id=""></textarea>
                      <ul className="flex list-unstyled align-center">
                        <li>
                          <DarksideButton>Save</DarksideButton>
                        </li>
                        <li>
                          <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsGiftNoteOpen(false)}>
                            Cancel
                          </DarksideButton>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {!isCartEmpty && (
            <CartFooter
              checkout={checkout}
              checkoutCta={cartCtaCopy}
              termsCta={termsAndConditionsCtaCopy}
              termsCtaLink={termsAndConditionsCtaLink}
            />
          )}
        </div>
      </CartStyles>
    </>
  );
};

export { Cart };
