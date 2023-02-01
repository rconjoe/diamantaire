import isEmptyObject from './isEmptyObject';

const { Parser } = require('json2csv');

export const makeCsvData = data => {
  if (Array.isArray(data)) {
    if (hasModularFields(data)) {
      return modelWithModularFieldsToCsv(data);
    }
  }

  if (hasModularFields([data])) {
    return modelWithModularFieldsToCsv([data]);
  }

  return modelWithoutModularFieldsToCsv(data);
};

const hasModularFields = data => {
  // If value is an array, assume it is a modular field
  return data.find(entry => {
    return Object.values(entry).find(value => Array.isArray(value));
  });
};

const modelWithoutModularFieldsToCsv = modelWithoutModularFields => {
  let fields;

  if (Array.isArray(modelWithoutModularFields)) {
    fields = Object.keys(modelWithoutModularFields[0]);
  } else {
    // single entry model
    fields = Object.keys(modelWithoutModularFields);
  }

  const json2csv = new Parser({ fields });

  return json2csv.parse(modelWithoutModularFields);
};

const modelWithModularFieldsToCsv = modelWithModularFields => {
  // iterate over the object looking for array of objects
  // returns an array of 2 arrays of the same length
  // 1) a key arrays
  // 2) a value arrays

  const createKeyName = (parentKey, idx, childKey) => {
    return `${parentKey}-${idx}-${childKey}`;
  };

  // Normalizing data structure for json2csv package
  const arrayOfModularEntries = modelWithModularFields.map(data => {
    return Object.entries(data).reduce(
      (acc, [key, value]) => {
        if (Array.isArray(value)) {
          // modular field logic
          // value = [{}, {}, ...] // expect to be array of objects
          const modularFieldValues = value;

          modularFieldValues.forEach((modularBlock, index) => {
            if (isEmptyObject(modularBlock)) {
              return;
            }

            Object.entries(modularBlock).forEach(
              ([modularKey, modularValue]) => {
                acc[1].push(createKeyName(key, index, modularKey));
                acc[0].push(modularValue);
              }
            );
          });
        } else {
          acc[1].push(key);
          acc[0].push(value);
        }

        return acc;
      },
      [[], []]
    );
  });

  // set max columns
  const maxColumns = arrayOfModularEntries.reduce(
    (a, b) => (a[0].length > b[0].length ? a : b),
    [[], []]
  )[0].length;

  let csv = [{ ...[...','.repeat(maxColumns)] }];

  arrayOfModularEntries.forEach(entry => {
    const [key, value] = entry;

    csv.push({ ...value });
    csv.push({ ...key });
  });

  const fields = Object.keys(csv[0]);
  const json2csv = new Parser({ fields });

  return json2csv.parse(csv);
};
