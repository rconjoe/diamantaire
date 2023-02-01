import { getBaseCountrySiteUrl } from './index';

describe('getBaseCountrySiteUrl', () => {
  it('US site returns US site', () => {
    expect(getBaseCountrySiteUrl('US')).toBe('https://www.vrai.com');
  });
  it('German site returns DE site', () => {
    expect(getBaseCountrySiteUrl('DE')).toBe('https://de.vrai.com');
  });
  it('Finland site returns EU site', () => {
    expect(getBaseCountrySiteUrl('FI')).toBe('https://eu.vrai.com');
  });
  it('China site returns CN site', () => {
    expect(getBaseCountrySiteUrl('CN')).toBe('http://www.vrai.cn');
  });
});
