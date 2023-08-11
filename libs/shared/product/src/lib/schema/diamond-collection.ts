const DIAMOND_COLLECTION_QUERY = `
    query CollectionQuery($handle: String!, $first: Int!, $after: String) {
        collection(handle: $handle) {
            id
            title
            handle
            products(first: $first, after: $after) {
                pageInfo {
                    hasNextPage
                }
                edges {
                    cursor
                    node {
                        id
                        title
                        handle
                        productType
                        tags
                        description
                        options {
                            name
                            values
                        }
                        variants(first: 200) {
                            edges {
                                node {
                                    id
                                    sku
                                    title
                                    availableForSale
                                    quantityAvailable
                                    price {
                                        amount
                                        currencyCode
                                    }
                                    selectedOptions {
                                        name
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default DIAMOND_COLLECTION_QUERY;
