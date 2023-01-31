const cart = `
  query cartQuery($locale: SiteLocale) {
    cart(locale: $locale) {
      pageCopy {
        title
        diamondProductSubtitleCopy
        engagementProductSubtitleCopy
        weddingBandSubtitleCopy
        buybackProductSubtitleCopy
        emptyCartBelowTitleCopy
        emptyCartMainCopy
        emptyCartMainCtaCopy
        emptyCartMainCtaLink
        termsAndConditionsCtaCopy
        termsAndConditionsCtaLink
        shippingCopy
        freeShippingCopy
        subtotalCopy
        euSubtotalCopy
        belowCartCopy
        cartCtaCopy
        signatureRequiredCopy
        signatureRequiredCtaCopy
        signatureRequiredInfoCopy
        signatureRequiredCtaLink
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
        diamondUnavailableErrorLinkCopy
        diamondUnavailableErrorMessage
      }
      certificates {
        title
        price
        copy
      }
      productDetailInOrder {
        label
        option
        optionMapper {
          map {
            key
            value
          }
        }
      }
      diamondDetailInOrder {
        label
        option
        optionMapper {
          map {
            key
            value
          }
        }
      }
      mappers {
        title
        map {
          key
          value
        }
      }
    }
  }
`;

export default cart;
