/**
 * Replaces named placeholders with provided array of values. Will accept components as values to replace.
 * @param {string} placeholderString - string which includes placeholders
 * @param {string[]} placeHoldersArr - array of placeholders, e.g ['{{namedPlaceholder1}}, {{namedPlaceholder2}}]
 * @param {string[]} valuesArr - array of values to replace placeholders, e.g. [5, 'string value']
 * @returns {array} - returns array of strings and replaced values which can be rendered as JSX. If all values in valuesArr are strings, it will return a string
 */

export function replacePlaceholders(
  string: string,
  placeHoldersArr: string[],
  valuesArr: string[],
): string | (object | string)[] {
  if (!string) {
    return '';
  }
  if (!placeHoldersArr || !valuesArr) {
    return string;
  }
  const strArr = [];
  const placeholderIndexArr = [0];

  // find index of where to slice string
  placeHoldersArr.forEach((placeholder) => {
    if (string) {
      const i = string.indexOf(placeholder);

      placeholderIndexArr.push(i);
      placeholderIndexArr.push(i + placeholder.length);
    }
  });

  // sort index then slice string
  placeholderIndexArr
    .sort((a, b) => a - b)
    .forEach((index, i) => {
      const start = index;
      const end = placeholderIndexArr[i + 1];

      strArr.push(string.slice(start, end));
    });

  // replace placeholder indexes with values
  placeHoldersArr.forEach((placeholder, i) => {
    const index = strArr.indexOf(placeholder);

    strArr[index] = valuesArr[i];
  });

  return valuesArr.every((s) => typeof s == 'string') ? strArr.join('') : strArr;
}
