import { CountrySelector, Modal } from '@diamantaire/darkside/components/common-ui';
import { parseValidLocale, countries } from '@diamantaire/shared/constants';
import { ArrowRightIcon } from '@diamantaire/shared/icons';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { FooterColumn } from './Footer';

type FooterMobileAccordionProps = {
  columns: Array<FooterColumn>;
  countryLabel: string;
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

const FooterMobileAccordions: FC<FooterMobileAccordionProps> = ({ columns, countryLabel }): JSX.Element => {
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);

  const { locale } = useRouter();
  const { countryCode: selectedCountryCode } = parseValidLocale(locale);
  const selectedCountry = countries[selectedCountryCode].name;

  function toggleCountrySelector() {
    return setIsCountrySelectorOpen(!isCountrySelectorOpen);
  }

  return (
    <FooterMobileAccordionsContainer>
      {columns?.map((col, index) => {
        return <FooterAccordion col={col} key={`footer-accordion-${index}`} colKey={index} />;
      })}
      <CountryLabelListItem>
        <button onClick={() => setIsCountrySelectorOpen(!isCountrySelectorOpen)}>
          <span className="label">{countryLabel}:</span>
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
          <motion.div
            className="links-container"
            key={`mobile-accordion-${colKey}`}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
          >
            <ul>
              {links?.map((link, index) => {
                const { route, copy } = link;

                return (
                  <li key={`mobile-accordion-${colKey}-link-${index}`}>
                    <Link href={route} legacyBehavior>
                      <a>{copy}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </FooterAccordionContainer>
  );
};

export default FooterMobileAccordions;
