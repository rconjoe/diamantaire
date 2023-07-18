export const DIAMOND_PDP_QUERY = `
query diamondPdpQuery($locale: SiteLocale) {
  diamondProduct(locale: $locale){
    id
    header
    productTitle
    carat
    cut
    color
    clarity
    certificate
    dfCertificateDetail
    thirdPartyCertificateDetail
    certificateLabel
    originLabel
    specsHeadline
    seoFields {
      seoTitle
      seoDescription
    }
    content {
      ... on ModularTrio1x1BlockRecord {
        id
        _modelApiKey
        aboveCopy
        belowCopy
        title1
        copy1
        image1 {
          url
          alt
        }
        ctaCopy1
        ctaRoute1
        title2
        copy2
        image2 {
          url
          alt
        }
        ctaCopy2
        ctaRoute2
        title3
        copy3
        image3 {
          url
          alt
        }
        ctaCopy3
        ctaRoute3
      }
      ... on ModularFullWidthBannerBlockRecord {
        id
        _modelApiKey
        title
        headingType
        headingAdditionalClass
        desktopCopy
        desktopImage {
          url
          alt
        }
        mobileCopy
        mobileImage {
          url
          alt
        }
        ctaCopy
        ctaRoute
        ctaButtonType
        isTextBlockWide
        textColor
        textBlockAlignment
        ctaCopy2
        ctaRoute2
        ctaButtonType2
        openInNewWindow
        ctaCopy3
        ctaRoute3
        ctaButtonType3
        supportedCountries {
          code
          name
        }
        additionalClass
      }
    }
    specLabels {
      labels {
        ... on OriginLabelRecord {
            copy
            specName
        }
        ... on ShapeLabelRecord {
            copy
            specName
        }
        ... on MeasurementsLabelRecord {
        copy
        specName
        }
        ... on TableLabelRecord {
        copy
        specName
        }
        ... on DepthLabelRecord {
        copy
        specName
        }
        ... on SymmetryLabelRecord {
        copy
        specName
        }
        ... on PolishLabelRecord {
        copy
        specName
        }
        ... on GirdleLabelRecord {
        copy
        specName
        }
        ... on CutletLabelRecord {
        copy
        specName
        }
        ... on FluorescenceLabelRecord {
        copy
        specName
        }
      }
    }
    cutMapAbridged {
      key
      value
    }
    colorMapAbridged {
      key
      value
    }
    clarityMapAbridged {
      key
      value
    }
    cutInfoMapAbridged {
      key
      value
    }
    clarityInfoMapAbridged {
      key
      value
    }
    colorInfoMapAbridged {
      key
      value
    }
    girdleAbridged {
      key
      value
    }
    fluorescenceAbridged {
      key
      value
    }
    polishAndSymmetryAbridged {
      key
      value
    }
    buttonTextDiamondFlow
    buttonTextSettingFlow
    quickCheckoutText
    buttonTextModularJewelryFlow
  }
}`;
