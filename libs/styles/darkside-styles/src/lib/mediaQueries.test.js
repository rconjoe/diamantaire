import { calculateMaxWidthBP } from './mediaQueries';

describe('calculateMaxWidthBP() tests', () => {
  it('correctly takes a breakpoint returns a new bp minus 1px', () => {
    const actual = calculateMaxWidthBP('500px');
    const expected = '499px';

    expect(actual).toEqual(expected);
  });
});
