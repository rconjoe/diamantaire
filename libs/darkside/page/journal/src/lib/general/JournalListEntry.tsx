import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { useJournalConfig } from '@diamantaire/darkside/data/hooks';
import { ReactNode } from 'react';

import { JournalHeader } from './JournalHeader';
import { JournalListEntryStyles } from './JournalListEntry.style';

type JournalListEntryProps = {
  slug: string;
  seo?: object;
  map?: object;
  content1?: Array<any>;
  content2?: Array<any>;
  blogHeader?: object;
  children: ReactNode;
};

const JournalListEntry = (props: JournalListEntryProps) => {
  const { data: { blogConfiguration } = {} } = useJournalConfig('en_US');

  const { categoriesToDisplay } = blogConfiguration || {};

  return (
    <JournalListEntryStyles>
      <JournalHeader showNavLogo={true} showTitle={true} categoriesToDisplay={categoriesToDisplay} />

      {props.content1.map((contentBlockData) => {
        const { id, _modelApiKey } = contentBlockData;

        return <BlockPicker key={id} _modelApiKey={_modelApiKey} modularBlockData={contentBlockData} />;
      })}

      {props.content2.map((contentBlockData) => {
        const { id, _modelApiKey } = contentBlockData;

        return <BlockPicker key={id} _modelApiKey={_modelApiKey} modularBlockData={contentBlockData} />;
      })}

      {props.children}
    </JournalListEntryStyles>
  );
};

export default JournalListEntry;
