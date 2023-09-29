import { DiamondShapesProvider } from '@diamantaire/darkside/context/diamond-icon-context';
import { EmptyCalendarIcon, Logo } from '@diamantaire/shared/icons';
import { BP_LG } from '@diamantaire/styles/darkside-styles';
import { AnimatePresence } from 'framer-motion';
import Hamburger from 'hamburger-react';
import Link from 'next/link';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { NavItemsProps } from './header-types';
import HeaderActionsNav from './HeaderActionsNav';
import MobileMenu from './MobileMenu';

type MobileHeaderTypes = {
  navItems: NavItemsProps;
  headerHeight: number;
  toggleCart?: () => void;
};

const MobileHeaderContainer = styled.div`
  padding: 20px;

  @media (min-width: ${BP_LG}) {
    display: none;
  }

  .mobile-header-wrapper {
    display: flex;
    align-items: center;
    .col {
      flex: 1;

      &.col--left {
        nav {
          ul {
            padding: 0;
            margin: 0;
            list-style: none;
            display: flex;
            align-items: center;

            li {
              margin-right: 5px;
              &:last-child {
                margin-right: 0px;
              }

              &.menu-toggle-container.active {
                .hamburger-react {
                  top: -1px;
                }
              }

              .hamburger-react {
                width: 18px !important;
                height: 18px !important;
                overflow: hidden;
                position: relative;
                top: 2px;

                > div {
                  left: 0 !important;

                  &:first-child {
                    top: 0 !important;
                  }
                  &:nth-child(2) {
                    top: 6px !important;
                  }
                  &:nth-child(3) {
                    top: 12px !important;
                  }
                }
              }

              img {
                max-width: 28px;
                position: relative;
                top: -1px;
              }
            }
          }
        }
      }

      &.col--center {
        text-align: center;
        a {
          display: inline-block;

          svg {
            width: 60px;
            height: auto;
          }
        }
      }
      &.col--right {
        li.accounts {
          display: none;
        }
      }
    }
  }
`;

const MobileHeader: FC<MobileHeaderTypes> = ({ navItems, headerHeight, toggleCart }): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <MobileHeaderContainer>
        <div className="mobile-header-wrapper">
          <div className="col col--left">
            <nav>
              <ul>
                <li className={isMobileMenuOpen ? 'menu-toggle-container active' : 'menu-toggle-container'}>
                  <Hamburger label="Toggle mobile menu" toggled={isMobileMenuOpen} toggle={setIsMobileMenuOpen} size={18} />
                </li>
                <li className="calendar">
                  <EmptyCalendarIcon />
                </li>
              </ul>
            </nav>
          </div>
          <div className="col col--center">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="col col--right">
            <HeaderActionsNav toggleCart={toggleCart} />
          </div>
        </div>
      </MobileHeaderContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <DiamondShapesProvider>
            <MobileMenu navItems={navItems} headerHeight={headerHeight} />
          </DiamondShapesProvider>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileHeader;
