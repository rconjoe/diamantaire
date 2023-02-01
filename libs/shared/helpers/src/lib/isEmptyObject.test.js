import isEmptyObject from './isEmptyObject';

describe('isEmptyObject', () => {
  it('returns true when passed object is empty', () => {
    const object = {};

    expect(isEmptyObject(object)).toEqual(true);
  });

  it('returns false when passed object is not empty', () => {
    const object = { a: 'blah' };

    expect(isEmptyObject(object)).toEqual(false);
  });

  it('returns false when passed object is not empty but has a keys length of 0', () => {
    const object = new Date();

    expect(isEmptyObject(object)).toEqual(false);
  });
});
