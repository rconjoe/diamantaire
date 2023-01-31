import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CountrySelectorRegion from './CountrySelectorRegion';
import * as data from '../../store/selectors/data';
import * as geolocation from '../../store/selectors/geolocation';
import * as styles from './CountrySelectorRegions.style';

const propTypes = {
  onCountrySelect: PropTypes.func.isRequired,
};

function CountrySelectorRegions({
  onCountrySelect,
  countryPicker,
  selectedCountryCode,
}) {
  return (
    <>
      <div className={styles.regionsWrapper}>
        {countryPicker.columns.map(({ label, countries }, i) => {
          return (
            <CountrySelectorRegion
              key={i.toString()}
              region={label}
              countries={countries}
              onCountrySelect={onCountrySelect}
              selectedCountryCode={selectedCountryCode}
            />
          );
        })}
      </div>
    </>
  );
}

CountrySelectorRegions.propTypes = propTypes;

const mapStateToProps = state => {
  return {
    countryPicker: data.getFooterCountryPicker(state),
    selectedCountryCode: geolocation.getCountryCode(state),
  };
};

export default connect(mapStateToProps)(CountrySelectorRegions);
