import { toNumber } from './';

describe('toNumber() tests', () => {
  it('correctly turns a string into a number', () => {
    const actual = toNumber('16.2rem');
    const expected = 16.2;

    expect(actual).toEqual(expected);
  });

  it('returns number if given number', () => {
    const actual = toNumber(38);
    const expected = 38;

    expect(actual).toEqual(expected);
  });

  it('returns nothing if given not a string or number', () => {
    const actual = toNumber({ a: 'blah' });
    const expected = new Error('Input is not a string or number');

    expect(actual).toEqual(expected);
  });
});
