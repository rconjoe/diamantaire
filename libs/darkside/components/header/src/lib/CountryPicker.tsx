import { CountrySelectorStyles, Heading } from '@diamantaire/darkside/components/common-ui';
import { motion } from 'framer-motion';
import {
  getLocaleFromCountry,
  getCountryName,
  countryRegions,
  countries,
  CountryDetails,
} from '@diamantaire/shared/constants';
import { getUserCountry } from '@diamantaire/shared/helpers';
import { XIcon } from '@diamantaire/shared/icons';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

const BannerWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 6000;
`;

const BarStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.3rem;
  background-color: rgb(225, 207, 193);
  .buttons-wrapper {
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }
`;
const ShopItButton = styled.button`
  background-color: transparent;
  font-weight: 500;
  font-size: 1.5rem;
  text-decoration: underline;
`;

const ChangeItButton = styled.button`
  background-color: transparent;
  font-weight: 500;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  transform: scale(0.6);

  height: 2.4rem;
  width: 2.4rem;
  &:focus,
  &:active {
    outline: none;
  }
`;
const DropdownStyles = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgb(225, 207, 193);
  z-index: 6000;
  display: none; // Initially hidden
  padding: 4rem;
  &.is-open {
    display: block;
  }
  .country-list {
    max-width: 1080px;
    margin: auto;
  }
`;

function CountryPicker() {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { locale, asPath } = router;

  // Determine recommended country based on user's geolocation
  const recommendedCountry = getUserCountry();
  const sortedCountriesByRegion = useMemo(
    () =>
      Object.values(countryRegions).reduce((regionMap: Record<string, CountryDetails[]>, region) => {
        regionMap[region] = Object.values(countries)
          .filter((countryDetail) => countryDetail.region === region)
          .sort((a, b) => (a.name > b.name ? 1 : -1));

        return regionMap;
      }, {}),
    [],
  );

  useEffect(() => {
    const decideOnShowingBanner = async () => {
      let userCountryCode = getUserCountry();

      // If userCountryCode is not immediately available, retry after a short delay
      if (!userCountryCode) {
        setTimeout(async () => {
          userCountryCode = getUserCountry();
          if (!userCountryCode) {
            return;
          }
          evaluateBannerVisibility();
        }, 1000);

        return;
      }

      evaluateBannerVisibility();
    };

    const evaluateBannerVisibility = () => {
      const nextLocale = Cookies.get('NEXT_LOCALE');
      const geoRedirected = Cookies.get('geo_redirected');
      const userCountryCode = getUserCountry();
      const userLocale = getLocaleFromCountry(userCountryCode);

      // Condition 1: No NEXT_LOCALE cookie and geolocation suggests a different locale, but not geo-redirected
      if (!nextLocale && userLocale !== locale && !geoRedirected) {
        setIsBannerVisible(true);
      }
      // Condition 2: NEXT_LOCALE cookie exists but doesn't match current router locale
      else if (nextLocale && nextLocale !== locale) {
        setIsBannerVisible(true);
      }
      // New Condition: User was geo-redirected
      else if (geoRedirected) {
        setIsBannerVisible(true);
        // Optionally clear the geo_redirected cookie after reading it
        Cookies.remove('geo_redirected');
      } else {
        setIsBannerVisible(false);
      }
    };

    decideOnShowingBanner();
  }, [locale]);

  const handleCountryChange = (countryCode) => {
    const newLocale = getLocaleFromCountry(countryCode);

    Cookies.set('NEXT_LOCALE', newLocale, { expires: 365 });
    window.localStorage.removeItem('cartId');
    window.localStorage.setItem('locale', newLocale);
    setIsBannerVisible(false);
    setIsDropdownOpen(false);
    router.push(asPath, asPath, { locale: newLocale });
  };

  const handleRecommendedCountryChange = () => {
    handleCountryChange(recommendedCountry);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCloseBanner = () => {
    handleRecommendedCountryChange();
  };

  if (!isBannerVisible) return null;

  return (
    <BannerWrapper initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 10 }}>
      <BarStyles>
        <div className="buttons-wrapper">
          <ShopItButton onClick={handleRecommendedCountryChange}>
            Shop the {getCountryName(recommendedCountry)} site
          </ShopItButton>{' '}
          or
          <ChangeItButton onClick={handleToggleDropdown}>Change it {isDropdownOpen ? '▼' : '▲'}</ChangeItButton>
        </div>

        <CloseButton onClick={handleCloseBanner}>
          <XIcon />
        </CloseButton>
      </BarStyles>
      <DropdownStyles className={isDropdownOpen ? 'is-open' : ''}>
        <CountrySelectorStyles>
          <div className="country-list">
            {Object.entries(sortedCountriesByRegion).map(([regionName, regionCountries]) => {
              const columnsClass =
                regionCountries.length > 10 ? 'lg-list' : regionCountries.length > 5 ? 'med-list' : 'sm-list';
              const regionHandle = regionName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/-$/, '')
                .replace(/^-/, '');

              return (
                <div key={regionName} className={clsx('region', regionHandle)}>
                  <Heading type="h4" className="region-title">
                    {regionName}
                  </Heading>
                  <ul className={clsx('region-list', columnsClass)}>
                    {regionCountries.map((country) => {
                      return (
                        <li key={country.code}>
                          <button onClick={() => handleCountryChange(country.code)}>{country.name}</button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </CountrySelectorStyles>
      </DropdownStyles>
    </BannerWrapper>
  );
}

export default CountryPicker;
