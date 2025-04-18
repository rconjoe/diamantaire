import { parseValidLocale } from '@diamantaire/shared/constants';
import { getRelativeUrl, isCountrySupported } from '@diamantaire/shared/helpers';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { diamondShapesWithIcon, ringStylesWithIcon } from './header-helpers';
import { MenuLink, NavItemsProps, SubMenuChildLink } from './header-types';
import { MegaMenuStylesContainer } from './MegaMenuStyles.style';

type MegaMenuProps = {
  navItems: NavItemsProps;
  megaMenuIndex: number;
  dynamicTop: number;
};

const MegaMenu: FC<MegaMenuProps> = (props) => {
  const { navItems, megaMenuIndex, dynamicTop } = props;
  const router = useRouter();
  const locale = router.locale;
  const { countryCode } = parseValidLocale(locale);

  return (
    <MegaMenuStylesContainer className={megaMenuIndex === -1 ? 'hide' : ''} $dynamicTop={dynamicTop}>
      <div className="mega-menu__wrapper container-wrapper">
        {Array.isArray(navItems) &&
          navItems?.map((menu, menuIndex) => {
            const { key, columns }: Partial<MenuLink> = menu;

            return (
              <div
                className={clsx(`menu-container ${key}`, {
                  'four-col': columns?.length > 3,
                })}
                key={`mm-${menuIndex}`}
                style={{
                  display: megaMenuIndex === menuIndex ? (key === 'VRAIcreatedDiamond' ? 'inline-flex' : 'flex') : 'none',
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
                            <Link href={getRelativeUrl(newRoute)}>{columnTitle}</Link>
                          ) : route !== '' ? (
                            <Link href={getRelativeUrl(newRoute)}>{columnTitle}</Link>
                          ) : (
                            columnTitle
                          )}
                        </h4>
                        <ul>
                          {links.map((link, colIndex: number) => {
                            const {
                              linkKey,
                              nestedLinks,
                              newRoute: subMenuRoute,
                              copy: nestedLinkCopy,
                              supportedCountries,
                              isBold,
                            }: Partial<SubMenuChildLink> = link;

                            const iconType = diamondShapesWithIcon?.[linkKey as keyof typeof diamondShapesWithIcon]
                              ? 'diamond'
                              : ringStylesWithIcon[linkKey as keyof typeof ringStylesWithIcon]
                              ? 'ring-style'
                              : '';

                            return (
                              isCountrySupported(supportedCountries, countryCode) && (
                                <li key={`mm-c-${menuIndex}-col-${colIndex}`}>
                                  <Link href={getRelativeUrl(subMenuRoute)} className={iconType ? 'has-icon' : ''}>
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
                                        const { newRoute, copy } = nestedLink;

                                        return (
                                          <li key={`nested-link-menu-${colIndex}-item-${nestedLinkIndex}`}>
                                            <Link href={getRelativeUrl(newRoute)}>
                                              <span className="link-text">{isBold ? <strong>{copy}</strong> : copy}</span>
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
                })}
              </div>
            );
          })}
      </div>
    </MegaMenuStylesContainer>
  );
};

export default MegaMenu;
