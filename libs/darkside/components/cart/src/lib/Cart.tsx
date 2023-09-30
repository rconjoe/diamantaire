import { DarksideButton, FreezeBody } from '@diamantaire/darkside/components/common-ui';
import { CartContext } from '@diamantaire/darkside/context/cart-context';
import { useCartInfo } from '@diamantaire/darkside/data/hooks';
import { getRelativeUrl, makeCurrencyFromShopifyPrice } from '@diamantaire/shared/helpers';
import { XIcon } from '@diamantaire/shared/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import CartFooter from './cart-items/CartFooter';
import MultiVariantCartItem from './cart-items/MultiVariantCartItem';
import SingleVariantCartItem from './cart-items/SingleVariantCartItem';
import { CartOverlay, CartStyles } from './Cart.style';

const Cart = ({ closeCart }) => {
  const { checkout, setIsCartOpen, updateItemQuantity } = useContext(CartContext);
  const [isGiftNoteOpen, setIsGiftNoteOpen] = useState(false);

  const isCartEmpty = checkout?.lines.length === 0;
  const router = useRouter();

  const { data: { cart: cartData } = {} } = useCartInfo(router.locale);

  const { pageCopy: cartCopy, certificates, cartItemDetails } = cartData || {};

  const singleVariantProductTypes = ['Necklace', 'Bracelet', 'Engagement Ring', 'Wedding Band', 'Earrings'];

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
                  _childProduct: null,
                };
                const childProductId = item.attributes.find((attr) => attr.key === '_childProduct')?.value;

                console.log('childProductId', childProductId);
                let childProduct = null;

                let hasChildProduct = false;

                const shouldShowChildProduct =
                  item.attributes?.find((attr) => attr.key === 'showChildProduct')?.value === 'true';

                item.attributes?.map((attr) => {
                  if (attr.key === 'hasChildProduct') {
                    hasChildProduct = true;
                  }
                  cartItemInfo[attr.key] = attr.value;
                });

                console.log('checkout lines', checkout.lines);

                if (hasChildProduct) {
                  childProduct =
                    checkout.lines.find((line) => line.merchandise.id === cartItemInfo._childProduct) ||
                    checkout.lines.find((line) =>
                      line.attributes.find((attr) => attr.key === '_childProduct' && attr.value === childProductId),
                    );
                }

                console.log('childProduct', childProduct);

                if (item.attributes.find((item) => item.key === 'isChildProduct')) {
                  return null;
                }

                const isProductPairedEarring = item.attributes
                  .find((item) => item.key === 'productType')
                  ?.value?.includes('Earrings');

                console.log('isProductPairedEarring', isProductPairedEarring);
                // Core: Adding a pair of earrings to cart is still adding the same variant
                if (hasChildProduct && childProduct) {
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
                      childProduct={childProduct}
                      shouldShowChildProduct={shouldShowChildProduct}
                    />
                  );
                } else if (singleVariantProductTypes.includes(cartItemInfo.productType)) {
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
                    <p>{cartItemInfo.productType}</p>
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
                    <p>{makeCurrencyFromShopifyPrice(parseFloat(checkout?.cost?.subtotalAmount?.amount))}</p>
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
