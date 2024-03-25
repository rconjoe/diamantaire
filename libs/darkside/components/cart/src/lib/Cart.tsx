import { FreezeBody, Heading, Loader, UIString } from '@diamantaire/darkside/components/common-ui';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { useCartData, useCartInfo, useGlobalContext } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice, getVat, parseValidLocale } from '@diamantaire/shared/constants';
import { XIcon } from '@diamantaire/shared/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import CartFooter from './cart-items/CartFooter';
import CartItemsList from './cart-items/CartItemsList';
import CartNote from './cart-items/CartNote';
import { CartOverlay, CartStyles } from './Cart.style';
import CartGWP from './CartGWP';

const Cart = ({ closeCart }) => {
  const { locale } = useRouter();

  const { data: checkout, refetch } = useCartData(locale);

  const updateGlobalContext = useContext(GlobalUpdateContext);

  const { isCartLoading } = useGlobalContext();

  const isCartEmpty = !checkout || checkout?.totalQuantity === 0 ? true : false;

  const router = useRouter();

  const { data: { cart: cartData } = {} } = useCartInfo(router.locale);

  const { pageCopy: cartCopy } = cartData || {};

  const {
    cartHeader,
    subtotalCopy,
    euSubtotalCopy,
    cartCtaCopy,
    termsAndConditionsCtaCopy,
    termsAndConditionsCtaRoute,
    emptyCartMainCopy,
    emptyCartMainCtaCopy,
    emptyCartMainCtaRoute,
  } = cartCopy?.[0] || {};

  useEffect(() => {
    // Fetch latest cart data
    refetch();
  }, []);

  const { countryCode } = parseValidLocale(locale);

  function getCartTotal() {
    // US, CA, AUD do not have VAT pricing
    return getFormattedPrice(parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100, locale, true, false, true);
  }

  const cartTotal = getCartTotal();

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
            <Heading type="h2">{cartHeader}</Heading>

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

              <CartItemsList />
              {isCartEmpty && !isCartLoading ? (
                <div className="cart-empty-message">
                  <p>
                    {emptyCartMainCopy} <br />
                    {emptyCartMainCtaRoute && <Link href={emptyCartMainCtaRoute}>{emptyCartMainCtaCopy}</Link>}
                  </p>
                </div>
              ) : !isCartLoading ? (
                <div className="cart-subtotal">
                  <p className="cart-subtotal__sig-text">
                    <UIString>Orders over $500 require a signature upon delivery.</UIString>
                  </p>
                  <hr />
                  <div className="cart-subtotal__summary">
                    <p>
                      {getVat(countryCode) ? euSubtotalCopy : subtotalCopy} <br />{' '}
                    </p>
                    <p>{cartTotal}</p>
                  </div>
                  <CartNote />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>

          {isCartLoading && (
            <div className="cart-loader">
              <Loader color="#000" />
            </div>
          )}

          {!isCartEmpty && (
            <CartFooter
              cartTotal={cartTotal}
              checkout={checkout}
              checkoutCta={cartCtaCopy}
              termsCta={termsAndConditionsCtaCopy}
              termsCtaLink={termsAndConditionsCtaRoute}
            />
          )}
        </div>
      </CartStyles>
    </>
  );
};

export { Cart };
