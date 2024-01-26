import { LanguageSelector, UIString } from '@diamantaire/darkside/components/common-ui';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { countries, parseValidLocale } from '@diamantaire/shared/constants';
import { replacePlaceholders } from '@diamantaire/shared/helpers';
import { ChatIcon, EmptyCalendarIcon, LocationPinIcon, Logo } from '@diamantaire/shared/icons';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { MenuLink, NavItemsProps, ShowroomLocation } from './header-types';
import HeaderActionsNav from './HeaderActionsNav';
import { StackedHeaderStylesContainer } from './StackedHeader.style';

type StackedHeaderTypes = {
  navItems: NavItemsProps;
  toggleMegaMenuOpen: (index: number) => void;
  menuIndex: number;
  toggleCart?: () => void;
  toggleCountrySelector: () => void;
  toggleLanguageSelector: () => void;
  selectedCountry: string;
  selectedLanguage: string;
  isLanguageSelectorOpen: boolean;
  showroomLocation: ShowroomLocation | null;
};

// This header only appears on the home page. Stacks logo ontop of nac
const StackedHeader: FC<StackedHeaderTypes> = ({
  navItems,
  toggleMegaMenuOpen,
  toggleLanguageSelector,
  menuIndex,
  toggleCart,
  toggleCountrySelector,
  selectedCountry,
  selectedLanguage,
  isLanguageSelectorOpen,
  showroomLocation,
}): JSX.Element => {
  const { locale } = useRouter();

  const { _t } = useTranslations(locale);

  const { countryCode: selectedCountryCode } = parseValidLocale(locale);

  const availableLanguages = countries[selectedCountryCode].languages;

  function removeHash() {
    window &&
      window.history.replaceState(
        '',
        document.title,
        window.location.origin + window.location.pathname + window.location.search,
      );
  }

  function addHashToURL() {
    // Get the current URL
    const currentURL = window.location.href;

    // Check if the hash already exists in the URL
    if (currentURL.indexOf('#hs-chat-open') === -1) {
      // Add the hash to the URL
      window.location.href = currentURL + '#hs-chat-open';
    }

    setTimeout(() => {
      // call removeHash function after set timeout
      removeHash();
    }, 5); // 5 millisecond timeout in this case
  }

  function toggleChat() {
    addHashToURL();
  }

  return (
    <StackedHeaderStylesContainer>
      <div className="stacked-header__container">
        <div className="stacked-header__nav-wrapper stacked-header__top-level">
          <div className="nav__col--left">
            <ul className="country-locale-selector">
              <li className="country-selector">
                <button onClick={() => toggleCountrySelector()}>
                  <LocationPinIcon /> <span>{selectedCountry}</span>
                </button>
              </li>
              {availableLanguages.length > 1 && (
                <>
                  <li className="divider">|</li>
                  <li className="language">
                    <button className="language-selector" onClick={() => toggleLanguageSelector()}>
                      <UIString>{selectedLanguage && selectedLanguage.toLowerCase()}</UIString>
                      <div className={'language-icon' + (isLanguageSelectorOpen ? ' active' : '')}>▼</div>
                    </button>
                    {isLanguageSelectorOpen && <LanguageSelector toggleLanguageSelector={toggleLanguageSelector} />}
                  </li>
                </>
              )}

              <li
                className={clsx('country-selector__chat', {
                  'with-lang': availableLanguages.length < 2,
                })}
              >
                <button onClick={() => toggleChat()}>
                  <ChatIcon />
                </button>
              </li>
              <li className="calendar">
                {showroomLocation ? (
                  <Link className="calendar__link" href={`/book-appointment/${showroomLocation.handle}`}>
                    <EmptyCalendarIcon />
                    {replacePlaceholders(
                      _t('Visit our %%location%% location'),
                      ['%%location%%'],
                      [showroomLocation?.location],
                    ).toString()}
                  </Link>
                ) : (
                  <Link className="calendar__link" href="/book-appointment/virtual">
                    <EmptyCalendarIcon />
                    <UIString>Book an appointment</UIString>
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <div className="nav__col--center">
            <div className="nav__logo">
              <Link aria-label="VRAI Logo" href="/">
                <Logo />
              </Link>
            </div>
          </div>

          <div className="nav__col--right">
            <HeaderActionsNav toggleCart={toggleCart} />
          </div>
        </div>

        <div className="stacked-header__nav-wrapper stacked-bottom-level">
          <nav className="stacked-header__desktop-nav">
            <ul>
              {Array.isArray(navItems) &&
                navItems?.map((link: MenuLink, index: number) => {
                  const { title, route, newRoute }: Partial<MenuLink> = link;

                  return (
                    <li key={`stacked-link-${index}`}>
                      {route && title && (
                        <Link
                          href={newRoute || route}
                          className={menuIndex === index ? 'active' : ''}
                          onMouseOver={() => toggleMegaMenuOpen(index)}
                          onFocus={() => toggleMegaMenuOpen(index)}
                        >
                          {title}
                        </Link>
                      )}
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
      </div>
    </StackedHeaderStylesContainer>
  );
};

export default StackedHeader;
