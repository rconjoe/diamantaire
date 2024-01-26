import { Heading, ShowMobileOnly, ShowTabletAndUpOnly, UniLink } from '@diamantaire/darkside/components/common-ui';
import { useShowroomNav } from '@diamantaire/darkside/data/hooks';
import { getRelativeUrl } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ShowroomNavStyle } from './ShowroomNav.style';

const ShowroomNav = ({ currentLocation }: { currentLocation: string }) => {
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { data }: any = useShowroomNav(router.locale);
  const { title, links } = data.showroomNav;

  const linksSortedByCountry = {};

  links.map((link) => {
    if (Array.isArray(linksSortedByCountry[link.country])) {
      linksSortedByCountry[link.country].push(link);
    } else {
      linksSortedByCountry[link.country] = [link];
    }
  });

  const handleRouteChange = () => {
    setIsMobileNavOpen(false);
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <ShowroomNavStyle>
      <ShowMobileOnly>
        <div className="mobile-nav">
          <div className="mobile-nav__toggle">
            <Heading type="h3" className="mobile-nav-title">
              {title}:
            </Heading>

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
          <Heading type="h3" className="desktop-nav-title">
            {title}
          </Heading>

          <ShowroomNavItems currentLocation={currentLocation} linksSortedByCountry={linksSortedByCountry} />
        </div>
      </ShowTabletAndUpOnly>
    </ShowroomNavStyle>
  );
};

export default ShowroomNav;

const ShowroomNavItems = ({ linksSortedByCountry, currentLocation }) => {
  return (
    <>
      {Object.keys(linksSortedByCountry).map((country) => {
        return (
          <div className="list__container" key={`showroom-${country}`}>
            <Heading type="h4">{country}</Heading>

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
