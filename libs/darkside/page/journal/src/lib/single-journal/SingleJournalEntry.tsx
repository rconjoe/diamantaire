import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { UIString, UniLink } from '@diamantaire/darkside/core';
import { useSingleJournal } from '@diamantaire/darkside/data/hooks';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
// import PageMetaTitleAndDescription from 'libs/darkside/core/src/lib/seo/PageMetaTitleAndDescription';
import { getRelativeUrl } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';

import { SingleJournalEntryStyles } from './SingleJourneyEntry.style';

const SingleJournalEntry = ({ isMobile, countryCode }) => {
  const router = useRouter();
  const slug = router.query.slug;
  const data = useSingleJournal('en_US', slug);
  const [singleJournal, setSingleJournal] = useState<any>(data?.blogPost);

  const { seoTitle, seoDescription } = singleJournal || {};

  useEffect(() => {
    setSingleJournal(data?.blogPost);
  }, [data]);

  const crumbs = [
    {
      key: 'home',
      copy: 'Home',
      path: 'https://www.vrai.com/',
    },
    {
      key: 'journal',
      copy: 'Journal',
      path: 'https://www.vrai.com/journal',
    },
    {
      key: slug,
      copy: singleJournal?.title,
      path: router.asPath,
    },
  ];

  return (
    <SingleJournalEntryStyles>
      {seoTitle && seoDescription && <NextSeo title={seoTitle} description={seoDescription} />}

      <div className="journal-entry__crumbs">
        {crumbs.map(({ copy, path }, i) => {
          return (
            <UniLink key={i} route={getRelativeUrl(path)}>
              <UIString>{copy}</UIString>
            </UniLink>
          );
        })}
      </div>
      {data?.blogPost?.content?.map((contentBlockData) => {
        const { id, _modelApiKey } = contentBlockData;

        return (
          <BlockPicker
            key={id}
            _modelApiKey={_modelApiKey}
            modularBlockData={contentBlockData}
            isMobile={isMobile}
            countryCode={countryCode}
          />
        );
      })}
    </SingleJournalEntryStyles>
  );
};

SingleJournalEntry.getTemplate = getStandardTemplate;

export { SingleJournalEntry };
