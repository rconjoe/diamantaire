import mergeAllDiamonds from './mergeAllDiamonds';

describe('mergeAllDiamonds', () => {
  it('converts the diamonds object and flattens it', () => {
    const diamonds = {
      'round-brilliant': [{ lotId: '12345' }, { lotId: '54321' }],
      emerald: [{ lotId: '11111' }, { lotId: '22222' }],
      oval: [{ lotId: '33333' }],
    };
    const expectedResult = [
      { lotId: '12345' },
      { lotId: '54321' },
      { lotId: '11111' },
      { lotId: '22222' },
      { lotId: '33333' },
    ];

    expect(mergeAllDiamonds(diamonds)).toEqual(expectedResult);
  });
});
