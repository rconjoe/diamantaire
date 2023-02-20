/** @type {Number}  - .8 equals 8px in rems */
export const BASE = 0.8;

/**
 * Util to easily set spaces in increments of BASE .8rem
 * @param  {Number} num     - How many increments of space the outupt should be
 * @return {String}         - Calculated rem value ready for CSS
 */
const setSpace = (num) => {
  // Fix floating point issues w/ toFixed
  const space = +(BASE * num).toFixed(2);

  return `${space}rem`;
};

export { setSpace };
