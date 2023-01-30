import { DiamondsDataRanges } from './interface/diamond.interface';

/**
 * This function accepts an array of diamond items and returns a min max range carat and price
 * And a unique data set for diamond types
 * @param items
 * @returns
 */

export const getDataRanges = (items: Array<string | number>): DiamondsDataRanges => {
  const numericalRanges = ['carat', 'price']; // carat and price range from the diamond set
  const uniqueValues = ['type'];

  // return an object with the min max range for carat and price
  return items.reduce<DiamondsDataRanges>((prevRanges, item) => {
    uniqueValues.forEach((propertyKey) => {
      const value = item[propertyKey];

      if (value) {
        if (prevRanges[propertyKey]) {
          if (!prevRanges[propertyKey].includes(value)) {
            prevRanges[propertyKey].push(value);
          }
        } else {
          prevRanges[propertyKey] = [value];
        }
      }
    });

    numericalRanges.forEach((propertyKey) => {
      const value = item[propertyKey];

      if (value) {
        if (prevRanges[propertyKey]) {
          prevRanges[propertyKey] = {
            min: Math.min(value, prevRanges[propertyKey].min),
            max: Math.max(value, prevRanges[propertyKey].max),
          };
        } else {
          prevRanges[propertyKey] = {
            min: Math.min(Infinity, value),
            max: Math.max(-Infinity, value),
          };
        }
      }
    });

    return prevRanges;
  }, {});
};
