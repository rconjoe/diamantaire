import orderBySlugs from './orderBySlugs';

describe('orderBySlugs', () => {
  it('orders based on slugsInOrder', () => {
    const slugsInOrder = ['eep', 'opp', 'ork', 'ah-ah'];
    const data = [{ slug: 'ork' }, { slug: 'ah-ah' }, { slug: 'eep' }];
    const valid = [{ slug: 'eep' }, { slug: 'ork' }, { slug: 'ah-ah' }];

    expect(orderBySlugs(data, slugsInOrder)).toEqual(valid);
  });
});
