import { countries, parseValidLocale, languagesByCode, generateLocale } from '@diamantaire/shared/constants';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledLanguageSelector = styled.ul`
  font-size: 16px;
  list-style: none;
  position: absolute;
  left: 0;
  border: 1px solid #ddd;
  text-align: left;
  padding: 10px 20px;
  background-color: #fff;

  li {
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
        {availableLanguages.map((languageCode) => (
          <li key={languageCode}>
            <button onClick={() => toggleLanguageSelector()}>
              <Link href={router.asPath} locale={generateLocale(languageCode, selectedCountryCode)} scroll={false}>
                {languagesByCode[languageCode].name}
              </Link>
            </button>
          </li>
        ))}
      </StyledLanguageSelector>
    )
  );
};

export { LanguageSelector };
