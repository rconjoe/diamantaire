import { isEqual, uniq } from 'lodash';

export const getUpdatedKey = (oldData, newData) => {
  const data = uniq([...Object.keys(oldData), ...Object.keys(newData)]);
  const res = [];

  for (const key of data) {
    if (!isEqual(oldData[key], newData[key])) {
      res.push(key);
    }
  }

  return res;
};
