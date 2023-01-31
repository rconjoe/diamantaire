import { cx } from 'emotion';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createNewCheckout } from '../../ducks/checkout';
import { setOverride, setClientSideCountryCode } from '../../ducks/geolocation';
import { setIsCountryModalOpen } from '../../ducks/header';
import { setLocale } from '../../ducks/locale';
import { forceRefresh, isServer as _isServer } from '../../helpers';
import { getPrimaryLocaleByCountryCode } from '../../helpers/language';
import * as header from '../../store/selectors/header';
import { getLocale } from '../../store/selectors/locale';
import UIString from '../library/localization/UIString';
import * as styles from './CountrySelector.style';
import CountrySelectorRegions from './CountrySelectorRegions';

class CountrySelectorModal extends Component {
  constructor(props) {
    super(props);

    this.handleCountrySelect = this.handleCountrySelect.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.handleAfterClose = this.handleAfterClose.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleOpenClick = this.handleOpenClick.bind(this);
  }

  handleOpenClick() {
    this.props.setIsCountryModalOpen(true);
  }

  handleCloseClick() {
    this.props.setIsCountryModalOpen(false);
  }

  handleAfterOpen() {
    // prevent background scrolling while the modal is open
    document.body.style.overflow = 'hidden';
  }

  handleAfterClose() {
    // re-enable scrolling after the modal is closed
    document.body.removeAttribute('style');
  }

  // See components/header/CountrySelectorRegion.js for the triggering of this event.
  handleCountrySelect(countryCode, externalUrl) {
    if (countryCode !== this.props.selectedCountry) {
      const isServer = _isServer();

      // Store the new country in Redux
      this.props.setNewCountry(countryCode);

      // Set primary locale based on countryCode selected
      const primaryCountryLocale = getPrimaryLocaleByCountryCode(countryCode);

      if (primaryCountryLocale !== this.props.locale) {
        this.props.setLocale(primaryCountryLocale);
        // Only refresh page if not navigating to another URL
        forceRefresh();
      }

      // Store new country as client side country
      this.props.setClientSideCountryCode(countryCode, isServer);

      // Create new checkout with new currency
      this.props.createNewCheckout();

      // Close the modal
      this.props.setIsCountryModalOpen(false);
    }

    if (externalUrl) {
      window.location.href = externalUrl;
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isCountryModalOpen}
        onAfterOpen={this.handleAfterOpen}
        onAfterClose={this.handleAfterClose}
        onRequestClose={this.handleCloseClick}
        closeTimeoutMS={300}
        className={{
          base: styles.modalContent,
          afterOpen: styles.modalContentAfterOpen,
          beforeClose: styles.modalContentBeforeClose,
        }}
        overlayClassName={{
          base: styles.modalOverlay,
          afterOpen: styles.modalOverlayAfterOpen,
          beforeClose: styles.modalOverlayBeforeClose,
        }}
        ariaHideApp={false}
      >
        <div className={styles.closeXWrapper}>
          <span className={styles.closeX} onClick={this.handleCloseClick}>
            x
          </span>
        </div>
        <p className={cx('-bold', styles.selectText)}>
          <UIString>Please select your location</UIString>
        </p>
        <CountrySelectorRegions onCountrySelect={this.handleCountrySelect} />
      </Modal>
    );
  }
}

CountrySelectorModal.propTypes = {
  selectedCountry: PropTypes.string,
  setIsCountryModalOpen: PropTypes.func.isRequired,
  setNewCountry: PropTypes.func.isRequired,
  setClientSideCountryCode: PropTypes.func.isRequired,
  createNewCheckout: PropTypes.func.isRequired,
  isCountryModalOpen: PropTypes.bool.isRequired,
  setLocale: PropTypes.func,
  locale: PropTypes.string.isRequired,
};

export const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setNewCountry: setOverride,
      setClientSideCountryCode,
      createNewCheckout,
      setIsCountryModalOpen,
      setLocale,
    },
    dispatch
  );
};

const mapStateToProps = state => {
  const { geolocation } = state;

  return {
    selectedCountry: geolocation.override.countryCode,
    isCountryModalOpen: header.getIsCountryModalOpen(state),
    isCountryNameDisplayed: geolocation.override.isCountryNameDisplayed,
    locale: getLocale(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountrySelectorModal);
