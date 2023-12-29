import {
  CountrySelector,
  Form,
  LanguageSelector,
  Modal,
  UIString,
  Loader,
} from '@diamantaire/darkside/components/common-ui';
import { sendHubspotForm } from '@diamantaire/darkside/data/api';
import { countries, languagesByCode, parseValidLocale, HUBSPOT_FOOTER_LIST } from '@diamantaire/shared/constants';
import { getIsUserInUs } from '@diamantaire/shared/geolocation';
import { getCountry } from '@diamantaire/shared/helpers';
import { FacebookIcon, InstagramIcon, PinterestIcon, TiktokIcon } from '@diamantaire/shared/icons';
import { desktopAndUp } from '@diamantaire/styles/darkside-styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import FooterMobileAccordions from './FooterMobileAccordions';

type FooterTypes = {
  footerData: any;
};

export type FooterColumn = {
  title: string;
  links: Array<FooterLink>;
};

type FooterLink = {
  copy: string;
  flags: string;
  route: string;
  newRoute: string;
  supportedCountries: {
    code: string;
    name: string;
  }[];
};

const FooterStyles = styled.footer`
  padding: 4rem 2.4rem 0;
  border-top: 0.1rem solid #ddd;

  .footer__column-wrapper {
    max-width: 118rem;
    margin: 0 auto;
    display: flex;

    .footer-col {
      flex: 1;
      display: none;

      ${desktopAndUp(`
        display: block;
      `)}

      > &:first-child ul {
        li:first-child {
          a {
            font-weight: bold;
          }
        }
      }

      &__inner {
        p.col-heading {
          font-size: 1.6rem;
          margin: 0 0 1rem;
          font-weight: var(--font-weight-bold);
        }
        > ul {
          padding: 0;
          margin: 0;
          list-style: none;

          > li {
            margin-bottom: 0.7rem;
            position: relative;
            font-size: 1.7rem;
            &:last-child {
              margin-bottom: 0px;
            }

            > a {
              font-size: 1.7rem;
              transition: 0.25s;
              &:hover {
                opacity: 0.6;
              }
            }
            > button {
              background-color: #fff;
              font-size: 1.7rem;
              transition: 0.25s;
              text-decoration: underline;

              &:hover {
                opacity: 0.7;
              }
            }
          }
        }
      }

      &.footer-email-signup {
        flex: 1.5;
        display: block;

        .footer-col__inner {
          max-width: 420px;
        }

        .input-container {
          flex: 2;
        }
        .input-container.submit {
          flex: 1;
        }
        h4 {
          margin: 0 0 1rem;
          font-size: 1.9rem;
        }

        p {
          font-size: 1.7rem;
          margin: 0 0 1rem;
        }

        .footer-social {
          padding-top: 2rem;
          ul {
            display: flex;
            align-items: end;
            margin: 0;
            padding: 0;
            list-style: none;

            li {
              flex: 0 0 2.8rem;
              margin-bottom: 0px;
              margin-right: 0.5rem;
              text-align: center;
              position: relative;
              a {
                display: inline-block;

                svg {
                  max-height: 2rem;
                  width: auto;
                }

                &.pinterest,
                &.tiktok {
                  svg {
                    height: 1.9rem;
                    width: auto;
                    position: relative;
                    top: 0.1rem;
                  }
                }
                &.instagram {
                  svg {
                    position: relative;
                    top: 0.4rem;
                  }
                }
                &.facebook {
                  svg {
                    position: relative;
                    top: 0.2rem;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .footer-mobile {
    display: block;

    ${desktopAndUp(`
        display: none;
      `)}
  }

  .footer__copyright-wrapper {
    padding: 2.4rem 0px;
    text-align: center;

    p {
      margin: 0;
      font-size: 1.4rem;
    }
  }
`;

const socialItems = [
  {
    icon: <InstagramIcon />,
    alt: 'Instagram',
    url: 'https://www.instagram.com/vraiofficial/',
    className: 'instagram',
  },
  {
    icon: <FacebookIcon />,
    alt: 'Facebook',
    url: 'https://www.facebook.com/VRAIjewelry/',
    className: 'facebook',
  },
  {
    icon: <PinterestIcon />,
    alt: 'Pinterest',
    url: 'https://www.pinterest.com/vrai/',
    className: 'pinterest',
  },
  {
    icon: <TiktokIcon />,
    alt: 'Tiktok',
    url: 'https://www.tiktok.com/@vraiofficial',
    className: 'tiktok',
  },
];

const Footer: FC<FooterTypes> = ({ footerData }) => {
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [isLanguageListOpen, setIsLanguageListOpen] = useState(false);
  const { columns, copyright, emailSignUpColumn, emailSignUpCopy } = footerData;
  const { copy, title, ctaCopy } = emailSignUpColumn[0];
  const router = useRouter();
  const selectedLocale = router.locale;
  const { countryCode: selectedCountryCode, languageCode: selectedLanguageCode } = parseValidLocale(selectedLocale);
  const selectedCountry = countries[selectedCountryCode].name;

  const selectedLanguage = languagesByCode[selectedLanguageCode].name;
  const availableLanguages = countries[selectedCountryCode].languages;

  const { optInCopy } = emailSignUpCopy?.[0] || {};
  const date = new Date();

  function toggleLanguageSelector() {
    setIsLanguageListOpen(!isLanguageListOpen);
  }

  function toggleCountrySelector() {
    return setIsCountrySelectorOpen(!isCountrySelectorOpen);
  }

  const { locale } = useRouter();

  const countryCode = getCountry(locale);

  return (
    <>
      <FooterStyles>
        <div className="footer-desktop">
          <div className="footer__column-wrapper">
            {columns?.map((col, index) => {
              const { title, links } = col;

              return (
                <div className="footer-col" key={`footer-col-${index}`}>
                  <div className="footer-col__inner">
                    <p className="col-heading">{title}</p>
                    <ul>
                      {links?.map((link, linkIndex) => {
                        const { route, newRoute, copy, supportedCountries } = link;

                        // If the link has supportedCountries, confirm that the current country is in the list

                        if (supportedCountries.length > 0) {
                          if (supportedCountries.filter((item) => item.code === countryCode).length === 0) return null;
                        }

                        return (
                          <li key={`footer-col-${index}-link-${linkIndex}`}>
                            <Link href={newRoute || route}>{copy.includes('hello') ? <strong>{copy}</strong> : copy}</Link>
                          </li>
                        );
                      })}
                      {index === 0 && (
                        <>
                          <li>
                            <UIString>Location</UIString>:
                            <button onClick={() => setIsCountrySelectorOpen(!isCountrySelectorOpen)}>
                              {selectedCountry}
                            </button>
                          </li>
                          {availableLanguages.length > 1 && (
                            <li>
                              <UIString>Language</UIString>:
                              <button onClick={() => setIsLanguageListOpen(!isLanguageListOpen)}>{selectedLanguage}</button>
                              {isLanguageListOpen && <LanguageSelector toggleLanguageSelector={toggleLanguageSelector} />}
                            </li>
                          )}
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}

            <div className="footer-col footer-email-signup">
              <div className="footer-col__inner">
                <p className="col-heading">{title}</p>
                <p>{copy}</p>

                <FooterEmailSignup
                  ctaCopy={ctaCopy}
                  optInCopy={optInCopy}
                  countryCode={selectedCountryCode}
                  locale={selectedLocale}
                />
                <div className="footer-social">
                  <ul>
                    {socialItems.map((item, index) => {
                      const { url, className, icon } = item;

                      return (
                        <li key={`footer-social-link-${index}`}>
                          <a target="_blank" href={url} rel="noreferrer" className={className}>
                            {icon}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-mobile">
          <FooterMobileAccordions columns={columns} />
        </div>
        <div className="footer__copyright-wrapper">
          <p>
            &copy; {date.getFullYear()} {copyright}
          </p>
        </div>
      </FooterStyles>
      {isCountrySelectorOpen && (
        <Modal title="Please select your location" className="modal--lg" onClose={() => setIsCountrySelectorOpen(false)}>
          <CountrySelector toggleCountrySelector={toggleCountrySelector} />
        </Modal>
      )}
    </>
  );
};

export { Footer };

export const FooterEmailSignup = ({ listData = HUBSPOT_FOOTER_LIST, ctaCopy, optInCopy, countryCode, locale }) => {
  const [loading, setLoading] = useState(false);
  const [showOptIn, setShowOptIn] = useState(false);
  const [message, setMessage] = useState(null);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const isUserInUs = getIsUserInUs();

    setShowOptIn(!isUserInUs);
    setLoading(false);
  }, []);

  const onSubmit = async (e, formState) => {
    e.preventDefault();

    const { email, isConsent } = formState;

    if (showOptIn && !isConsent) {
      setIsValid(false);

      return;
    }

    try {
      if (!showOptIn || (showOptIn && isConsent)) {
        const response = await sendHubspotForm({ email, listData, isConsent, countryCode, locale });

        setMessage(response.inlineMessage);
      }
    } catch (error) {
      console.error('Error submitting form data to HubSpot:', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return message ? (
    <div dangerouslySetInnerHTML={{ __html: message }}></div>
  ) : (
    <Form
      onSubmit={onSubmit}
      formGridStyle="split"
      stackedSubmit={false}
      showOptIn={showOptIn}
      ctaCopy={ctaCopy}
      optInCopy={optInCopy}
      extraClass="-links-teal -opt-in"
      isValid={isValid}
      setIsValid={setIsValid}
    />
  );
};
