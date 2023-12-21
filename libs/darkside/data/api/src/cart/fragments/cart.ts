import { gql } from 'graphql-request';

import productFragment from './product';

const cartFragment = gql`
  fragment cart on Cart {
    id
    buyerIdentity {
      email
      countryCode
    }
    checkoutUrl
    note
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              sku
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              product {
                ...product
              }
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    totalQuantity
  }
  ${productFragment}
`;

export default cartFragment;
