import { UIString } from '@diamantaire/darkside/components/common-ui';
import { DiamondShapesContext } from '@diamantaire/darkside/context/diamond-icon-context';
import { ChevronRightIcon } from '@diamantaire/shared/icons';
import { desktopAndUp, MAIN_FONT } from '@diamantaire/styles/darkside-styles';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FC, useContext, useState } from 'react';
import styled from 'styled-components';

import { MenuLink, NavColumn, NavItemsProps, SubMenuChildLink } from './header-types';

type MobileMenuContainerProps = {
  $headerHeight: number;
};

const MobileMenuContainer = styled(motion.div)<MobileMenuContainerProps>`
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  position: fixed;
  padding-bottom: 14rem;
  top: ${(props) => props.$headerHeight + 'px'};
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
        > a {
          background-color: #fff;
          border: none;
          border-bottom: 1px solid #000;
          padding: 1rem 0;
          display: flex;
          width: 100%;
          align-items: center;
          font-family: ${MAIN_FONT};
          text-transform: uppercase;
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-xxxsmall);

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
            top: 2px;

            svg {
              transition: 0.25s;
              width: 10px;
              height: 17px;
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
        font-size: 14px;
        margin: 0 0 1rem;
      }

      .submenu__list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          a {
            display: block;
            font-size: 1.7rem;
            margin-top: 1rem;

            &.has-icon {
              display: flex;
              align-items: center;
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
              margin-right: 5px;
              font-size: 1.7rem;

              &.diamond {
                top: 4px;
                flex: 0 0 3rem;
                svg {
                  max-width: 2.8rem;
                  height: 2.8rem;
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
};

const MobileMenu: FC<MobileMenuProps> = ({ navItems, headerHeight }): JSX.Element => {
  return (
    <MobileMenuContainer
      $headerHeight={headerHeight ? headerHeight : 0}
      key={`mobile-container`}
      initial="closed"
      animate="open"
      exit="closed"
      transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
      variants={{
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: -100 },
      }}
    >
      <nav>
        <ul className="mobile-top-level-links-container">
          {Array.isArray(navItems) &&
            navItems?.map((item, index) => {
              return <MobileTopLevelLink item={item} key={`mobile-menu-parent-link-${index}`} />;
            })}
          <li>
            <Link href="/account/login">
              <UIString>Account</UIString>
            </Link>
          </li>
        </ul>
      </nav>
    </MobileMenuContainer>
  );
};

const MobileTopLevelLink = ({ item }: { item: MenuLink }) => {
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
            return <MobileSubMenu key={`mobile-menu-${colIndex}`} col={col} colIndex={colIndex} />;
          })}
      </AnimatePresence>
    </li>
  );
};

const MobileSubMenu = ({ col, colIndex }: { col: NavColumn; colIndex: number }) => {
  const { columnTitle, links }: NavColumn = col;

  const diamondShapesContext = useContext(DiamondShapesContext);

  if (!diamondShapesContext) {
    return null;
  }

  const { diamondShapesWithIcon, ringStylesWithIcon }: { diamondShapesWithIcon: object; ringStylesWithIcon: object } =
    diamondShapesContext;

  return (
    <div className="mobile-submenu__container">
      <div className="mobile-submenu__inner">
        <h4 className="submenu__title">{columnTitle}</h4>
        <ul className="submenu__list">
          {links?.map((link, index) => {
            const { linkKey, nestedLinks, route, copy, isBold }: Partial<SubMenuChildLink> = link;

            const iconType = diamondShapesWithIcon?.[linkKey as keyof typeof diamondShapesWithIcon]
              ? 'diamond'
              : ringStylesWithIcon[linkKey as keyof typeof ringStylesWithIcon]
              ? 'ring-style'
              : '';

            return (
              <li key={index}>
                {route && (
                  <Link href={route} className={iconType ? 'has-icon' : ''}>
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
                    {nestedLinks?.map(
                      (
                        link: {
                          route: string;
                          copy: string;
                        },
                        nestedLinkIndex: number,
                      ) => {
                        return (
                          <li key={`nested-link-menu-${colIndex}-item-${nestedLinkIndex}`}>
                            <Link href={link.route}>
                              <span className="link-text">{link.copy}</span>
                            </Link>
                          </li>
                        );
                      },
                    )}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
