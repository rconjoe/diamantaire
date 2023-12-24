import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { getAllStandardPageSlugs } from '@diamantaire/darkside/data/api';
import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { parseValidLocale, getCurrency } from '@diamantaire/shared/constants';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import type { NextRequest } from 'next/server';

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

  return (
    <>
      <StandardPageSeo title={seoTitle} description={seoDescription} />
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
  const includedLocales = ['en-US', 'en-CA'];

  // Filter the locales and generate paths
  const paths = pageSlugs.flatMap((slug) => {
    return includedLocales.map((locale) => ({ locale, params: { pageSlug: slug } }));
  });

  console.log('pathsxxx', paths);

  return {
    paths,
    fallback: true,
  };
}

async function getStaticProps({ locale, params }: GetStaticPropsContext<{ pageSlug: string; location: string }>) {
  console.log('getStaticPropsxxx', locale, params);
  const isMobile = false;
  const { pageSlug, location } = params || {};

  const { countryCode } = parseValidLocale(locale);
  const currencyCode = getCurrency(countryCode);
  const standardPageContentQuery = queries['standard-page'].content(pageSlug, locale);

  // dato
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries.template.global(locale),
  });

  await queryClient.prefetchQuery({
    ...standardPageContentQuery,
  });

  if (!queryClient.getQueryData(standardPageContentQuery.queryKey)?.['standardPage']) {
    return {
      notFound: true,
    };
  }

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
  };
}

// async function getServerSideProps({
//   locale,
//   params,
//   res,
// }: GetServerSidePropsContext<{ pageSlug: string; location?: string }>) {
//   res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=1800');
//   // device:
//   const isMobile = false;
//   const { pageSlug, location } = params || {};

//   const { countryCode } = parseValidLocale(locale);
//   const currencyCode = getCurrency(countryCode);
//   const standardPageContentQuery = queries['standard-page'].content(pageSlug, locale);

//   // dato
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     ...queries.template.global(locale),
//   });

//   await queryClient.prefetchQuery({
//     ...standardPageContentQuery,
//   });

//   if (!queryClient.getQueryData(standardPageContentQuery.queryKey)?.['standardPage']) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       key: pageSlug,
//       isMobile,
//       currencyCode,
//       countryCode,
//       locale,
//       ...(location && { location }),
//       // ran into a serializing issue - https://github.com/TanStack/query/issues/1458#issuecomment-747716357
//       dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//     },
//   };
// }

export { StandardPage, getStaticProps, getStaticPaths };
