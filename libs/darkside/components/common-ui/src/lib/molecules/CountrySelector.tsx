import {
  getPrimaryLanguage,
  countries,
  countryRegions,
  CountryDetails,
  parseValidLocale,
  generateLocale,
} from '@diamantaire/shared/constants';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';

import { Modal } from './Modal';

const StyledCountrySelector = styled.div`
  font-size: 16px;
  ul {
    list-style: none;
  }
  .selected-country {
  }
  .country-list {
    &.-hidden {
      display: none;
    }
    .region {
      margin-top: 16px;
      border-top: 1px solid #444;
      padding-top: 16px;
      .region-title {
        font-weight: bold;
        margin-bottom: 8px;
      }
      .region-list {
        &.med-list {
          column-count: 2;
        }
        &.lg-list {
          column-count: 3;
        }
      }
    }
  }
`;

type CountrySelectorProps = {
  label?: string;
};

const CountrySelector = ({ label }: CountrySelectorProps) => {
  const router = useRouter();
  const [selectedLocale, setLocale] = useState(router.locale);
  const [isCountryListOpen, setCountryListOpen] = useState(false);

  useEffect(() => {
    setLocale(router.locale);
  }, [router.locale]);

  const { countryCode: selectedCountryCode } = parseValidLocale(selectedLocale);

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

  return (
    <StyledCountrySelector className="locale-selector">
      <div className="selected-country">
        {label && `${label}: `}
        <button onClick={() => setCountryListOpen(!isCountryListOpen)}>{countries[selectedCountryCode].name}</button>
      </div>
      {isCountryListOpen && (
        <Modal title="Select Country" onClose={() => setCountryListOpen(false)}>
          <div className="country-list">
            {Object.entries(sortedCountriesByRegion).map(([regionName, regionCountries]) => {
              const columnsClass =
                regionCountries.length > 10 ? 'lg-list' : regionCountries.length > 5 ? 'med-list' : 'sm-list';

              return (
                <div key={regionName} className="region">
                  <div className="region-title">{regionName}</div>
                  <ul className={clsx('region-list', columnsClass)}>
                    {regionCountries.map((country) => {
                      return (
                        <li key={country.code}>
                          <button onClick={() => setCountryListOpen(false)}>
                            <Link
                              href={router.asPath}
                              locale={generateLocale(getPrimaryLanguage(country.code), country.code)}
                              scroll={false}
                            >
                              {country.name}
                            </Link>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </Modal>
      )}
    </StyledCountrySelector>
  );
};

export { CountrySelector };
