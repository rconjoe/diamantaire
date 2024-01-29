import { FreezeBody, UIString } from '@diamantaire/darkside/components/common-ui';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { isCountrySupported } from '@diamantaire/shared/helpers';
import { ChevronRightIcon } from '@diamantaire/shared/icons';
import { desktopAndUp } from '@diamantaire/styles/darkside-styles';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { diamondShapesWithIcon, ringStylesWithIcon } from './header-helpers';
import { MenuLink, NavColumn, NavItemsProps, SubMenuChildLink } from './header-types';

type MobileMenuContainerProps = {
  $headerHeight: number;
};

const MobileMenuContainer = styled(motion.div)<MobileMenuContainerProps>`
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  position: fixed;
  padding-bottom: 30rem;
  top: ${(props) => props.$headerHeight - 1 + 'px'};
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 10000;

  ${desktopAndUp(`
    display: none;
  `)};

  /* Top Level Menu Items */
  nav {
    .mobile-top-level-links-container {
      margin: 0;
      padding: 0 2rem;
      list-style: none;

      li {
        button.top-level-link,
        > a.top-level-link {
          color: var(--color-black);
          background-color: #fff;
          border: none;
          border-bottom: 0.1rem solid #000;
          padding: 1.5rem 0;
          display: flex;
          width: 100%;
          align-items: center;
          font-family: var(--font-family-main);
          text-transform: uppercase;
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-xxxsmall);
          letter-spacing: 0.1rem;

          &.open {
            border-color: transparent;
          }

          &:focus,
          &:active {
            outline: none;
          }

          span {
            flex: 1;
            text-align: right;
            position: relative;
            top: 0.2rem;

            svg {
              transition: 0.25s;
              width: 1rem;
              height: 1.7rem;
            }
          }

          &.open {
            span {
              svg {
                transform: rotate(90deg);
              }
            }
          }
        }
      }
    }
  }

  /* Sub Menu Items */

  .mobile-submenu__container {
    .mobile-submenu__inner {
      padding: 1rem;

      .submenu__title {
        font-size: 1.4rem;
        margin: 0 0 1rem;
        letter-spacing: 0.1rem;
      }

      .submenu__list {
        list-style: none;
        padding: 0;
        margin: 0;
        padding-left: 1rem;

        li {
          a {
            display: block;
            font-size: 1.7rem;
            margin-top: 0.5rem;

            &.has-icon {
              display: flex;
              align-items: center;
              margin-top: 0rem;
            }

            &:hover,
            &.active {
              .link-text {
                color: #000;
                &::before {
                  width: 100%;
                }
              }
            }

            span {
              position: relative;
              margin-right: 1rem;
              font-size: 1.7rem;

              &.diamond {
                top: 0.4rem;
                flex: 0 0 3rem;
                text-align: center;
                svg {
                  max-width: 2.8rem;
                  max-height: 2.8rem;
                  width: 100%;
                }
              }
              &.ring-style {
                flex: 0 0 6rem;
                margin-right: 1rem;
                top: 0.3rem;

                svg {
                  max-width: 6rem;
                  height: 2.8rem;
                }
              }
            }
          }

          .grandchildren-links {
            padding: 0 2rem;
            list-style: none;
            margin: 0;
          }
        }
      }
    }
  }
`;

type MobileMenuProps = {
  navItems: NavItemsProps;
  headerHeight: number | undefined;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
};

const MobileMenu: FC<MobileMenuProps> = ({ navItems, headerHeight, setIsMobileMenuOpen }): JSX.Element => {
  return (
    <>
      <FreezeBody />
      <MobileMenuContainer
        $headerHeight={headerHeight ? headerHeight : 0}
        key={`mobile-container`}
        initial="closed"
        animate="open"
        exit="closed"
        transition={{ duration: 0.5 }}
        variants={{
          open: { x: 0 },
          closed: { x: '-100%' },
        }}
      >
        <nav>
          <ul className="mobile-top-level-links-container">
            {Array.isArray(navItems) &&
              navItems?.map((item, index) => {
                return (
                  <MobileTopLevelLink
                    item={item}
                    key={`mobile-menu-parent-link-${index}`}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                  />
                );
              })}
            <li>
              <Link href="/account/sign-in" className="top-level-link" onClick={() => setIsMobileMenuOpen(false)}>
                <UIString>Account</UIString>
              </Link>
            </li>
          </ul>
        </nav>
      </MobileMenuContainer>
    </>
  );
};

const MobileTopLevelLink = ({
  item,
  setIsMobileMenuOpen,
}: {
  item: MenuLink;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <li>
      <button
        className={isMenuOpen ? 'bold open top-level-link' : 'bold top-level-link'}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {item?.title}{' '}
        <span>
          <ChevronRightIcon />
        </span>
      </button>

      <AnimatePresence>
        {isMenuOpen &&
          item?.columns?.map((col, colIndex) => {
            return (
              <MobileSubMenu
                key={`mobile-menu-${colIndex}`}
                col={col}
                colIndex={colIndex}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            );
          })}
      </AnimatePresence>
    </li>
  );
};

const MobileSubMenu = ({
  col,
  colIndex,
  setIsMobileMenuOpen,
}: {
  col: NavColumn;
  colIndex: number;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}) => {
  const { columnTitle, links }: NavColumn = col;

  const { locale } = useRouter();

  const { countryCode } = parseValidLocale(locale);

  return (
    <div className="mobile-submenu__container">
      <div className="mobile-submenu__inner">
        <h4 className="submenu__title">{columnTitle}</h4>
        <ul className="submenu__list">
          {links?.map((link, index) => {
            const { linkKey, nestedLinks, route, newRoute, copy, isBold, supportedCountries }: Partial<SubMenuChildLink> =
              link;

            const iconType = diamondShapesWithIcon?.[linkKey as keyof typeof diamondShapesWithIcon]
              ? 'diamond'
              : ringStylesWithIcon[linkKey as keyof typeof ringStylesWithIcon]
              ? 'ring-style'
              : '';

            return (
              isCountrySupported(supportedCountries, countryCode) && (
                <li key={index}>
                  {route && (
                    <Link
                      href={newRoute || route}
                      className={iconType ? 'has-icon' : ''}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <>
                        {linkKey && (
                          <span className={iconType}>
                            {diamondShapesWithIcon[linkKey as keyof typeof diamondShapesWithIcon]
                              ? diamondShapesWithIcon[linkKey as keyof typeof diamondShapesWithIcon]?.['icon']
                              : ringStylesWithIcon
                              ? ringStylesWithIcon[linkKey as keyof typeof ringStylesWithIcon]?.['icon']
                              : ''}
                          </span>
                        )}
                        <span className="link-text">{isBold ? <strong>{copy}</strong> : copy}</span>
                      </>
                    </Link>
                  )}
                  {nestedLinks && nestedLinks?.length > 0 && (
                    <ul className="grandchildren-links">
                      {nestedLinks?.map((link, nestedLinkIndex: number) => {
                        const { route, newRoute, copy } = link;

                        return (
                          <li key={`nested-link-menu-${colIndex}-item-${nestedLinkIndex}`}>
                            <Link href={newRoute || route} onClick={() => setIsMobileMenuOpen(false)}>
                              <span className="link-text">{copy}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              )
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
