import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { Breadcrumb } from '@diamantaire/darkside/components/common-ui';
import { useSingleJournal } from '@diamantaire/darkside/data/hooks';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { useRouter } from 'next/router';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import React, { useEffect, useMemo, useState } from 'react';

import { SingleJournalEntryStyles } from './SingleJourneyEntry.style';
import { generateSubheading } from '../journal-helpers';

const JOURNAL_PATH = '/journal';

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
        path: JOURNAL_PATH,
      },
      {
        title: singleJournal?.category?.copy || "",
        path: `${JOURNAL_PATH}/${singleJournal?.category?.key || ""}`,
      },
      {
        title: singleJournal?.title,
        path: router.asPath,
      },
    ],
    [singleJournal, slug, router.asPath],
  );

  const seoParam = {
    en: '',
    es: '/en-ES/',
    fr: '/fr-FR/',
    de: '/de-DE/',
  };

  const { languageCode } = parseValidLocale(locale);

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? 'https://www.vrai.com'
      : 'http://localhost:4200';

  const pageUrl = baseUrl + seoParam[languageCode] + router?.asPath;

  return (
    <SingleJournalEntryStyles>
      {seoTitle && seoDescription && (
        <>
          <NextSeo
            title={seoTitle}
            description={seoDescription}
            canonical={pageUrl}
          />

          <ArticleJsonLd
            useAppDir={false}
            url={pageUrl}
            title={seoTitle}
            images={[singleJournal?.featuredImage?.url]}
            datePublished="2015-02-05T08:00:00+08:00"
            dateModified="2015-02-05T09:00:00+08:00"
            authorName={[
              {
                name: singleJournal.author,
              },
            ]}
            publisherName={singleJournal.author}
            description={seoDescription}
            isAccessibleForFree={true}
          />
        </>
      )}

      <div className="journal-entry__crumbs">{crumbs && <Breadcrumb breadcrumb={crumbs} simple={true} />}</div>
      {data?.blogPost?.content?.map((contentBlockData) => {
        const { id, _modelApiKey } = contentBlockData;

        if (contentBlockData?.title) {
          contentBlockData.subtitle = generateSubheading(data?.blogPost)
        }

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
