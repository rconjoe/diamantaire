import { BasicObject, DiamondsDataRanges } from './interface/diamond.interface';

export const defaultNumericalRanges = {
  carat: defaultGetter,
  price: defaultGetter,
};

export const defaultUniqueValues = {
  type: defaultGetter,
  diamondType: defaultGetter,
};

export function defaultGetter<T extends BasicObject>(item: T, key: string): string | number {
  return item[key];
}

// Co-authored-by: ricovrai <ricovrai@users.noreply.github.com>

export function defaultVariantGetter<T extends BasicObject>(item: T, key: string): string | number {
  return shopifyPriceToNumber(item?.variants?.[0][key].amount);
}

/**
 * This function accepts an array of items <T> and returns a a unique set or range based on the
 * And a unique data set for diamond types
 * @param items
 * @param uniqueValues
 * @param numericalRanges
 * @returns
 */

export const getDataRanges = <T extends BasicObject>(
  items: Array<T>,
  uniqueValues: { [key: string]: (T, key: string) => number | string } = defaultUniqueValues,
  numericalRanges: { [key: string]: (T, key: string) => number | string } = defaultNumericalRanges,
): DiamondsDataRanges => {
  const uniqueValueKeys = Object.keys(uniqueValues);
  const numericalRangeKeys = Object.keys(numericalRanges);

  // return an object with the min max range for carat and price
  return items.reduce<DiamondsDataRanges>((prevRanges, item) => {
    uniqueValueKeys.forEach((propertyKey) => {
      const getFn = uniqueValues[propertyKey];
      const value = getFn(item, propertyKey);

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

    numericalRangeKeys.forEach((propertyKey) => {
      const valueGetFn = numericalRanges[propertyKey];
      let value = valueGetFn(item, propertyKey);

      if (typeof value === 'string') {
        value = parseFloat(value);
      }

      if (value && typeof value === 'number') {
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

export const shopifyPriceToNumber = (shopifyPrice) => {
  // Remove all '.' from price then convert to number
  return Number(shopifyPrice.replace(/\./g, ''));
};
