const orderBySlugs = (data, slugsInOrder, name = 'slug') => {
  return slugsInOrder.reduce((acc, slug) => {
    const item = data.find(item => {
      if (item[name] === slug) {
        return item;
      }
    });

    if (item) {
      acc.push(item);
    }

    return acc;
  }, []);
};

export default orderBySlugs;
