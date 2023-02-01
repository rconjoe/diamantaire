import { createCartesianSet } from './createCartesianSet';

describe('createCartesianSet() tests', () => {
  it('builds cartesian product of given sets', () => {
    const array1 = ['hello'];
    const array2 = ['where', 'am', 'i'];
    const array3 = ['right', 'here', 'ok'];
    const actual = [...createCartesianSet(array1, array2, array3)];
    const expected = [
      ['hello', 'where', 'right'],
      ['hello', 'am', 'right'],
      ['hello', 'i', 'right'],
      ['hello', 'where', 'here'],
      ['hello', 'am', 'here'],
      ['hello', 'i', 'here'],
      ['hello', 'where', 'ok'],
      ['hello', 'am', 'ok'],
      ['hello', 'i', 'ok'],
    ];

    expect(actual).toEqual(expected);
  });
});
