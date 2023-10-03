import { DiamondShapesContext } from '@diamantaire/darkside/context/diamond-icon-context';
import { getRelativeUrl } from '@diamantaire/shared/helpers';
import Link from 'next/link';
import { FC, useContext } from 'react';

import { MenuLink, NavItemsProps, SubMenuChildLink } from './header-types';
import { MegaMenuStylesContainer } from './MegaMenuStyles.style';

type MegaMenuProps = {
  navItems: NavItemsProps;
  headerHeight: number;
  megaMenuIndex: number;
  isCompactMenuVisible: boolean;
};

const MegaMenu: FC<MegaMenuProps> = ({ navItems, megaMenuIndex, headerHeight, isCompactMenuVisible }) => {
  const data: any = useContext(DiamondShapesContext);
  const { diamondShapesWithIcon, ringStylesWithIcon } = data || {};

  return (
    <MegaMenuStylesContainer
      className={megaMenuIndex === -1 ? 'hide' : ''}
      $headerHeight={headerHeight}
      $isFixed={isCompactMenuVisible}
    >
      <div className="mega-menu__wrapper container-wrapper">
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
                  const { columnTitle, colKey, links, route, newRoute } = column || {};

                  return (
                    <div
                      className={`menu-container__col ${colKey ? colKey : columnTitle.toLowerCase()}`}
                      key={`mm-c-${index}`}
                    >
                      <div className="col__inner">
                        <h4>
                          {newRoute !== '' ? (
                            <Link href={getRelativeUrl(route)}>{columnTitle}</Link>
                          ) : route !== '' ? (
                            <Link href={getRelativeUrl(route)}>{columnTitle}</Link>
                          ) : (
                            columnTitle
                          )}
                        </h4>
                        <ul>
                          {links.map((link, colIndex: number) => {
                            const {
                              linkKey,
                              nestedLinks,
                              route: subMenuRoute,
                              newRoute,
                              copy: nestedLinkCopy,
                              isBold,
                            }: Partial<SubMenuChildLink> = link;

                            const iconType = diamondShapesWithIcon?.[linkKey as keyof typeof diamondShapesWithIcon]
                              ? 'diamond'
                              : ringStylesWithIcon[linkKey as keyof typeof ringStylesWithIcon]
                              ? 'ring-style'
                              : '';

                            return (
                              <li key={`mm-c-${menuIndex}-col-${colIndex}`}>
                                <Link href={getRelativeUrl(newRoute || subMenuRoute)} className={iconType ? 'has-icon' : ''}>
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

                                    <span className="link-text">
                                      {isBold ? <strong>{nestedLinkCopy}</strong> : nestedLinkCopy}
                                    </span>
                                  </>
                                </Link>

                                {nestedLinks?.length > 0 && (
                                  <ul className="grandchildren-links">
                                    {nestedLinks?.map((nestedLink, nestedLinkIndex: number) => {
                                      const { newRoute, route, copy } = nestedLink;

                                      return (
                                        <li key={`nested-link-menu-${colIndex}-item-${nestedLinkIndex}`}>
                                          <Link href={getRelativeUrl(newRoute || route)}>
                                            <span className="link-text">{isBold ? <strong>{copy}</strong> : copy}</span>
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
