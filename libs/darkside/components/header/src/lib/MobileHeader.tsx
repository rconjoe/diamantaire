import { UIString } from '@diamantaire/darkside/components/common-ui';
import { EmptyCalendarIcon, Logo } from '@diamantaire/shared/icons';
import { desktopAndUp, media } from '@diamantaire/styles/darkside-styles';
import { AnimatePresence } from 'framer-motion';
import Hamburger from 'hamburger-react';
import Link from 'next/link';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { NavItemsProps, ShowroomLocation } from './header-types';
import HeaderActionsNav from './HeaderActionsNav';
import MobileMenu from './MobileMenu';

type MobileHeaderTypes = {
  navItems: NavItemsProps;
  toggleCart?: () => void;
  mobileMenuRef: React.RefObject<HTMLDivElement>;
  showroomLocation: ShowroomLocation | null;
};

const MobileHeaderContainer = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
  backface-visibility: hidden;
  z-index: 5000;
  position: sticky;
  top: -1px;

  .mobile-header-outer-wrapper {
    padding: 0;
    height: 5.6rem;
    display: flex;
    background-color: #fff;
    ${media.medium`display: none;`};

    .mobile-header-wrapper {
      align-items: center;
      display: flex;
      flex: 1;

      .col {
        flex: 1;

        svg {
          height: 2.1rem;
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
                margin-right: 0.5rem;
                display: flex;
                align-items: center;

                &:last-child {
                  margin-right: 0px;
                }

                &.hamburger {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 4.8rem;
                  height: 2.8rem;
                  overflow: hidden;
                  position: relative;
                }

                &.calendar {
                  transform: translate(-0.5rem, 0);
                  .calendar__link {
                    display: flex;
                    align-items: center;
                  }
                  svg {
                    height: 2.4rem;

                    ${desktopAndUp(`
                    height: 1.8rem;
                  `)}
                  }
                }

                img {
                  max-width: 2.8rem;
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
              width: 6rem;
              height: auto;
            }
          }
        }

        &.col--right {
          nav {
            margin-right: 7px;
          }
          li {
            display: flex;
            align-items: center;
          }

          svg {
            width: auto;
          }

          li.wishlist {
            svg {
              top: 0.5rem;
              height: 2.4rem;
            }
          }

          li.cart {
            svg {
              height: 2.4rem;
            }
          }

          li.accounts {
            display: none;
          }
        }
      }
    }
  }
`;

const MobileHeader: FC<MobileHeaderTypes> = ({ navItems, toggleCart, mobileMenuRef, showroomLocation }): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getMobileMenuPosition = () => {
    const rect = mobileMenuRef.current?.getBoundingClientRect();

    return (rect?.top || 0) + (rect?.height || 0);
  };

  const headerHeight = getMobileMenuPosition();

  return (
    <>
      <MobileHeaderContainer id="mobile-navigation--parent">
        <div className="mobile-header-outer-wrapper" ref={mobileMenuRef}>
          <div className="mobile-header-wrapper">
            <div className="col col--left">
              <nav>
                <ul>
                  <li
                    className={'hamburger' + (isMobileMenuOpen ? ' menu-toggle-container active' : ' menu-toggle-container')}
                  >
                    <Hamburger
                      label="Toggle mobile menu"
                      toggled={isMobileMenuOpen}
                      toggle={setIsMobileMenuOpen}
                      size={16}
                    />
                  </li>
                  <li className="calendar">
                    {showroomLocation ? (
                      <Link className="calendar__link" href={`/book-appointment/${showroomLocation.handle}`}>
                        <EmptyCalendarIcon />
                        <span style={{ display: 'none' }}>
                          <UIString>Book an appointment</UIString>
                        </span>
                      </Link>
                    ) : (
                      <Link className="calendar__link" href="/book-appointment/virtual">
                        <EmptyCalendarIcon />
                        <span style={{ display: 'none' }}>
                          <UIString>Book an appointment</UIString>
                        </span>
                      </Link>
                    )}
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
        </div>
      </MobileHeaderContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu navItems={navItems} headerHeight={headerHeight} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileHeader;
