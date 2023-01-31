const emailPopup = `
  query emailPopup($locale: SiteLocale) {
    emailPopup(locale: $locale) {
      image {
        url
        blurUpThumb(quality: 10)
      }
      title
      copy
      countrySpecificCopy {
        countryCode
        copy
      }
      placeholder1
      placeholder2
      privacyctacopy
      privacyctalink
      submitCopy
      successCopy
      errorCopy
      copyPrices {
        prices {
          priceValue
          currencyCode
        }
      }
      supportedCountries {
        code
        name
      }
    }
  }
`;

export default emailPopup;
