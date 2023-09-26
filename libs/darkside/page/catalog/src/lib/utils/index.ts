export const sortSlugProductType = (slugA, slugB) => {
  return slugA.productType > slugB.productType ? 1 : -1;
};

export const sortOptionTypes = ([aType]: [string, string[]], [bType]: [string, string[]]) => {
  return aType > bType ? 1 : -1;
};

export const sortOptionKV = (a, b) => {
  return a[0] > b[0] ? 1 : -1;
};
