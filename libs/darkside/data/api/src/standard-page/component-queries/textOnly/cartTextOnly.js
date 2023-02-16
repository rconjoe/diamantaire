const cartTextOnly = `
  query cartTextOnly($locale: SiteLocale){
    cart(locale: $locale){
      id
      productDetailInOrder {
        id
        label
      }
      diamondDetailInOrder {
        id
        label
      }
      pageCopy {
        id
        title
        diamondProductSubtitleCopy
        engagementProductSubtitleCopy
        weddingBandSubtitleCopy
        buybackProductSubtitleCopy
        emptyCartBelowTitleCopy
        emptyCartMainCopy
        emptyCartMainCtaCopy
        subtotalCopy
        euSubtotalCopy
        shippingCopy
        freeShippingCopy
        cartCtaCopy
        belowCartCopy
        termsAndConditionsCtaCopy
        signatureRequiredCopy
        signatureRequiredCtaCopy
        signatureRequiredInfoCopy
        addNoteOptionCta
        removeNoteOptionCta
        updateNoteOptionCta
        modifyNoteCopy
        currentNoteCopy
        addNoteOptionCopy
        earringPairCaratWeightCopy
        leftSideCopy
        rightSideCopy
        pairCopy
        singleCopy
        diamondUnavailableErrorMessage
        diamondUnavailableErrorLinkCopy
      }
      certificates {
        id
        title
        copy
        price
      }
    }
  }
`;

export default cartTextOnly;
