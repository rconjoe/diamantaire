import { responsiveImage } from '../../modular/ResponsiveImage';

export const QuoteQuery = `
  ... on ModularQuoteBlockRecord {
    id
    _modelApiKey
    quote
    quoteFont
    quoteStyle
    attribution
    attributionFont
    backgroundColor {
      hex
    }
    textColor {
      hex
    }
    quotationMarksImage {
      ${responsiveImage(130)}
    }
  }
`;

export const SingleMediaBlockQuery = `
... on ModularSingleMediaBlockRecord {
  _modelApiKey
  id
  title
  headingType
  headingAdditionalClass
  copy
  media {
      ${responsiveImage(350)}
      video {
        streamingUrl
        thumbnailUrl
      }
  }
  supportedCountries {
    code
    name
  }
}
`;

export const ShippingProductIconListQuery = `
... on ModularShippingProductIconListItemRecord {
  id
  _modelApiKey
  shippingBusinessDays
  shippingBusinessDaysCountryMap
  shippingText
  useStaticText
  staticText
  icon {
    url
  }
  cutForYouShippingText
  cutForYouShippingDetails
  cutForYouShippingBusinessDays
  cutForYouShippingBusinessDaysCountryMap
  cutForYouReturnPolicyIcon {
    url
  }
  cutForYouReturnPolicyTitle
  cutForYouReturnPolicyDetails
}
`;

export const DIAMOND_CFY_QUERY = `
query ctoDiamondTable($locale: SiteLocale) {
  ctoDiamondTable(locale: $locale) {
    id
    seo {
      title
      description
    }
    seoResults {
      title
      description
    }
    speakWithExpert
    caratSliderTooltip {
      ${SingleMediaBlockQuery}
    }
    headerTitle
    headerCopy
    headerSubtext
    selectFromOurMostPopularShapes
    mostPopularShapes
    interestedInARareShape
    bookAnAppointmentWithADiamondExpert
    diamondSelectorTitle
    diamondSelectorSubtitle
    diamondSelectorNote
    carat
    price
    modify
    checkAvailability
    diamondResultTitle
    diamondResultTitleSecond
    diamondResultFoundTitle
    diamondResultFoundTitleMin2
    diamondResultCopy
    diamondResultCopyMin2
    diamondResultMatchTitle
    diamondResultMatchSelectedCta
    diamondResultMatchViewAllCta
    diamondResultMatchSeeMoreInventoryCta
    diamondResultComparisonGridSelect
    diamondResultComparisonGridSeeDetails
    ctoDiamondResultFoundTitle
    ctoDiamondResultCopy
    ctoDiamondResultNote
    ctoDiamondResultFinalSaleNote
    ctoDiamondResultNeedItFaster
    ctoDiamondResultHowItWorks {
      ... on ModularBlockWrapperRecord {
        _modelApiKey
        title
        headingType
        headingAdditionalClass
        additionalClass
        content {
          ... on ModularBlockWrapperModelContentField {
            blocks {
              ${SingleMediaBlockQuery}
              ${QuoteQuery}
            }
          }
        }
      }
    }
    ctoDiamondResultShapeAndWeightTitle
    ctoDiamondResultRoughImageCaption
    ctoDiamondResultPolishingPlanImageCaption
    ctoDiamondResultPolishedDiamondImageCaption
    ctoDiamondResultPolishedByDateCopy
    clarityLearnMoreLink
    cutLearnMoreLink
    colorLearnMoreLink
    diamondsNote
    notesAdditionalInfo
    diamondNotesImages {
      url
      alt
    }
    image1Caption
    image2Caption
    image3Caption
    howToAnchorLinkAndCopy
    diamondDetailsCopy
    caratWeightCopy
    caratDetails
    clarityDetails
    clarityDetailsVvsSm
    clarityDetailsVvsLg
    cutDetails
    cutDetailsRoundBrilliant
    colorDetails
    colorNearcolorlessDetails
    pricingLabel
    pricingDetails
    noDiamondsCopy
    nearColorless
    idealHearts
    diamondVariantImageCaption
    selected
    seeDetails
    selectedDiamondId
    vraiDiamondsInfo
    nonStandardShapeAppointmentsBody
    scheduleAnAppointment
    blocks {
      ... on ModularBlockWrapperRecord {
        _modelApiKey
        title
        headingType
        headingAdditionalClass
        additionalClass
        content {
          ... on ModularBlockWrapperModelContentField {
            blocks {
              ${SingleMediaBlockQuery}
              ${QuoteQuery}
            }
          }
        }
      }
    }
    ctaCopy
    bottomContentImage {
      url
      alt
    }
    productIconList {
      items {
        ${ShippingProductIconListQuery}
      }        
    }
  }
  allDiamondShapeDescriptions(locale: $locale, first: "50") {
    diamondType
    description
  }
}`;
