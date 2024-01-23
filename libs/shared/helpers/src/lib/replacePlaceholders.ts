/**
 * Replaces named placeholders with provided array of values. Will accept components as values to replace.
 * @param {string} placeholderString - string which includes placeholders
 * @param {string[]} placeHoldersArr - array of placeholders, e.g ['{{namedPlaceholder1}}, {{namedPlaceholder2}}]
 * @param {string[]} valuesArr - array of values to replace placeholders, e.g. [5, 'string value']
 * @returns {array} - returns array of strings and replaced values which can be rendered as JSX. If all values in valuesArr are strings, it will return a string
 */

export function replacePlaceholders(string, placeHoldersArr, valuesArr) {
  if (!string) {
    return '';
  }

  if (!placeHoldersArr || !valuesArr || !Array.isArray(placeHoldersArr) || !Array.isArray(valuesArr)) {
    return string;
  }

  let resultArray = [string];

  placeHoldersArr.forEach((placeholder, index) => {
    const value = valuesArr[index];

    resultArray = resultArray.reduce((acc, part) => {
      if (typeof part === 'string') {
        const splitParts = part.split(placeholder);
        const newParts = splitParts.flatMap((item, idx) => (idx < splitParts.length - 1 ? [item, value] : item));

        acc.push(...newParts);
      } else {
        acc.push(part);
      }

      return acc;
    }, []);
  });

  // Check if the result array contains only strings
  const allStrings = resultArray.every((part) => typeof part === 'string');

  // Join the array elements with an empty string if all are strings, otherwise return array
  return allStrings ? resultArray.join('') : resultArray;
}
