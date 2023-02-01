import { isCountrySupported } from './supportedCountries';

describe('isCountrySupported', () => {
  it('returns true is supportedCountries is null or undefined', () => {
    expect(isCountrySupported(null, 'US')).toBe(true);
    expect(isCountrySupported(undefined, 'US')).toBe(true);
  });

  it('returns true is supportedCountries is empty', () => {
    expect(isCountrySupported([], 'GB')).toBe(true);
  });

  it('returns false is supportedCountries has values but does not include provided country', () => {
    expect(isCountrySupported(['DE', 'US'], 'GB')).toBe(false);
  });

  it('returns true is supportedCountries includes provided country code', () => {
    expect(isCountrySupported(['GB', 'US', 'DE'], 'GB')).toBe(true);
  });
});
