const engagementRingPdpCtaTextOnly = `
  query engagementRingPdpCtaTextOnly($locale: SiteLocale) {
    engagementRingPdpCta(locale: $locale) {
      id
      belowOptionsCopy
      buyButtonCopy
      diamondFlowCtaCopy
      settingFlowCtaCopy
      settingFlowCtaPluralCopy
      unavailableCtaCopy
    }
  }
`;

export default engagementRingPdpCtaTextOnly;
