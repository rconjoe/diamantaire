// import React from 'react';
// import { cx } from 'emotion';
// import PropTypes from 'prop-types';

// import * as styles from './CountrySelectorRegion.style';
// import CountryPickerItem from '../country-picker/CountryPickerItem';

// const propTypes = {
//   region: PropTypes.string.isRequired,
//   countries: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.string),
//     PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
//   ]).isRequired,
//   onCountrySelect: PropTypes.func.isRequired,
//   selectedCountryCode: PropTypes.string.isRequired,
// };

// function CountrySelectorRegion({
//   region,
//   countries: _countries,
//   onCountrySelect,
//   selectedCountryCode,
// }) {
//   const countries = Array.isArray(_countries[0])
//     ? _countries.reduce((acc, curr) => {
//         acc.push(...curr);

//         return acc;
//       }, [])
//     : _countries;
//   const isShortCountryList = countries.length < 8;

//   return (
//     <div className={styles.container}>
//       <p className={cx('-bold', styles.region)}>{region}</p>
//       <div
//         className={cx(styles.countries, { '-shortlist': isShortCountryList })}
//       >
//         {countries.map(country => {
//           return (
//             <CountryPickerItem
//               key={country}
//               selectedCountryCode={selectedCountryCode}
//               country={country}
//               onCountrySelect={onCountrySelect}
//               extraClass={styles.country}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// CountrySelectorRegion.propTypes = propTypes;

// export default CountrySelectorRegion;

const CountrySelectorRegion = () => {
  return <h1>CountrySelectorRegion temp</h1>;
};

export default CountrySelectorRegion;
