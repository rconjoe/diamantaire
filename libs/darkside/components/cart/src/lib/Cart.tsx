import { useCartInfo } from '@diamantaire/darkside/data/hooks';
import { formatCurrency, getRelativeUrl } from '@diamantaire/shared/helpers';
import { XIcon } from '@diamantaire/shared/icons';
import Link from 'next/link';
import { useContext, useState } from 'react';

import CartFooter from './cart-items/CartFooter';
import SingleERVariantCartItem from './cart-items/SingleERVariantCartItem';
import SingleVariantCartItem from './cart-items/SingleVariantCartItem';
import { CartOverlay, CartStyles, FreezeBody } from './Cart.style';
import { CartContext } from './CartContext';
import { ERCartItemProps, JewelryCartItemProps } from './types';

const Cart = ({ closeCart }) => {
  const { checkout, setIsCartOpen, removeAnyProductFromCart } = useContext(CartContext);
  const [isGiftNoteOpen, setIsGiftNoteOpen] = useState(false);

  const isCartEmpty = checkout?.lineItems.length === 0;

  const { data: { cart: cartData } = {} } = useCartInfo('en_US');

  const { pageCopy: cartCopy, certificates, cartItemDetails } = cartData || {};

  const {
    cartHeader,
    subtotalCopy,
    // TODO: Create logic for EU subtotal- https://diamondfoundry.atlassian.net/jira/software/projects/DIA/boards/99/backlog?selectedIssue=DIA-176
    // euSubtotalCopy,
    cartCtaCopy,
    termsAndConditionsCtaCopy,
    termsAndConditionsCtaLink,
    addNoteOptionCta,
    emptyCartMainCopy,
    emptyCartMainCtaCopy,
    emptyCartMainCtaLink,
  } = cartCopy?.[0] || {};

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
              <button onClick={() => setIsCartOpen(false)}>
                <XIcon />
              </button>
            </div>
          </div>
          <div className="cart__items">
            <div className="cart__items-inner">
              {checkout?.lineItems?.map((product, index) => {
                const cartItemInfo: JewelryCartItemProps | ERCartItemProps = {};

                product.customAttributes?.map((attr) => {
                  cartItemInfo[attr.key] = attr.value;
                });

                if (cartItemInfo._productType === 'Jewelry') {
                  return (
                    <SingleVariantCartItem
                      product={product}
                      info={cartItemInfo}
                      removeAnyProductFromCart={removeAnyProductFromCart}
                      cartItemDetails={cartItemDetails}
                      key={`cart-item-${index}`}
                    />
                  );
                } else if (cartItemInfo._productType === 'ER') {
                  return (
                    <SingleERVariantCartItem
                      product={product}
                      info={cartItemInfo}
                      certificate={certificates?.[0]}
                      cartItemDetails={cartItemDetails}
                      removeAnyProductFromCart={removeAnyProductFromCart}
                      key={`cart-item-${index}`}
                    />
                  );
                }
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
                  <p className="cart-subtotal__sig-text">Orders over $500 require a signature upon delivery.</p>
                  <hr />
                  <div className="cart-subtotal__summary">
                    <p>
                      {subtotalCopy} <br />{' '}
                      <span className="gift-note">
                        <button onClick={() => setIsGiftNoteOpen(!isGiftNoteOpen)}>{addNoteOptionCta}</button>{' '}
                        <span>(optional)</span>
                      </span>
                    </p>
                    <p>{formatCurrency({ locale: 'en-US', amount: checkout?.subtotalPrice?.amount })}</p>
                  </div>
                  {isGiftNoteOpen && (
                    <div className="cart-subtotal__gift-note">
                      <textarea name="" id=""></textarea>
                      {/* // TODO: Replace with new style guide buttons- https://diamondfoundry.atlassian.net/jira/software/projects/DIA/boards/99/backlog?selectedIssue=DIA-178 */}
                      <ul className="flex list-unstyled">
                        <li>
                          <button>Save</button>
                        </li>
                        <li>
                          <button>Cancel</button>
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
