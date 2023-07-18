// eslint-disable-next-line no-unused-vars

// import PropTypes from 'prop-types';

/**
 * Maps a key to a string object for localization.  Will attempt key in lowercase before fallingback to return key if mapped inital kay value not found..
 * @param {object} map - string map
 * @param {string} key - map key
 * @param {string} fallbackString - optional fallback string override (defaults to key value)
 * @returns {string} - returns mapped string or fallback string.
 */

const UIString = ({ children }) => {
  return children;
};

export { UIString };

// const mapStr = (map, key, fallbackString = key) => {
//   if (!map) {
//     return key;
//   }

//   return map[key] || map[String(key).toLowerCase()] || fallbackString;
// };

// UIString.propTypes = {
//   // map of strings
//   uiStrings: PropTypes.object,
//   // single string used as key in map
//   children: PropTypes.string.isRequired,
//   // (optional) array of placeholder strings
//   placeholders: PropTypes.array,
//   // (optional) array of strings and/or components which will replace placeholders
//   values: PropTypes.array,
// };
