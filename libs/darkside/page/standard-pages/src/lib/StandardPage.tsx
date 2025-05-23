import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { getAllStandardPageSlugs } from '@diamantaire/darkside/data/api';
import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { parseValidLocale, getCurrency } from '@diamantaire/shared/constants';
import { getSwrRevalidateConfig } from '@diamantaire/shared/helpers';
import { useRudderStackAnalytics } from '@diamantaire/shared/rudderstack';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import type { NextRequest } from 'next/server';
import { useEffect } from 'react';

import { StandardPageEntry } from './StandardPageEntry';

export interface StandardPageProps {
  isMobile: boolean;
  countryCode: string;
  currencyCode: string;
  pageSlug: string;
}

const StandardPage = (props: StandardPageProps) => {
  const router = useRouter();

  const { pageSlug: pageSlugFromProps } = props; // for static page slugs

  const { pageSlug } = router.query;

  const pageSlugMerge = pageSlug || pageSlugFromProps;

  const { data }: any = useStandardPage(pageSlugMerge?.toString(), router.locale);

  const page = data?.standardPage;

  const { seo } = page || {};

  const { seoTitle, seoDescription } = seo || {};

  const analytics = useRudderStackAnalytics();

  useEffect(() => {
    if (analytics) {
      analytics?.page(page?.title);
    }
  }, [analytics?.ready]);

  return (
    <>
      <StandardPageSeo title={seoTitle} description={seoDescription} breadcrumb={page?.breadcrumb} />

      <StandardPageEntry
        page={page}
        isMobile={props?.isMobile}
        countryCode={props?.countryCode}
        currencyCode={props?.currencyCode}
      />
    </>
  );
};

StandardPage.getTemplate = getStandardTemplate;

export interface GetStaticPropsRequest extends NextRequest {
  query: {
    pageSlug: string;
  };
}

async function getStaticPaths() {
  const pageSlugs = await getAllStandardPageSlugs();

  // Define the locales you want to include
  const includedLocales = ['en-US'];

  // Filter the locales and generate paths
  const paths = pageSlugs.flatMap((slug) => {
    return includedLocales.map((locale) => ({ locale, params: { pageSlug: slug } }));
  });

  return {
    paths,
    fallback: true,
  };
}

async function getStaticProps({ locale, params }: GetStaticPropsContext<{ pageSlug: string; location: string }>) {
  const isMobile = false;

  const { pageSlug, location } = params || {};

  const { countryCode } = parseValidLocale(locale);

  const currencyCode = getCurrency(countryCode);

  const standardPageContentQuery = queries['standard-page'].content(pageSlug, locale);

  const pageSlugs = await getAllStandardPageSlugs();

  if (!pageSlugs.includes(pageSlug)) {
    return {
      notFound: true,
    };
  }

  // dato
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries.template.global(locale),
  });

  await queryClient.prefetchQuery({
    ...standardPageContentQuery,
  });

  return {
    props: {
      key: pageSlug,
      isMobile,
      currencyCode,
      countryCode,
      locale,
      ...(location && { location }),
      // ran into a serializing issue - https://github.com/TanStack/query/issues/1458#issuecomment-747716357
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: getSwrRevalidateConfig() || 60 * 60,
  };
}

export { StandardPage, getStaticProps, getStaticPaths };
