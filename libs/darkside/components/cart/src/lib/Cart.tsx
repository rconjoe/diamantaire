import { FreezeBody } from '@diamantaire/darkside/components/common-ui';
import { CartContext } from '@diamantaire/darkside/context/cart-context';
import { useCartInfo } from '@diamantaire/darkside/data/hooks';
import { getRelativeUrl } from '@diamantaire/shared/helpers';
import { XIcon } from '@diamantaire/shared/icons';
import Link from 'next/link';
import { useContext, useState } from 'react';

import CartFooter from './cart-items/CartFooter';
import SingleERVariantCartItem from './cart-items/SingleERVariantCartItem';
import { CartOverlay, CartStyles } from './Cart.style';

const Cart = ({ closeCart }) => {
  const { checkout, setIsCartOpen, updateItemQuantity } = useContext(CartContext);
  const [isGiftNoteOpen, setIsGiftNoteOpen] = useState(false);

  const isCartEmpty = checkout?.lines.length === 0;

  const { data: { cart: cartData } = {} } = useCartInfo('en_US');

  const { pageCopy: cartCopy, certificates, cartItemDetails } = cartData || {};

  console.log('cartItemDetails', cartItemDetails);

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
              {checkout?.lines?.map((item) => {
                const cartItemInfo = {
                  productType: null,
                };

                item.attributes?.map((attr) => {
                  cartItemInfo[attr.key] = attr.value;
                });

                console.log('cartItemInfo', cartItemInfo);

                if (cartItemInfo.productType === 'Engagement Ring') {
                  // Standard Carat Size
                  return (
                    <SingleERVariantCartItem
                      item={item}
                      info={cartItemInfo}
                      updateItemQuantity={updateItemQuantity}
                      cartItemDetails={cartItemDetails}
                      key={`cart-item-${item.id}`}
                      certificate={certificates?.[0]}
                    />
                  );

                  // Custom Cara Size
                }

                return (
                  <>
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

                // const cartItemInfo: JewelryCartItemProps | ERCartItemProps = {};

                // product.customAttributes?.map((attr) => {
                //   cartItemInfo[attr.key] = attr.value;
                // });

                // if (cartItemInfo._productType === 'Jewelry') {
                //   return (
                //     <SingleVariantCartItem
                //       product={product}
                //       info={cartItemInfo}
                //       removeAnyProductFromCart={removeAnyProductFromCart}
                //       cartItemDetails={cartItemDetails}
                //       key={`cart-item-${index}`}
                //     />
                //   );
                // } else if (cartItemInfo._productType === 'ER') {
                //   return (
                //     <SingleERVariantCartItem
                //       product={product}
                //       info={cartItemInfo}
                //       certificate={certificates?.[0]}
                //       cartItemDetails={cartItemDetails}
                //       removeAnyProductFromCart={removeAnyProductFromCart}
                //       key={`cart-item-${index}`}
                //     />
                //   );
                // }
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
                    <p>{checkout?.cost?.subtotalAmount?.amount}</p>
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
