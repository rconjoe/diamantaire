import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { Breadcrumb } from '@diamantaire/darkside/components/common-ui';
import { useSingleJournal } from '@diamantaire/darkside/data/hooks';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import React, { useEffect, useMemo, useState } from 'react';

import { SingleJournalEntryStyles } from './SingleJourneyEntry.style';

const SingleJournalEntry = () => {
  const router = useRouter();
  const locale = router.locale;
  const slug = router.query.slug;
  const data = useSingleJournal(locale, slug);
  const [singleJournal, setSingleJournal] = useState<any>(data?.blogPost);

  const { countryCode: selectedCountryCode } = parseValidLocale(locale);

  const { seoTitle, seoDescription } = singleJournal || {};

  useEffect(() => {
    setSingleJournal(data?.blogPost);
  }, [data]);

  const crumbs = useMemo(
    () => [
      {
        title: 'Home',
        path: '/',
      },
      {
        title: 'Journal',
        path: '/',
      },
      {
        title: singleJournal?.category.copy,
        path: `/${singleJournal?.category.key}`,
      },
      {
        title: singleJournal?.title,
        path: router.asPath,
      },
    ],
    [singleJournal, slug, router.asPath],
  );

  return (
    <SingleJournalEntryStyles>
      {seoTitle && seoDescription && (
        <NextSeo
          title={seoTitle}
          description={seoDescription}
          canonical={(process.env.VERCEL_URL ? process.env.VERCEL_URL : 'http:localhost:4200') + router?.asPath}
        />
      )}

      <div className="journal-entry__crumbs">{crumbs && <Breadcrumb breadcrumb={crumbs} simple={true} />}</div>

      {data?.blogPost?.content?.map((contentBlockData) => {
        const { id, _modelApiKey } = contentBlockData;

        return (
          <React.Fragment key={id}>
            <BlockPicker _modelApiKey={_modelApiKey} modularBlockData={contentBlockData} countryCode={selectedCountryCode} />
          </React.Fragment>
        );
      })}
    </SingleJournalEntryStyles>
  );
};

SingleJournalEntry.getTemplate = getStandardTemplate;

export { SingleJournalEntry };
