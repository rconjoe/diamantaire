import { FreezeBody, UIString } from '@diamantaire/darkside/components/common-ui';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { updateItemQuantity } from '@diamantaire/darkside/data/api';
import { useCartData, useCartInfo } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice, getVat, parseValidLocale } from '@diamantaire/shared/constants';
import { getRelativeUrl } from '@diamantaire/shared/helpers';
import { XIcon } from '@diamantaire/shared/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import CartFooter from './cart-items/CartFooter';
import CartNote from './cart-items/CartNote';
import MultiVariantCartItem from './cart-items/MultiVariantCartItem';
import SingleVariantCartItem from './cart-items/SingleVariantCartItem';
import { CartOverlay, CartStyles } from './Cart.style';
import CartGWP from './CartGWP';

const Cart = ({ closeCart }) => {
  const { locale } = useRouter();

  const { data: checkout, refetch } = useCartData(locale);

  console.log('checkout', checkout);

  const updateGlobalContext = useContext(GlobalUpdateContext);

  const isCartEmpty = !checkout || checkout?.totalQuantity === 0 ? true : false;

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
    'Ring',
    'Gift Card',
    'Ring Sizer',
  ];

  const {
    cartHeader,
    subtotalCopy,
    euSubtotalCopy,
    cartCtaCopy,
    termsAndConditionsCtaCopy,
    termsAndConditionsCtaLink,
    emptyCartMainCopy,
    emptyCartMainCtaCopy,
    emptyCartMainCtaLink,
    addNoteOptionCta,
    updateNoteOptionCta,
    removeNoteOptionCta,
  } = cartCopy?.[0] || {};

  useEffect(() => {
    // Fetch latest cart data
    refetch();
  }, []);

  const { countryCode } = parseValidLocale(locale);

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
          <div className="cart__items">
            <div className="cart__items-inner">
              <div className="gwp">
                <CartGWP />
              </div>
              {checkout?.lines?.map((item) => {
                const cartItemInfo = {
                  _productType: null,
                  childProduct: null,
                };

                const childProductAttribute = item.attributes?.find((attr) => attr.key === 'childProduct');
                const engravingProductAttribute = item.attributes?.find((attr) => attr.key === 'engravingProduct');
                const isHiddenProduct = item.attributes?.find((attr) => attr.key === '_hiddenProduct');

                const hasChildProduct =
                  (childProductAttribute &&
                    childProductAttribute?.value !== null &&
                    JSON.parse(childProductAttribute?.value).behavior !== 'duplicate') ||
                  (engravingProductAttribute &&
                    engravingProductAttribute?.value !== null &&
                    JSON.parse(engravingProductAttribute?.value).behavior !== 'duplicate');

                item.attributes?.map((attr) => {
                  cartItemInfo[attr.key] = attr.value;
                });

                // We don't show any child products in this loop, only in the multi-variant cart item
                if (item.attributes.find((item) => item.key === 'isChildProduct') || isHiddenProduct) {
                  return null;
                }

                if (hasChildProduct) {
                  // Builder Products
                  return (
                    <MultiVariantCartItem
                      item={item}
                      info={cartItemInfo}
                      updateItemQuantity={updateItemQuantity}
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
                      certificate={certificates?.[0]}
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
                    {/* they prob mean this.... */}
                    {/* {parseFloat(checkout?.cost?.subtotalAmount?.amount) > 500 && (
                      <UIString>Orders over $500 require a signature upon delivery.</UIString>
                    )} */}

                    <UIString>Orders over $500 require a signature upon delivery.</UIString>
                  </p>
                  <hr />
                  <div className="cart-subtotal__summary">
                    <p>
                      {getVat(countryCode) ? euSubtotalCopy : subtotalCopy} <br />{' '}
                    </p>
                    <p>{getFormattedPrice(parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100, locale)}</p>
                  </div>
                  <CartNote
                    actions={{
                      add: addNoteOptionCta,
                      update: updateNoteOptionCta,
                      remove: removeNoteOptionCta,
                    }}
                  />
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
