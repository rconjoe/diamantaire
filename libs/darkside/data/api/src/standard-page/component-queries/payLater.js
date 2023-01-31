const payLater = `
  query payLater($locale: SiteLocale) {
  payLater(locale: $locale) {
    data {
      embedded
      title
      copy
      payPal
      klarna
      paypalSupportedCountries {
        name
        code
      }
      klarnaSupportedCountries {
        name
        code
      }
    }
  }
}
`;

export default payLater;
