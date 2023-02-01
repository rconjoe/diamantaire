export const isCountrySupported = (supportedCountries, countryCode) => {
  // If array is empty, support all countries
  if (
    supportedCountries?.length > 0 &&
    !supportedCountries.includes(countryCode)
  ) {
    return false;
  }

  return true;
};
