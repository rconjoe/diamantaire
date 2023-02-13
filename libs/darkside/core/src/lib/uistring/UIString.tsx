// eslint-disable-next-line no-unused-vars
import debugFor from 'debug';
import PropTypes from 'prop-types';

// import { getUIStrings } from '../../../store/selectors/data';

const debug = debugFor('vo:UIString localization component');

/**
 * Maps a key to a string object for localization.  Will attempt key in lowercase before fallingback to return key if mapped inital kay value not found..
 * @param {object} map - string map
 * @param {string} key - map key
 * @param {string} fallbackString - optional fallback string override (defaults to key value)
 * @returns {string} - returns mapped string or fallback string.
 */

const mapStr = (map, key, fallbackString = key) => {
  if (!map) {
    return key;
  }

  return map[key] || map[String(key).toLowerCase()] || fallbackString;
};

const UIString = ({ uiStrings, children, placeholders, values }) => {
  // if (!children) {
  //   debug('requires a string child');

  //   return null;
  // }

  // if (!Array.isArray(children) && typeof children === 'string') {
  //   const mappedString = mapStr(uiStrings, children);

  //   if (placeholders && values) {
  //     return <>{replacePlaceholders(mappedString, placeholders, values)}</>;
  //   }

  //   return mappedString;
  // } else {
  //   debug('cannot have more than 1 child and it must be a string');

  //   // return null; TODO - Redo this feature
  //   return children;
  // }
  return children;
};

UIString.propTypes = {
  // map of strings
  uiStrings: PropTypes.object,
  // single string used as key in map
  children: PropTypes.string.isRequired,
  // (optional) array of placeholder strings
  placeholders: PropTypes.array,
  // (optional) array of strings and/or components which will replace placeholders
  values: PropTypes.array,
};

export { UIString };
