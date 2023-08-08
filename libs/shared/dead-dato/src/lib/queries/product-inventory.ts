/** @type {[type]} - Graphql query for a specific product handle */
export const INVENTORY_LEVEL_QUERY = `
query inventory($id: ID!) {
    inventoryItem(id: $id) {
      id
      tracked
      sku
      variant {
        id
        sku
        title
        availableForSale
        inventoryQuantity
        price
        storefrontId
        selectedOptions {
            name
            value
        }
        product {
          id
          title
          handle
          productType
          tags
          description
          status
          storefrontId 
          options {
            name
            values
          }
        }
      }
    }
}
`;
