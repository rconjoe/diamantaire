const allListPageProductModelIds = `
  query queryAllListPageProductModelIds {
    allListPages(first: 100) {
      id
      configurationsInOrder {
        ... on ConfigurationRecord {
          id
          _modelApiKey
        }
        ... on OmegaProductRecord {
          id
          _modelApiKey
        }
      }
      bestSellersInOrder {
        ... on ConfigurationRecord {
          id
          _modelApiKey
        }
        ... on OmegaProductRecord {
          id
          _modelApiKey
        }
      }
    }
  }
`;

export default allListPageProductModelIds;
