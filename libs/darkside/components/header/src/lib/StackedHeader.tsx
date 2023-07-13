import { CountrySelector, LanguageSelector } from '@diamantaire/darkside/components/common-ui';
import { Logo } from '@diamantaire/shared/icons';
import Link from 'next/link';
import { FC } from 'react';

import { MenuLink, NavItemsProps } from './header-types';
import HeaderActionsNav from './HeaderActionsNav';
import { StackedHeaderStylesContainer } from './StackedHeader.style';

type StackedHeaderTypes = {
  navItems: NavItemsProps;
  toggleMegaMenuOpen: (index: number) => void;
  menuIndex: number;
  toggleCart?: () => void;
};

// This header only appears on the home page. Stacks logo ontop of nac
const StackedHeader: FC<StackedHeaderTypes> = ({ navItems, toggleMegaMenuOpen, menuIndex, toggleCart }): JSX.Element => {
  return (
    <StackedHeaderStylesContainer>
      <div className="stacked-header__container">
        <div className="stacked-header__nav-wrapper stacked-header__top-level">
          <div className="nav__col--left">
            <ul>
              <li className="flex">
                <CountrySelector /> / <LanguageSelector />
              </li>
              <li>Book an appointment</li>
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
                  const { title, route }: Partial<MenuLink> = link;

                  return (
                    <li key={`stacked-link-${index}`}>
                      {route && title && (
                        <Link
                          href={route}
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
