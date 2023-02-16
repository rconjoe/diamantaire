const diamondProductTextOnly = `
  query diamondProductTextOnly($locale: SiteLocale){
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
      content {
        ... on ModularTrio1x1BlockRecord {
          id
        }
        ... on ModularFullWidthBannerBlockRecord {
          id
        }
      }
      cutMapAbridged {
        id
        value
      }
      colorMapAbridged {
        id
        value
      }
      clarityMapAbridged {
        id
        value
      }
      cutInfoMapAbridged {
        id
        value
      }
      clarityInfoMapAbridged {
        id
        value
      }
      colorInfoMapAbridged {
        id
        value
      }
      buttonTextDiamondFlow
      buttonTextSettingFlow
      quickCheckoutText
      buttonTextModularJewelryFlow
    }
  }
`;

export default diamondProductTextOnly;
