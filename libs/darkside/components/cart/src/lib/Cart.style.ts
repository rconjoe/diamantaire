import { media } from '@diamantaire/styles/darkside-styles';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CartStyles = styled(motion.aside)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 10000;
  background-color: #fff;
  ${media.medium`width: 30%;`}

  .cart__header {
    text-align: center;
    padding: 20px 0;

    h2 {
      font-size: 1.4rem;
      font-weight: 400;
    }

    .close {
      position: absolute;
      right: 20px;
      top: 19px;

      button {
        background-color: transparent;
        border: none;
        padding: 0;
      }
    }
  }
  .cart__items {
    .cart__items-inner {
      padding: 0 25px 50px;
      max-height: calc(100vh - 20vh - 61px);
      overflow-y: auto;
      margin: 0;
      ${media.medium`margin: 0 30px 0 50px;`}

      &::-webkit-scrollbar {
        width: 2px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        width: 2px;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #888;
        width: 2px;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      .cart-empty-message {
        text-align: center;
        padding-top: 40px;
        border-top: 1px solid #ccc;
        p {
          margin: 0;
          font-size: 1.4rem;
          a {
            display: inline-block;
            border-bottom: 1px solid #000;
            margin-top: 10px;
            transition: 0.25s;
            &:hover {
              opacity: 0.7;
            }
          }
        }
      }

      .cart-subtotal {
        .cart-subtotal__sig-text {
          font-size: 1.4rem;
          padding-bottom: 10px;
        }
        hr {
          background-color: #ccc;
          height: 1px;
        }
        .cart-subtotal__summary {
          display: flex;
          padding-top: 10px;
          > p {
            flex: 1;
            font-size: 1.4rem;

            &:last-child {
              text-align: right;
            }
          }
          button {
            background-color: transparent;
            border: none;
            padding: 0;
            color: var(--color-teal);
            transition: 0.25s;
            font-weight: bold;
            &:hover {
              opacity: 0.7;
            }
          }
        }
      }
    }
  }
  .cart-subtotal__gift-note {
    margin-top: 10px;
    textarea {
      border: 1px solid #000;
      width: 100%;
      min-height: 100px;
      padding: 15px;
      font-size: 1.6rem;
    }

    ul {
      margin-top: 10px;
      li {
        margin-right: 15px;
        &:last-child {
          margin-right: 0px;
        }

        button {
          font-size: 1.3rem;
        }
      }
    }
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
