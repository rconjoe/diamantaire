import { countries, parseValidLocale, languagesByCode, generateLocale } from '@diamantaire/shared/constants';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledLanguageSelector = styled.div`
  font-size: 16px;
  ul {
    list-style: none;
  }
  .selected-language {
  }
  .languages {
    .language-list {
      &.-hidden {
        display: none;
      }
    }
  }
`;

type LanguageSelectorProps = {
  label?: string;
};

const LanguageSelector = ({ label }: LanguageSelectorProps) => {
  const router = useRouter();
  const [selectedLocale, setLocale] = useState(router.locale);
  const [isLanguageListOpen, setLanguageListOpen] = useState(false);

  useEffect(() => {
    setLocale(router.locale);
  }, [router.locale]);

  const { countryCode: selectedCountryCode, languageCode: selectedLanguageCode } = parseValidLocale(selectedLocale);

  const availableLanguages = countries[selectedCountryCode].languages;

  return (
    <StyledLanguageSelector>
      <div className="selectedLanguage">
        {label && `${label}: `}
        <button onClick={() => setLanguageListOpen(!isLanguageListOpen)}>
          {languagesByCode[selectedLanguageCode].name}
        </button>
      </div>
      {availableLanguages.length > 1 && (
        <div className="languages">
          <ul className={clsx('language-list', { '-hidden': !isLanguageListOpen })}>
            {availableLanguages.map((languageCode) => (
              <li key={languageCode}>
                <button onClick={() => setLanguageListOpen(false)}>
                  <Link href={router.asPath} locale={generateLocale(languageCode, selectedCountryCode)} scroll={false}>
                    {languagesByCode[languageCode].name}
                  </Link>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </StyledLanguageSelector>
  );
};

export { LanguageSelector };
