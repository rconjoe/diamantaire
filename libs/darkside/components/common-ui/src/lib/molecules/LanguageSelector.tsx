import { countries, generateLocale, languagesByCode, parseValidLocale } from '@diamantaire/shared/constants';
import { WHITE } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { UIString } from './';

const StyledLanguageSelector = styled.ul`
  font-size: 16px;
  list-style: none;
  position: absolute;
  left: 3rem;
  top: calc(100% + 1rem);
  border: 1px solid #ddd;
  text-align: left;
  padding: 1.5rem;
  background-color: ${WHITE};

  &:before {
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid #ddd;
    position: absolute;
    top: -0.5rem;
    left: 1.8rem;
    transform: rotate(45deg);
    background: ${WHITE};
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${WHITE};
  }

  li {
    position: relative;
    z-index: 1;

    &.active * {
      font-weight: var(--font-weight-bold);
    }

    button {
      background-color: transparent;
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
              <button className="language-selector-sub" onClick={() => toggleLanguageSelector()}>
                <Link href={router.asPath} locale={locale} scroll={false}>
                  {name !== 'English' ? <UIString>{name && name.toLowerCase()}</UIString> : name}
                </Link>
              </button>
            </li>
          );
        })}
      </StyledLanguageSelector>
    )
  );
};

export { LanguageSelector };
