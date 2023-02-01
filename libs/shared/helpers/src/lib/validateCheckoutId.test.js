import { validateCheckoutId } from './';

describe('validateCheckoutId()', () => {
  it('updates id if different', () => {
    const existingId = 'old-id';
    const newId = 'new-id';
    const actual = validateCheckoutId(newId, existingId);
    const expected = 'new-id';

    expect(actual).toEqual(expected);
  });

  it('returns same id if same', () => {
    const existingId = 'same-id';
    const newId = 'same-id';
    const actual = validateCheckoutId(newId, existingId);
    const expected = 'same-id';

    expect(actual).toEqual(expected);
  });
});
