import { ShowMobileOnly, ShowTabletAndUpOnly } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { useGlobalContext, useShowroomNav } from '@diamantaire/darkside/data/hooks';
import { getRelativeUrl } from '@diamantaire/shared/helpers';
import { useState } from 'react';

import { ShowroomNavContainer } from './ShowroomNav.style';

const ShowroomNav = ({ currentLocation }: { currentLocation: string }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(true);
  const { data }: any = useShowroomNav('en_US');
  const { headerHeight } = useGlobalContext();
  const { title, links } = data.showroomNav;

  const linksSortedByCountry = {};

  links.map((link) => {
    if (Array.isArray(linksSortedByCountry[link.country])) {
      linksSortedByCountry[link.country].push(link);
    } else {
      linksSortedByCountry[link.country] = [link];
    }
  });

  return (
    <ShowroomNavContainer $headerHeight={headerHeight}>
      <ShowMobileOnly>
        <div className="mobile-nav">
          <div className="mobile-nav__toggle">
            <h3>{title}:</h3>
            <button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
              <span className="text">{currentLocation}</span> <span className="icon">{isMobileNavOpen ? '▲' : '▼'}</span>
            </button>
          </div>

          {isMobileNavOpen && (
            <div className="mobile-nav__menu">
              <ShowroomNavItems currentLocation={currentLocation} linksSortedByCountry={linksSortedByCountry} />
            </div>
          )}
        </div>
      </ShowMobileOnly>

      <ShowTabletAndUpOnly>
        <div className="desktop-nav">
          <h3>{title}</h3>

          <ShowroomNavItems currentLocation={currentLocation} linksSortedByCountry={linksSortedByCountry} />
        </div>
      </ShowTabletAndUpOnly>
    </ShowroomNavContainer>
  );
};

export default ShowroomNav;

const ShowroomNavItems = ({ linksSortedByCountry, currentLocation }) => {
  return (
    <>
      {Object.keys(linksSortedByCountry).map((country) => {
        return (
          <div className="list__container" key={`showroom-${country}`}>
            <h4>{country}</h4>
            <ul>
              {linksSortedByCountry[country].map((link) => {
                const { copy, route } = link || {};
                const isLinkActive = currentLocation === copy ? 'active' : '';

                return (
                  <li key={`showroom-city-${copy}`}>
                    <UniLink route={getRelativeUrl(route)} className={isLinkActive}>
                      {copy}
                    </UniLink>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
};
