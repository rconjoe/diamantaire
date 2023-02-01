const csvFileNormalizer = _csv => {
  const csv = [..._csv]; // array-ify

  // if its a modular, the data property will be an array of numbers matching with its index
  const [firstEntry] = _csv;
  const isFirstEntryFromModularModel = entry =>
    entry?.data.every((v, i) => Number(v) === Number(i));
  const hasModularEntries = isFirstEntryFromModularModel(firstEntry);

  // Modular vs Non Modular Entries

  // Modular Entries
  if (hasModularEntries) {
    // ignore first 2 entries
    // eslint-disable-next-line
    const [first, second, ...validEntries] = csv;

    const entries = validEntries.map(({ data }) => data);

    const normalizedData = [];

    // every chunk of 2 rows is a key value pair
    for (let i = 0; i < entries.length; i += 2) {
      const keys = entries[i];
      const values = entries[i + 1];

      const test = keys.reduce((acc, key, idx) => {
        if (key.includes('-')) {
          // it is a modular field
          const [modularField, elementIdx, fieldTitle] = key.split('-');

          if (!acc[modularField]) {
            // set first value
            acc[modularField] = [];
            acc[modularField][elementIdx] = {
              [fieldTitle]: values[idx],
            };

            return acc;
          }

          // set all the other entries in order
          if (acc[modularField][elementIdx]) {
            acc[modularField][elementIdx][fieldTitle] = values[idx];
          } else {
            acc[modularField][elementIdx] = {
              [fieldTitle]: values[idx],
            };
          }
        } else {
          acc[key] = values[idx];
        }

        return acc;
      }, {});

      normalizedData.push(test);
    }

    return normalizedData;
  }

  // Non Modular Entries
  const header = csv.shift();
  const keys = header.data; // based on CSVReader package

  return csv.map(({ data }) => {
    const normalizedCsvEntry = keys.reduce((acc, key, i) => {
      acc[key] = data[i];

      return acc;
    }, {});

    return normalizedCsvEntry;
  });
};

export default csvFileNormalizer;
