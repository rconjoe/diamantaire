import { formatRingSize } from './index';

describe('formatRingSize', () => {
  it('Converts 5.5 to the UE format of 5,5', () => {
    expect(formatRingSize('5.5', 'de')).toBe('5,5');
  });

  it('Converts 5.25 to the UE format of 5,25', () => {
    expect(formatRingSize('5.25', 'de')).toBe('5,25');
  });

  it('Converts 5 to the UE format of 5', () => {
    expect(formatRingSize('5', 'de')).toBe('5');
  });

  it('Returns original string if a non number or number ranges such as 2-3 is provided', () => {
    const ringSizeInput = '2-3';

    expect(formatRingSize('2-3', 'de')).toBe(ringSizeInput);
  });

  it('Returns original string if en_US locale is provided', () => {
    const ringSizeInput = '5.5';

    expect(formatRingSize(ringSizeInput, 'en_US')).toBe(ringSizeInput);
  });

  it('Returns original string if en_US locale is provided', () => {
    const ringSizeInput = 'should be returned as is';

    expect(formatRingSize(ringSizeInput, 'en_US')).toBe(ringSizeInput);
  });

  it('returns properly formatted string when provided a float', () => {
    expect(formatRingSize(5.25, 'en_US')).toBe(5.25);
  });
});
