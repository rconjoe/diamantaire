import ResponsiveImageFragment from './fragments/ResponsiveImageFragment';

const diamondProduct = `
query diamondProduct($locale: SiteLocale) {
    diamondProduct(locale: $locale) {
     header
     productTitle
     carat(markdown:false)
     cut(markdown: false)
     color(markdown: false)
     clarity(markdown: false)
     certificate(markdown: false)
     dfCertificateDetail
     certificateLabel
     originLabel
     specsHeadline
     seoFields {
        seoTitle
        seoDescription
     }
     content {
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
      }
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
     }
     productIconList {
      items {
        ... on ModularProductIconListItemRecord {
            _modelApiKey
            icon {
              url
              alt
            }
            copy
            ctaCopy
            ctaRoute
            additionalInfo {
              text
              title
              image {
                url
                alt
                responsiveImage (imgixParams: { w: 448, q: 60, auto: format }){
                  ...responsiveImageFragment
                }
              }
            }
        }
        ... on ModularShippingProductIconListItemRecord {
            id
            _modelApiKey
            shippingBusinessDays
            shippingText
            useStaticText
            staticText
            icon {
              url
              alt
            }
            shippingBusinessDaysCountryMap
        }
       }
     }
     accordionLabels {
      labels {
       ... on CaratLabelRecord {
        copy
        specName
       }
       ... on CutLabelRecord {
        copy
        specName
       }
       ... on ColorLabelRecord {
        copy
        specName
       }
       ... on ClarityLabelRecord {
        copy
        specName
       }
       ... on CertificateLabelRecord {
        copy
        specName
       }
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
     clarityInfoMapAbridged{
        key
        value
      }
     colorInfoMapAbridged{
        key
        value
      }
     cutInfoMapAbridged {
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
    clarityDiamondImage {
         url
         alt
        responsiveImage(imgixParams: {w: 375, q: 35, auto: format, fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
        }
     }
    colorDiamondImage {
         url
         alt
         responsiveImage(imgixParams: {w: 375, q: 35, auto: format, fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
        }
    }
    cutDiamondImage {
        url
        alt
        responsiveImage(imgixParams: {w: 375, q: 35, auto: format, fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
        }
    }
    buttonTextSettingFlow 
    buttonTextDiamondFlow
    buttonTextModularJewelryFlow
    quickCheckoutText
}
}   
${ResponsiveImageFragment}
`;

export default diamondProduct;
