import { BP_LG } from '@diamantaire/shared/constants';
import { CalendarIcon, Logo } from '@diamantaire/shared/icons';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import Hamburger from 'hamburger-react';
import Link from 'next/link';
import React, { FC, useState } from 'react';

import { NavItemsProps } from './header-types';
import HeaderActionsNav from './HeaderActionsNav';
import MobileMenu from './MobileMenu';

type MobileHeaderTypes = {
  navItems: NavItemsProps;
  headerHeight: number;
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
                width: 20px !important;
                height: 20px !important;
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

              svg {
                width: 28px;
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

const MobileHeader: FC<MobileHeaderTypes> = ({ navItems, headerHeight }): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <MobileHeaderContainer>
        <div className="mobile-header-wrapper">
          <div className="col col--left">
            <nav>
              <ul>
                <li className={isMobileMenuOpen ? 'menu-toggle-container active' : 'menu-toggle-container'}>
                  <Hamburger toggled={isMobileMenuOpen} toggle={setIsMobileMenuOpen} size={18} />
                </li>
                <li className="calendar">
                  <CalendarIcon />
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
            <HeaderActionsNav />
          </div>
        </div>
      </MobileHeaderContainer>
      <AnimatePresence>{isMobileMenuOpen && <MobileMenu navItems={navItems} headerHeight={headerHeight} />}</AnimatePresence>
    </>
  );
};

export default MobileHeader;
