const allProductSuggestionBlockModelIds = `
  query allProductSuggestionBlockModelIds($first: IntType!, $skip: IntType!) {
    allProductSuggestionQuadBlocks(first: $first, skip: $skip) {
      id
      name
      content {
        id
        configuration1 {
          ... on ConfigurationRecord {
            id
            _modelApiKey
          }
          ... on OmegaProductRecord {
            id
            _modelApiKey
          }
        }
        configuration2 {
          ... on ConfigurationRecord {
            id
            _modelApiKey
          }
          ... on OmegaProductRecord {
            id
            _modelApiKey
          }
        }
        configuration3 {
          ... on ConfigurationRecord {
            id
            _modelApiKey
          }
          ... on OmegaProductRecord {
            id
            _modelApiKey
          }
        }
        configuration4 {
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
  }
`;

export default allProductSuggestionBlockModelIds;
