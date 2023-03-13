export const isCountrySupported = (
  supportedCountries: Array<{
    code: string;
  }>,
  countryCode,
) => {
  // If array is empty, support all countries
  const matchingCountries = supportedCountries.filter((country) => country.code === countryCode);

  if (supportedCountries?.length > 0 && matchingCountries?.length === 0) {
    return false;
  }

  return true;
};
