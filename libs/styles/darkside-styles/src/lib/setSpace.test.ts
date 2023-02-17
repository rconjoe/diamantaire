import { setSpace } from './setSpace';

describe('setSpace() tests', () => {
  it('Outputs css ready rem values correctly', () => {
    const actual = setSpace(6);
    const expected = '4.8rem';

    expect(actual).toEqual(expected);
  });

  it('Outputs css ready rem values correctly (b)', () => {
    const actual = setSpace(50);
    const expected = '40rem';

    expect(actual).toEqual(expected);
  });

  it('Correctly handles JS floating point erros', () => {
    const actual = setSpace(3);

    /**
     * BASE .8 * 3 = 2.4000000000000004 in JS floating
     *  so the util should account for this
     */
    const expected = '2.4rem';
    const floatingExpected = '2.4000000000000004rem';

    expect(actual).toEqual(expected);
    expect(actual).not.toEqual(floatingExpected);
  });
});
