import { countries, generateLocale, languagesByCode, parseValidLocale } from '@diamantaire/shared/constants';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { UIString } from './UIString';

const StyledLanguageSelector = styled.ul`
  font-size: 1.6rem;
  list-style: none;
  position: absolute;
  left: 3rem;
  top: calc(100% + 1rem);
  border: 0.1rem solid #ddd;
  text-align: left;
  padding: 1.5rem;
  background-color: var(--color-white);

  &:before {
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    border: 0.1rem solid #ddd;
    position: absolute;
    top: -0.5rem;
    left: 1.8rem;
    transform: rotate(45deg);
    background: var(--color-white);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-white);
  }

  li {
    position: relative;
    z-index: 1;

    &.active * {
      font-weight: var(--font-weight-bold);
    }

    button {
      background-color: transparent;
      text-transform: capitalize;
    }
  }
`;

type LanguageSelectorProps = {
  toggleLanguageSelector: () => void;
};

const LanguageSelector = ({ toggleLanguageSelector }: LanguageSelectorProps) => {
  const router = useRouter();
  const [selectedLocale, setLocale] = useState(router.locale);

  useEffect(() => {
    setLocale(router.locale);
  }, [router.locale]);

  const { countryCode: selectedCountryCode } = parseValidLocale(selectedLocale);

  const availableLanguages = countries[selectedCountryCode].languages;

  return (
    availableLanguages.length > 1 && (
      <StyledLanguageSelector className={clsx('language-list')}>
        {availableLanguages.map((languageCode) => {
          const locale = generateLocale(languageCode, selectedCountryCode);
          const name = languagesByCode[languageCode].name;

          return (
            <li key={languageCode} className={selectedLocale === locale ? 'active' : ''}>
              <button
                className="language-selector-sub"
                onClick={() => {
                  const newLocale = generateLocale(languageCode, selectedCountryCode).toString();

                  window.localStorage.removeItem('cartId');
                  window.localStorage.setItem('locale', newLocale);
                  toggleLanguageSelector();
                  Cookies.set('NEXT_LOCALE', newLocale);
                  // Need to reset stored locale value for cart stuff
                  window.location.href = `/${newLocale}/${router.asPath}`;
                }}
              >
                {name !== 'English' ? <UIString>{name && name.toLowerCase()}</UIString> : name}
              </button>
            </li>
          );
        })}
      </StyledLanguageSelector>
    )
  );
};

export { LanguageSelector };
