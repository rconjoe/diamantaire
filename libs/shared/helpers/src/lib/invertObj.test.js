import invertObj from './invertObj';

describe('invertObj() tests', () => {
  it('inverts an object correctly', () => {
    const object = { a: 'z', b: 'y' };
    const actual = invertObj(object);
    const expected = { z: 'a', y: 'b' };

    expect(actual).toEqual(expected);
  });
});
