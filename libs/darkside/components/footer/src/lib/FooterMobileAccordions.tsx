import { CountrySelector, LanguageSelector, Modal, UIString } from '@diamantaire/darkside/components/common-ui';
import { parseValidLocale, countries, languagesByCode } from '@diamantaire/shared/constants';
import { ArrowRightIcon } from '@diamantaire/shared/icons';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { FooterColumn } from './Footer';

type FooterMobileAccordionProps = {
  columns: Array<FooterColumn>;
};

const FooterMobileAccordionsContainer = styled.div`
  padding-top: 20px;
`;

const CountryLabelListItem = styled.div`
  button {
    font-size: 1.4rem;
    color: var(--color-black);
    background-color: transparent;
    padding: 1.5rem 0;
    display: flex;
    width: 100%;

    .label {
      font-weight: bold;
      margin-right: 10px;
      text-transform: uppercase;
      font-size: 1.4rem;
    }

    .icon {
      flex: 1;
      text-align: right;
    }
  }
`;

const LanguageLabelListItem = styled.div`
  border-bottom: 1px solid #ccc;
  .language-list {
    position: static;
    padding: 0;
    margin: 0;
    border: none;
  }

  .selected {
    text-transform: capitalize;
  }

  > button {
    font-size: 1.4rem;
    color: var(--color-black);
    background-color: transparent;
    padding: 1.5rem 0;
    display: flex;
    width: 100%;

    &.active {
      svg {
        transform: rotate(90deg);
      }
    }

    svg {
      transition: 0.25s;
    }

    .label {
      font-weight: bold;
      margin-right: 10px;
      text-transform: uppercase;
      font-size: 1.4rem;
    }

    .icon {
      flex: 1;
      text-align: right;
    }
  }
  ul {
    padding: 1.5rem 0 0;
    button {
      font-size: 1.7rem;
      color: var(--color-black);
      background-color: transparent;
      padding: 0 0 1.5rem;
      display: flex;
      width: 100%;
    }
  }
`;

const FooterMobileAccordions: FC<FooterMobileAccordionProps> = ({ columns }): JSX.Element => {
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);

  const { locale } = useRouter();

  const { countryCode: selectedCountryCode, languageCode: selectedLanguageCode } = parseValidLocale(locale);
  const selectedCountry = countries[selectedCountryCode].name;
  const selectedLanguage = languagesByCode[selectedLanguageCode].name;
  const availableLanguages = countries[selectedCountryCode].languages;

  function toggleCountrySelector() {
    return setIsCountrySelectorOpen(!isCountrySelectorOpen);
  }

  return (
    <FooterMobileAccordionsContainer>
      {columns?.map((col, index) => {
        return <FooterAccordion col={col} key={`footer-accordion-${index}`} colKey={index} />;
      })}

      {availableLanguages.length > 1 && (
        <LanguageLabelListItem>
          <>
            <button
              className={isLanguageSelectorOpen ? 'active language-selector' : 'language-selector'}
              onClick={() => setIsLanguageSelectorOpen(!isLanguageSelectorOpen)}
            >
              <span className="label">
                <UIString>Language</UIString>
              </span>
              <span className="selected">
                <UIString>{selectedLanguage && selectedLanguage.toLowerCase()}</UIString>
              </span>
              <span className="icon">
                <ArrowRightIcon />
              </span>
            </button>

            {isLanguageSelectorOpen && (
              <LanguageSelector toggleLanguageSelector={() => setIsLanguageSelectorOpen(!isLanguageSelectorOpen)} />
            )}
          </>
        </LanguageLabelListItem>
      )}

      <CountryLabelListItem>
        <button onClick={() => setIsCountrySelectorOpen(!isCountrySelectorOpen)}>
          <span className="label">
            <UIString>Location</UIString>:
          </span>
          {selectedCountry}
          <span className="icon">
            <ArrowRightIcon />
          </span>
        </button>
      </CountryLabelListItem>

      {isCountrySelectorOpen && (
        <Modal title="Please select your location" className="modal--lg" onClose={() => setIsCountrySelectorOpen(false)}>
          <CountrySelector toggleCountrySelector={toggleCountrySelector} />
        </Modal>
      )}
    </FooterMobileAccordionsContainer>
  );
};

const FooterAccordionContainer = styled.div`
  border-bottom: 1px solid #ccc;

  button {
    padding: 1.5rem 0;
    display: flex;
    width: 100%;
    text-align: left;
    border: none;
    background-color: transparent;
    font-weight: bold;
    font-size: 1.4rem;
    color: var(--color-black);

    span {
      position: relative;
      top: 0px;
      flex: 1;
      text-align: right;

      svg {
        width: 8px;
        height: auto;
        transition: 0.25s;
      }

      &.open {
        svg {
          transform: rotate(90deg);
        }
      }
    }
  }

  ul {
    margin: 0;
    padding: 0 0 15px;
    list-style: none;

    li {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0px;
      }

      a {
        font-size: 1.7rem;
        color: var(--color-black);
      }
    }
  }
`;

const FooterAccordion = ({ col, colKey }: { col: FooterColumn; colKey: number }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { title, links } = col;

  const countryCode = parseValidLocale(useRouter().locale).countryCode;

  return (
    <FooterAccordionContainer>
      <button onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
        {title}{' '}
        <span className={isAccordionOpen ? 'open' : ''}>
          <ArrowRightIcon />
        </span>
      </button>

      <AnimatePresence>
        {isAccordionOpen && (
          <div className="links-container">
            <ul>
              {links?.map((link, index) => {
                const { newRoute, supportedCountries, copy } = link;

                if (supportedCountries.length > 0) {
                  if (supportedCountries.filter((item) => item.code === countryCode).length === 0) return null;
                }

                return (
                  <li key={`mobile-accordion-${colKey}-link-${index}`}>
                    <Link href={newRoute}>{copy}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </AnimatePresence>
    </FooterAccordionContainer>
  );
};

export default FooterMobileAccordions;
