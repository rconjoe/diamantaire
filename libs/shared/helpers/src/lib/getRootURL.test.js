import getRootURL from './getRootURL';

describe('getRootURL gets the base url depending on environment', () => {
  it('returns correct production URLS w/o country subdomains', () => {
    expect(getRootURL()).toBe('https://www.vrai.com');
  });
  it('returns correct production URLS w/ country subdomains', () => {
    expect(getRootURL(undefined, 'de')).toBe('https://de.vrai.com');
    expect(getRootURL(undefined, 'eu')).toBe('https://eu.vrai.com');
    expect(getRootURL(undefined, 'fr')).toBe('https://fr.vrai.com');
    expect(getRootURL(undefined, 'dk')).toBe('https://dk.vrai.com');
    expect(getRootURL(undefined, 'uk')).toBe('https://uk.vrai.com');
  });
  it('returns correct staging URLS w/o country subdomains', () => {
    expect(getRootURL('staging')).toBe('https://staging.vrai.com');
  });
  it('returns correct staging URLS w/ country subdomains', () => {
    expect(getRootURL('staging', 'de')).toBe('https://de.staging.vrai.com');
    expect(getRootURL('staging', 'eu')).toBe('https://eu.staging.vrai.com');
    expect(getRootURL('staging', 'fr')).toBe('https://fr.staging.vrai.com');
    expect(getRootURL('staging', 'dk')).toBe('https://dk.staging.vrai.com');
    expect(getRootURL('staging', 'uk')).toBe('https://uk.staging.vrai.com');
  });
});
