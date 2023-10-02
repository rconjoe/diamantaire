import { DiamondShapesProvider } from '@diamantaire/darkside/context/diamond-icon-context';
import { EmptyCalendarIcon, Logo } from '@diamantaire/shared/icons';
import { desktopAndUp, media } from '@diamantaire/styles/darkside-styles';
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
  padding: 15px 20px;
  max-height: 56px;

  ${media.medium`display: none;`}

  .mobile-header-wrapper {
    align-items: center;
    display: flex;
    flex: 1;

    .col {
      flex: 1;

      svg {
        height: 21px;
      }

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
              display: flex;
              align-items: center;

              &:last-child {
                margin-right: 0px;
              }

              &.hamburger {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 28px;
                overflow: hidden;
                position: relative;
              }

              &.calendar {
                transform: translate(-5px, 0);

                svg {
                  height: 23px;

                  ${desktopAndUp(`
                    height: 18px;
                  `)}
                }
              }

              img {
                max-width: 28px;
                position: relative;
              }
            }
          }
        }
      }

      &.col--center {
        text-align: center;
        font-size: 0;

        a {
          display: inline-block;

          svg {
            width: 60px;
            height: auto;
          }
        }
      }

      &.col--right {
        li {
          display: flex;
          align-items: center;

          svg {
            height: 23px;
          }
        }

        li.wishlist {
          transform: translateY(1px);
          svg {
            height: 20px;
          }
        }

        li.cart {
          transform: translateY(-1px);
        }

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
                <li
                  className={'hamburger' + (isMobileMenuOpen ? ' menu-toggle-container active' : ' menu-toggle-container')}
                >
                  <Hamburger label="Toggle mobile menu" toggled={isMobileMenuOpen} toggle={setIsMobileMenuOpen} size={16} />
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
