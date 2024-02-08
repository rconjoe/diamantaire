import { FullWidthBanner, Trio1x1 } from '../../modular';

export const DIAMOND_PDP_QUERY = `
query diamondPdpQuery($locale: SiteLocale) {
  diamondProduct(locale: $locale){
    id
    header
    productTitle
    fullProductTitle
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
      ${Trio1x1}
      ${FullWidthBanner}
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
