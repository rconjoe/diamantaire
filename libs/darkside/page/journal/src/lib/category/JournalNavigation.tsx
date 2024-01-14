import { Heading, UIString, UniLink } from '@diamantaire/darkside/components/common-ui';
import { getRelativeUrl } from '@diamantaire/shared/helpers';

import { JournalNavigationStyles } from './JournalNavigation.style';

type JournalNavigationProps = {
  links: Array<{ route: string; copy: string }>;
  showNavLogo: boolean;
};

const JournalNavigation = ({ links, showNavLogo }: JournalNavigationProps) => {
  return (
    <JournalNavigationStyles>
      <div className="blog-navigation">
        <div className="blog-navigation__logo">
          {showNavLogo && (
            <UniLink route={`/journal`}>
              <Heading type="h2">
                <UIString>VRAI Journal</UIString>
              </Heading>
            </UniLink>
          )}
        </div>
        <div className="blog-navigation__header-links">
          {links?.map((navLink) => {
            const { route, copy } = navLink;

            return (
              <UniLink key={route} route={getRelativeUrl(route)} className="blog-navigation__item">
                {copy}
              </UniLink>
            );
          })}
        </div>
      </div>
    </JournalNavigationStyles>
  );
};

export { JournalNavigation };
