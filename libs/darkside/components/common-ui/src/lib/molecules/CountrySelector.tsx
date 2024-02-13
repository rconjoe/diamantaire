import {
  getPrimaryLanguage,
  countries,
  countryRegions,
  CountryDetails,
  parseValidLocale,
  generateLocale,
} from '@diamantaire/shared/constants';
import { media } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';

import { Heading } from './Heading';

const CountrySelectorStyles = styled.div`
  ul {
    list-style: none;
  }

  .country-list {
    display: flex;
    flex-wrap: wrap;
    &.-hidden {
      display: none;
    }
    .region {
      margin-bottom: 4rem;
      flex: 1 1 100%;
      &.north-america {
        ${media.medium`flex: 0 0 33.33%;`}
      }
      &.europe {
        ${media.medium`flex: 0 0 66.66%;`}
      }
      &.international {
        ${media.medium`flex: 0 0 66.66%;`}
      }
      &.asia-pacific {
        ${media.medium`flex: 0 0 33.33%;`}
      }
      .region-title {
        font-weight: bold;
        margin-bottom: 0.8rem;
        font-size: 1.3rem;
      }
      .region-list {
        padding: 0;
        &.med-list {
          column-count: 2;
        }
        &.lg-list {
          column-count: 4;
        }

        li {
          margin-bottom: 0.5rem;
          button {
            padding: 0;
            background-color: transparent;
            border: none;

            a {
              color: #777;
              transition: 0.25s;
              font-size: var(--font-size-xxxsmall);
              &:hover {
                color: #000;
              }
            }

            &.active {
              a {
                font-weight: bold;
                color: #000;
              }
            }
          }
        }
      }
    }
  }
`;

const CountrySelector = ({ toggleCountrySelector }: { toggleCountrySelector: () => void }) => {
  const router = useRouter();
  const [selectedLocale, setLocale] = useState(router.locale);
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

  useEffect(() => {
    setLocale(router.locale);
  }, [router.locale]);

  return (
    <CountrySelectorStyles>
      <div className="country-list">
        {Object.entries(sortedCountriesByRegion).map(([regionName, regionCountries]) => {
          const columnsClass = regionCountries.length > 10 ? 'lg-list' : regionCountries.length > 5 ? 'med-list' : 'sm-list';
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
                      <button
                        className={clsx(selectedCountryCode === country.code ? 'active' : '')}
                        onClick={() => {
                          toggleCountrySelector();
                          // we prob need an absolute url here

                          window.scrollTo(0, 0);
                        }}
                      >
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
    </CountrySelectorStyles>
  );
};

export { CountrySelector };
