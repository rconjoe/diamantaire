import { getRelativeUrl } from '@diamantaire/shared/helpers';
import Link from 'next/link';
import { FC } from 'react';

import { MenuLink, NavItemsProps, SubMenuChildLink } from './header-types';
import { MegaMenuStylesContainer } from './MegaMenuStyles.style';

type MegaMenuProps = {
  navItems: NavItemsProps;
  headerHeight: number;
  megaMenuIndex: number;
  isCompactMenuVisible: boolean;
};

const MegaMenu: FC<MegaMenuProps> = ({ navItems, megaMenuIndex, headerHeight, isCompactMenuVisible }) => {
  return (
    <MegaMenuStylesContainer
      className={megaMenuIndex === -1 ? 'hide' : ''}
      $headerHeight={headerHeight}
      $isFixed={isCompactMenuVisible}
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
                      className={`menu-container__col ${colKey ? colKey : columnTitle.toLowerCase()}`}
                      key={`mm-c-${index}`}
                    >
                      <div className="col__inner">
                        <h4>{columnTitle}</h4>
                        <ul>
                          {links.map((link, colIndex: number) => {
                            const {
                              // linkKey,
                              nestedLinks,
                              route: subMenuRoute,
                              copy: nestedLinkCopy,
                            }: Partial<SubMenuChildLink> = link;
                            // const iconType = diamondShapesWithIcon?.[linkKey as keyof typeof diamondShapesWithIcon]
                            //   ? 'diamond'
                            //   : ringStylesWithIcon[linkKey as keyof typeof ringStylesWithIcon]
                            //   ? 'ring-style'
                            //   : '';

                            return (
                              <li key={`mm-c-${menuIndex}-col-${colIndex}`}>
                                {/* <Link href={getRelativeUrl(subMenuRoute)} className={iconType ? 'has-icon' : ''}> */}
                                <Link href={getRelativeUrl(subMenuRoute)}>
                                  <>
                                    {/* {linkKey && (
                                      <span className={iconType}>
                                        {diamondShapesWithIcon[linkKey as keyof typeof diamondShapesWithIcon]
                                          ? diamondShapesWithIcon[linkKey as keyof typeof diamondShapesWithIcon]?.['icon']
                                          : ringStylesWithIcon
                                          ? ringStylesWithIcon[linkKey as keyof typeof ringStylesWithIcon]?.['icon']
                                          : ''}
                                      </span>
                                    )} */}
                                    <span className="link-text">{nestedLinkCopy}</span>
                                  </>
                                </Link>

                                {nestedLinks?.length > 0 && (
                                  <ul className="grandchildren-links">
                                    {nestedLinks?.map((nestedLink, nestedLinkIndex: number) => {
                                      const { route, copy }: { route: string; copy: string } = nestedLink;

                                      return (
                                        <li key={`nested-link-menu-${colIndex}-item-${nestedLinkIndex}`}>
                                          <Link href={getRelativeUrl(route)}>
                                            <span className="link-text">{copy}</span>
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
    </MegaMenuStylesContainer>
  );
};

export default MegaMenu;
