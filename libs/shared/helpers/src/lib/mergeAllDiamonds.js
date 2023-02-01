/**
 * Merges all of the diamond arrays into a new flat array
 * @param {object} diamonds - object where each property is an array
 * @returns {array} - a new flattened array of all of the diamonds
 */
export default function mergeAllDiamonds(diamonds) {
  return [].concat(...Object.values(diamonds));
}
