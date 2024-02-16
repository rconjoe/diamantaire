import cartFragment from '../fragments/cart';

export const addToCartMutation = /* GraphQL */ `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`;

export const createCartMutation = /* GraphQL */ `
  mutation createCart(
    $lineItems: [CartLineInput!]
    $email: String
    $countryCode: CountryCode
    $attributes: [AttributeInput!]
  ) {
    cartCreate(
      input: { lines: $lineItems, buyerIdentity: { email: $email, countryCode: $countryCode }, attributes: $attributes }
    ) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`;

export const editCartItemsMutation = /* GraphQL */ `
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = /* GraphQL */ `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

// We will use this in the future.... Sam D.
export const updateGiftNoteMutation = /* GraphQL */ `
  mutation cartNoteUpdate($cartId: ID!, $note: String) {
    cartNoteUpdate(cartId: $cartId, note: $note) {
      cart {
        id
        note
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const cartBuyerIdentityUpdateMutation = /* GraphQL */ `
  mutation cartBuyerIdentityUpdate($cartId: ID!, $email: String, $countryCode: CountryCode) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: { email: $email, countryCode: $countryCode }) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;
