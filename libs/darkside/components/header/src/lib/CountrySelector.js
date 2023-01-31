// import { cx } from 'emotion';
// import PropTypes from 'prop-types';
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import * as styles from './CountrySelector.style';
// import { setIsCountryModalOpen } from '../../ducks/header';
// import getCountryName from '../../helpers/getCountryName';
// import * as _geolocation from '../../store/selectors/geolocation';
// import { Throbber } from '../library';
// import LocationIcon from '../library/icons/LocationIcon';

// const defaultProps = {
//   alt: 'Location',
// };

// /**
//  * This is a class component because we want the componentDidMount lifestyle
//  * event to run only once when the component mounts.
//  */
// class CountrySelector extends Component {
//   constructor(props) {
//     super(props);

//     this.handleOpenClick = this.handleOpenClick.bind(this);
//     this.closeModal = this.closeModal.bind(this);
//   }

//   closeModal() {
//     this.props.setIsCountryModalOpen(false);
//   }

//   handleOpenClick() {
//     this.props.setIsCountryModalOpen(true);
//   }

//   render() {
//     const { alt } = this.props;

//     return (
//       <div>
//         <span
//           className={cx(styles.button, styles.countryLocale, {
//             '-is-first': this.props.isFirstSelector,
//           })}
//           onClick={this.handleOpenClick}
//         >
//           <LocationIcon type="location" className={styles.locationIcon} alt={alt} />
//           {this.props.isCountryNameDisplayed ? (
//             <span
//               className={cx(styles.countryLocaleLabel, {
//                 '-is-first': this.props.isFirstSelector,
//               })}
//             >
//               {getCountryName(this.props.clientSideCountryCode || this.props.selectedCountry)}
//             </span>
//           ) : (
//             <Throbber extraClass={styles.throbber} />
//           )}
//         </span>
//       </div>
//     );
//   }
// }

// CountrySelector.propTypes = {
//   selectedCountry: PropTypes.string,
//   clientSideCountryCode: PropTypes.string,
//   setIsCountryModalOpen: PropTypes.func.isRequired,
//   isCountryNameDisplayed: PropTypes.bool.isRequired,
//   isFirstSelector: PropTypes.bool,
//   alt: PropTypes.string.isRequired,
// };
// CountrySelector.defaultProps = defaultProps;

// export const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       setIsCountryModalOpen,
//     },
//     dispatch,
//   );
// };

// const mapStateToProps = (state) => {
//   const { geolocation } = state;

//   return {
//     selectedCountry: geolocation.override.countryCode,
//     clientSideCountryCode: geolocation.clientSideCountryCode,
//     isCountryNameDisplayed: geolocation.override.isCountryNameDisplayed,
//     isFirstSelector: _geolocation.getAvailableLocales(state).length > 1,
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);

const CountrySelector = () => {
  return <h1>CountrySelectorTemp</h1>;
};

export default CountrySelector;
