import { media } from '@diamantaire/styles/darkside-styles';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CartStyles = styled(motion.aside)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  /* Considers Safari nav bar */
  height: 100dvh;
  overflow-y: auto;
  z-index: 10000;
  background-color: #fff;
  ${media.medium`width: 35%;`}

  .cart__header {
    text-align: center;
    padding: 2rem 0;

    h2 {
      font-size: 1.4rem;
      font-weight: 400;
    }

    .close {
      position: absolute;
      right: 2rem;
      top: 1.9rem;

      button {
        background-color: transparent;
        border: none;
        padding: 0;
      }
    }
  }
  .cart__items {
    .cart__items-inner {
      max-height: calc(100dvh - 240px);
      overflow-y: auto;
      margin: 0;
      padding: 0 2.5rem 10rem;
      ${media.medium`margin: 0 3rem 0 2rem;`}

      &::-webkit-scrollbar {
        width: 0.2rem;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        width: 0.2rem;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #888;
        width: 0.2rem;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      .cart-empty-message {
        text-align: center;
        padding-top: 4rem;
        border-top: 0.1rem solid #ccc;
        p {
          margin: 0;
          font-size: 1.4rem;
          a {
            display: inline-block;
            border-bottom: 0.1rem solid #000;
            margin-top: 1rem;
            transition: 0.25s;
            &:hover {
              opacity: 0.7;
            }
          }
        }
      }

      .cart-subtotal {
        .cart-subtotal__sig-text {
          font-size: var(--font-size-xsmall);
        }
        hr {
          background-color: #ccc;
          height: 0.1rem;
          margin-top: 1rem;
        }
        .cart-subtotal__summary {
          display: flex;
          padding-top: 1rem;
          > p {
            font-size: var(--font-size-xsmall);
            &:first-child {
              flex: 1;
            }
          }

          .gift-note {
            margin-top: 5rem;
            display: block;
          }
        }
      }
    }
  }
  .cart-subtotal__gift-note {
    margin-top: 1rem;
  }

  .cart-loader {
    text-align: center;
  }
`;

export const CartOverlay = styled(motion.button)`
  position: fixed;
  background-color: #000;
  width: 100%;
  z-index: 10000;
  height: 100%;
  top: 0;
  opacity: 0.6;
`;
