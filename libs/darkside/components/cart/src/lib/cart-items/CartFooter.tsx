import clsx from 'clsx';
import { useState } from 'react';
import styled from 'styled-components';

import { Cart } from '../types';

const CartFooterStyles = styled.div`
  height: 17vh;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f6f6f6;
  text-align: center;
  padding: 40px 0 0;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      .checkout-button {
        background-color: #000;
        color: #fff;
        font-size: 1.9rem;
        border: 1px solid #000;
        padding: 7px 0;
        width: 100%;
        max-width: 400px;
        margin-bottom: 30px;
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
          margin-right: 10px;
          cursor: pointer;
          font-size: 22px;
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
            height: 25px;
            width: 25px;
            border-radius: 50%;
            background-color: transparent;
            border: 1px solid #dcdbd5;
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
              height: 6px;
              width: 11px;
              border-left: 2px solid white;
              border-bottom: 2px solid white;
              transform: rotate(-45deg);
              border-top-color: white;
              border-right-color: white;
              left: 6px;
              top: 7px;
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
  const [hasTermsConsent, setHasTermsConsent] = useState(true);

  return (
    <CartFooterStyles>
      <ul>
        <li>
          <button className="checkout-button">
            {checkoutCta} | {checkout?.cost?.subtotalAmount?.amount}
          </button>
        </li>
        <li>
          <span
            className={clsx('consent-container', {
              error: !hasTermsConsent,
            })}
          >
            <label className="checkbox" htmlFor="terms-consent">
              <input
                type="checkbox"
                checked={hasTermsConsent}
                id="terms-consent"
                onClick={() => setHasTermsConsent(!hasTermsConsent)}
              />
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
