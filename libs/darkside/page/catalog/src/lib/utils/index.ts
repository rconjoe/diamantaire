export const sortSlugProductType = (slugA, slugB) => {
  return slugA.productType > slugB.productType ? 1 : -1;
};

export const sortOptionTypes = (typeA, typeB) => {
  return typeA.type > typeB.type ? 1 : -1;
};

export const sortOptionKV = (a, b) => {
  return a[0] > b[0] ? 1 : -1;
};
