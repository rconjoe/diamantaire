const invertObj = obj => {
  return Object.entries(obj).reduce((acc, cur) => {
    const [key, value] = cur;

    return {
      ...acc,
      [value]: key,
    };
  }, {});
};

export default invertObj;
