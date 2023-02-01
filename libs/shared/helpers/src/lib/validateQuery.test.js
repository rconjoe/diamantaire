import { validateQuery } from './';

describe('validateQuery()', () => {
  it('can validate a query from the url', () => {
    const fakeQuery = 'awesome';
    const fakeValidOptions = ['not-aesome', 'awesome', 'elon'];
    const actual = validateQuery(fakeQuery, fakeValidOptions);
    const expected = 'awesome';

    expect(actual).toEqual(expected);
  });

  it('returns undefined if a query is not validated', () => {
    const fakeQuery = 'awesome';
    const fakeValidOptions = ['gates', 'jobs', 'elon'];
    const actual = validateQuery(fakeQuery, fakeValidOptions);
    const expected = undefined;

    expect(actual).toEqual(expected);
  });
});
