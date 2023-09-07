import { gql } from 'graphql-tag';

export const CREATE_CART_QUERY = gql`
  mutation cartCreate {
    cartCreate {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;
