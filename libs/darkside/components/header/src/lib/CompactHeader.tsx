import { getRelativeUrl } from '@diamantaire/shared/helpers';
import { Logo } from '@diamantaire/shared/icons';
import { BP_LG } from '@diamantaire/styles/darkside-styles';
import Link from 'next/link';
import React, { FC } from 'react';
import styled from 'styled-components';

import { MenuLink, NavItemsProps } from './header-types';
import HeaderActionsNav from './HeaderActionsNav';

type CompactHeaderTypes = {
  navItems: NavItemsProps;
  toggleMegaMenuOpen: (_index: number) => void;
  menuIndex: number;
  compactHeaderRef?: React.RefObject<HTMLDivElement>;
  toggleCart?: () => void;
};

const CompactHeaderStyles = styled.div`
  width: 100%;
  background-color: #fff;
  z-index: 5000;
  top: auto;
  left: 0;
  width: 100%;
  display: none;

  @media (min-width: ${BP_LG}) {
    display: block;
  }

  .compact-header__container {
    position: relative;
    padding: 1.4rem 0;

    height: 100%;

    .compact-header__nav-wrapper {
      display: flex;
      align-items: center;
      max-width: 90vw;
      margin: 0 auto;

      .nav__col {
        &--left {
          flex: 1;

          .nav__logo {
            a {
              display: inline-block;

              svg {
                max-width: 6rem;
                height: auto;
              }
            }
          }
        }

        &--center {
          flex: 2;

          .compact-header__nav {
            min-width: 50rem;

            ul {
              display: flex;
              justify-content: center;
              margin: 0;
              padding: 0;
              list-style: none;
              li {
                margin: 0 1.5rem;
                a {
                  font-size: 1.4rem;
                  letter-spacing: 0.03rem;
                  text-decoration: none;
                  position: relative;
                  transition: 0.25s;
                  text-transform: uppercase;

                  &::before {
                    content: '';
                    background: #719093;
                    display: block;
                    position: absolute;
                    bottom: -0.5rem;
                    left: 0;
                    height: 0.2rem;
                    transition: 0.25s;
                    width: 0%;
                  }

                  &:hover,
                  &.active {
                    color: #000;
                    &::before {
                      width: 100%;
                    }
                  }
                }
              }
            }
          }
        }

        &--right {
          flex: 1;
        }
      }
    }
  }
`;

const CompactHeader: FC<CompactHeaderTypes> = ({
  navItems,
  toggleMegaMenuOpen,
  menuIndex,
  compactHeaderRef,
  toggleCart,
}): JSX.Element => {
  return (
    <CompactHeaderStyles ref={compactHeaderRef ? compactHeaderRef : null}>
      <div className="compact-header__container">
        <div className="compact-header__nav-wrapper stacked-header__top-level">
          <div className="nav__col--left">
            <div className="nav__logo">
              <Link aria-label="VRAI Logo" href="/">
                <Logo />
              </Link>
            </div>
          </div>

          <div className="nav__col--center">
            <nav className="compact-header__nav">
              <ul>
                {Array.isArray(navItems) &&
                  navItems?.map((link: MenuLink, index: number) => {
                    const { title, route, newRoute }: Partial<MenuLink> = link;

                    return (
                      <li key={`stacked-link-${index}`}>
                        {(route || newRoute) && (
                          <Link
                            href={newRoute ? newRoute : getRelativeUrl(route)}
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

          <div className="nav__col--right">
            <HeaderActionsNav toggleCart={toggleCart} />
          </div>
        </div>
      </div>
    </CompactHeaderStyles>
  );
};

export default CompactHeader;
