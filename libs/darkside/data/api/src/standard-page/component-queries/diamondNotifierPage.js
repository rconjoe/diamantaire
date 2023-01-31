const diamondNotifierPage = `
query diamondNotifierPage($locale: SiteLocale) {
    diamondNotifierPage(locale: $locale) {
      seo {
        id
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
            }
            mobileCopy
            mobileImage {
                url
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
      }
      emailSignUpColumn {
        ctaCopy
        copy
        title
        optInCopy
      }
      ctaCopy
      ctaRoute
      successCopy
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

export default diamondNotifierPage;
