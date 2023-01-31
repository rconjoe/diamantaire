import Link from 'next/link';
import React, { FC, useContext } from 'react';

import { DiamondShapesContext } from '@diamantaire/darkside/context/diamond-icon-context';

import { MenuLink, NavItemsProps, SubMenuChildLink } from './header-types';
import MegaMenuStyles from './MegaMenuStyles';

type MegaMenuProps = {
  navItems: NavItemsProps;
  headerHeight: number;
  megaMenuIndex: number;
  getRelativeUrl: (arg0: string) => string;
};

const MegaMenu: FC<MegaMenuProps> = ({
  navItems,
  megaMenuIndex,
  headerHeight,
  getRelativeUrl,
}) => {
  const diamondContext = useContext(DiamondShapesContext);
  if (!diamondContext) return null;

  const { diamondShapesWithIcon, ringStylesWithIcon } = diamondContext;

  return (
    <MegaMenuStyles
      className={megaMenuIndex === -1 ? 'hide' : ''}
      headerHeight={headerHeight}
    >
      <div className="mega-menu__wrapper">
        {Array.isArray(navItems) &&
          navItems?.map((menu, menuIndex) => {
            const { key, columns }: Partial<MenuLink> = menu;

            return (
              <div
                className={`menu-container ${key}`}
                key={`mm-${menuIndex}`}
                style={{
                  display: megaMenuIndex === menuIndex ? 'flex' : 'none',
                }}
              >
                {columns?.map((column, index) => {
                  const { columnTitle, colKey, links } = column || {};

                  return (
                    <div
                      className={`menu-container__col ${
                        colKey ? colKey : columnTitle.toLowerCase()
                      }`}
                      key={`mm-c-${index}`}
                    >
                      <div className="col__inner">
                        <h4>{columnTitle}</h4>
                        <ul>
                          {links.map((link, colIndex: number) => {
                            const {
                              linkKey,
                              nestedLinks,
                              route,
                              copy,
                            }: Partial<SubMenuChildLink> = link;
                            const iconType = diamondShapesWithIcon?.[
                              linkKey as keyof typeof diamondShapesWithIcon
                            ]
                              ? 'diamond'
                              : ringStylesWithIcon[
                                  linkKey as keyof typeof ringStylesWithIcon
                                ]
                              ? 'ring-style'
                              : '';

                            return (
                              <li key={`mm-c-${menuIndex}-col-${colIndex}`}>
                                <Link
                                  href={getRelativeUrl(route)}
                                  className={iconType ? 'has-icon' : ''}
                                >
                                  <>
                                    {linkKey && (
                                      <span className={iconType}>
                                        {diamondShapesWithIcon[
                                          linkKey as keyof typeof diamondShapesWithIcon
                                        ]
                                          ? diamondShapesWithIcon[
                                              linkKey as keyof typeof diamondShapesWithIcon
                                            ]?.['icon']
                                          : ringStylesWithIcon
                                          ? ringStylesWithIcon[
                                              linkKey as keyof typeof ringStylesWithIcon
                                            ]?.['icon']
                                          : ''}
                                      </span>
                                    )}
                                    <span className="link-text">{copy}</span>
                                  </>
                                </Link>

                                {nestedLinks?.length > 0 && (
                                  <ul className="grandchildren-links">
                                    {nestedLinks?.map((link, index: number) => {
                                      const { route, copy } = link;

                                      return (
                                        <li
                                          key={`nested-link-menu-${colIndex}-item-${index}`}
                                        >
                                          <Link href={getRelativeUrl(route)}>
                                            <span className="link-text">
                                              {copy}
                                            </span>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </MegaMenuStyles>
  );
};

export default MegaMenu;
