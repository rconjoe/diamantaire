import { calculateMaxWidthBP } from './mediaQueries';

describe('calculateMaxWidthBP() tests', () => {
  it('correctly takes a breakpoint returns a new bp minus 0.1rem', () => {
    const actual = calculateMaxWidthBP('50rem');
    const expected = '49.9rem';

    expect(actual).toEqual(expected);
  });
});
