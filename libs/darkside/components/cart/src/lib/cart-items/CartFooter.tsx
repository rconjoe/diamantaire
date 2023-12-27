/* eslint-disable camelcase */
import { useAnalytics } from '@diamantaire/analytics';
import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { getEmailFromCookies, updateShippingTimes } from '@diamantaire/darkside/data/api';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice, parseValidLocale } from '@diamantaire/shared/constants';
import { goToCheckoutUrl } from '@diamantaire/shared/helpers';
import { useCookieConsentContext } from '@use-cookie-consent/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

import { Cart } from '../types';

const CartFooterStyles = styled.div`
  min-height: 150px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f6f6f6;
  text-align: center;
  padding: 4rem 0 2rem;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      max-width: 40rem;
      margin: 0 auto;
      &.checkout-button {
        max-width: 40rem;
        margin: 0 auto 3rem;

        &.disabled {
          opacity: 0.5;
          pointer-events: none;
        }
      }
      .consent-container {
        background-color: transparent;
        border: none;
        display: flex;
        align-items: center;
        margin: 0 auto;
        font-size: 1.4rem;
        justify-content: center;

        .checkbox {
          display: block;
          position: relative;
          margin-right: 1rem;
          cursor: pointer;
          font-size: 2.2rem;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;

          /* Hide the browser's default checkbox */
          input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }

          /* Create a custom checkbox */
          .checkmark {
            display: block;
            height: 2.5rem;
            width: 2.5rem;
            border-radius: 50%;
            background-color: transparent;
            border: 0.1rem solid #dcdbd5;
            position: relative;

            &::before {
              content: '';
              display: inline-block;
              position: absolute;
              height: 100%;
              width: 100%;
              background-color: #dcdbd5;
              left: 0;
              border-radius: 50%;
              transform: scale(0.85);
              opacity: 0;
            }
            &::after {
              content: '';
              display: inline-block;
              position: absolute;
              height: 0.6rem;
              width: 1.1rem;
              border-left: 0.2rem solid white;
              border-bottom: 0.2rem solid white;
              transform: rotate(-45deg);
              border-top-color: white;
              border-right-color: white;
              left: 0.6rem;
              top: 0.7rem;
              opacity: 0;
            }
          }

          input:checked ~ .checkmark:before,
          input:checked ~ .checkmark:after {
            opacity: 1;
          }
        }
        .consent-link {
          text-decoration: underline;
          transition: 0.25s;

          &:hover {
            opacity: 0.7;
          }
        }
        &.error {
          color: #d0021b;
          .checkmark {
            border-color: #d0021b;
          }
          .consent-link {
            color: #d0021b;
          }
        }
      }
    }
  }
`;

type CartFooterProps = {
  checkout: Cart;
  checkoutCta: string;
  termsCta: string;
  termsCtaLink: string;
};

const CartFooter = ({ checkout, checkoutCta, termsCta, termsCtaLink }: CartFooterProps) => {
  const { locale } = useRouter();
  // Off by default in EU
  const { countryCode } = parseValidLocale(locale);
  const [hasTermsConsent, setHasTermsConsent] = useState(
    localStorage.getItem('hasTermsConsent') === 'true'
      ? true
      : countryCode !== 'US'
      ? false
      : countryCode === 'US'
      ? true
      : false,
  );
  const { checkoutStarted } = useAnalytics();

  const { _t } = useTranslations(locale);

  const { consent } = useCookieConsentContext();
  const handleCheckoutClick = () => {
    if (!hasTermsConsent) return;

    const { checkoutUrl, cost, lines, id: cartId } = checkout || {};
    const { subtotalAmount, totalTaxAmount } = cost || {};
    const { amount: subtotalAmountPrice, currencyCode } = subtotalAmount || {};
    const { amount: totalTaxAmountPrice } = totalTaxAmount || {};

    const items = lines?.map(
      ({
        merchandise,
        attributes,
        cost: {
          totalAmount: { amount: productAmount },
        },
        quantity,
      }) => {
        const { id: merchandiseID, product } = merchandise || {};
        const { title: variantTitle, tags, productType } = product || {};

        const productTitle = attributes.find(({ key }) => key === 'productTitle')?.value;
        const isChildDiamond = attributes.find(({ key }) => key === 'isChildDiamond')?.value === 'true';

        const diamondOptions = attributes
          .filter(({ key }) => ['caratWeight', 'clarity', 'cut', 'color', 'lotId'].includes(key))
          .reduce((acc, { key, value }) => {
            if (key === 'lotId') {
              return { ...acc, diamondLotId: value, lotId: value };
            }

            return { ...acc, [key]: value };
          }, {});
        const name = variantTitle || productTitle;
        const parsedId = merchandiseID.split('/').pop();

        const brand = 'VRAI';

        const options = isChildDiamond
          ? diamondOptions
          : tags
              ?.filter((tag) => tag.startsWith('_'))
              .reduce((acc, tag) => {
                const [key, value] = tag.split(':');
                const parsedKey = key.replace('_', '');

                if (parsedKey !== 'diamondType' || (parsedKey === 'diamondType' && value !== 'any')) {
                  return { ...acc, [parsedKey]: value };
                }

                return acc;
              }, {});

        return {
          item_id: parsedId,
          item_name: name,
          item_brand: brand,
          item_category: productType,
          price: productAmount,
          currency: currencyCode,
          quantity,
          ...options,
        };
      },
    );

    const eventData = {
      order_id: cartId?.split('/').pop(),
      value: subtotalAmountPrice,
      currency: currencyCode,
      tax: totalTaxAmountPrice,
      ecommerce: {
        value: subtotalAmountPrice,
        currency: currencyCode,
        checkout: {
          actionField: { step: 1 },
          products: lines?.map(
            ({
              merchandise,
              attributes,
              cost: {
                totalAmount: { amount: productAmount },
              },
              quantity,
            }) => {
              const { id: merchandiseID, product } = merchandise || {};
              const { title: variantTitle, productType } = product || {};

              const productTitle = attributes.find(({ key }) => key === 'productTitle')?.value;

              const name = variantTitle || productTitle;
              const parsedId = merchandiseID.split('/').pop();

              const brand = 'VRAI';

              return {
                id: parsedId,
                name,
                brand,
                category: productType,
                price: productAmount,
                quantity,
                currency: currencyCode,
              };
            },
          ),
        },
        items,
      },
      feedIds: (items || []).map(({ item_id }) => item_id),
    };

    checkoutStarted(eventData);
    updateShippingTimes(_t('Made-to-order. Ships by'), locale).then(() =>
      goToCheckoutUrl({ checkoutUrl, locale, consent, email: getEmailFromCookies() }),
    );
    // updateShippingTimes(_t('Made-to-order. Ships by'), locale);
  };

  function toggleConsent() {
    setHasTermsConsent(!hasTermsConsent);
    localStorage.setItem('hasTermsConsent', JSON.stringify(!hasTermsConsent));
  }

  return (
    <CartFooterStyles>
      <ul>
        <li className="checkout-button">
          <DarksideButton
            className={!hasTermsConsent ? 'disabled' : ''}
            disabled={!hasTermsConsent}
            onClick={handleCheckoutClick}
          >
            {checkoutCta} | {getFormattedPrice(parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100, locale)}
          </DarksideButton>
        </li>
        <li>
          <span
            className={clsx('consent-container', {
              error: !hasTermsConsent,
            })}
          >
            <label className="checkbox" htmlFor="terms-consent">
              <input type="checkbox" checked={hasTermsConsent} id="terms-consent" onClick={() => toggleConsent()} />
              <span className="checkmark"></span>
            </label>
            <span className="consent-link">
              <a target="_blank" href={termsCtaLink}>
                {termsCta}
              </a>
            </span>
          </span>
        </li>
      </ul>
    </CartFooterStyles>
  );
};

export default CartFooter;
