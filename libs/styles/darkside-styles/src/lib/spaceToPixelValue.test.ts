import { spaceToPixelValue } from './spaceToPixelValue';

describe('spaceToPixelValue() tests', () => {
  it('Converts space values to pixels correctly', () => {
    const actual = spaceToPixelValue(2);
    const expected = 16;

    expect(actual).toEqual(expected);
  });

  it('Converts space values to pixels correctly (B)', () => {
    const actual = spaceToPixelValue(3);
    const expected = 24;
    const floatingExpected = 24.000000000000004;

    expect(actual).toEqual(expected);
    expect(actual).not.toEqual(floatingExpected);
  });
});
