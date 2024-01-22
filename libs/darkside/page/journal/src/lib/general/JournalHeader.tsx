import { Heading, UIString } from '@diamantaire/darkside/components/common-ui';
import Link from 'next/link';

import { JournalHeaderStyles } from './JournalHeader.style';
import { JournalNavigation } from '../category/JournalNavigation';

type JournalHeaderProps = {
  showTitle: boolean;
  showNavLogo: boolean;
  categoriesToDisplay: {
    id: string;
    key: string;
    route: string;
    copy: string;
    seoTitle: string;
    seoDescription: string;
    subcategories?: {
      copy: string;
      id: string;
      key: string;
      route: string;
      seoTitle: string;
      seoDescription: string;
    }[];
  }[];
};

const JournalHeader = ({ categoriesToDisplay, showTitle, showNavLogo }: JournalHeaderProps) => {
  return (
    <JournalHeaderStyles>
      {showTitle && (
        <Heading type="h1" className="title-container">
          <Link href={'/journal'}>
            <UIString>VRAI Journal</UIString>
          </Link>
        </Heading>
      )}
      <JournalNavigation links={categoriesToDisplay} showNavLogo={showNavLogo} />
    </JournalHeaderStyles>
  );
};

export { JournalHeader };
