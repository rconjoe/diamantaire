const allProductSpecLabelCollectionsTextOnly = `
  query allProductSpecLabelCollectionsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allProductSpecLabelCollections(first: $first, skip: $skip, locale: $locale) {
      id
      labels {
        ... on RingFaceLabelRecord {
          id
          copy
        }
        ... on DiamondColorLabelRecord {
          id
          copy
        }
        ... on DiamondClarityLabelRecord {
          id
          copy
        }
        ... on BandWidthLabelRecord {
          id
          copy
        }
        ... on BandHeightLabelRecord {
          id
          copy
        }
        ... on SettingHeightLabelRecord {
          id
          copy
        }
        ... on MetalWeightLabelRecord {
          id
          copy
        }
      }
    }
  }
`;

export default allProductSpecLabelCollectionsTextOnly;
