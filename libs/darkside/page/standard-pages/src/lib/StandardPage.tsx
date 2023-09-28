import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { parseValidLocale, getCurrency } from '@diamantaire/shared/constants';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import type { NextRequest } from 'next/server';

import { StandardPageEntry } from './StandardPageEntry';

export interface StandardPageProps {
  isMobile: boolean;
  countryCode: string;
  currencyCode: string;
}

const StandardPage = (props: StandardPageProps) => {
  const router = useRouter();

  const { pageSlug } = router.query;

  const { data }: any = useStandardPage(pageSlug.toString(), router.locale);
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

// async function getStaticPaths({ locales }) {
//   const pageSlugs = await getAllStandardPageSlugs();
//   const paths = pageSlugs.flatMap((slug) => {
//     return locales.map((locale) => ({ locale, params: { pageSlug: slug } }));
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }

// async function getStaticProps({ locale, params }: GetStaticPropsContext<{ pageSlug: string }>) {
//   // device:
//   const isMobile = false;

//   const { countryCode } = parseValidLocale(locale);
//   const currencyCode = getCurrency(countryCode);

//   // dato
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     ...queries.header.content(locale),
//   });

//   await queryClient.prefetchQuery({
//     ...queries.footer.content(locale),
//   });

//   await queryClient.prefetchQuery({
//     ...queries['standard-page'].content(params.pageSlug, locale),
//   });

//   return {
//     props: {
//       isMobile,
//       currencyCode,
//       countryCode,
//       // ran into a serializing issue - https://github.com/TanStack/query/issues/1458#issuecomment-747716357
//       dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//     },
//   };
// }

async function getServerSideProps({ locale, params, res }: GetServerSidePropsContext<{ pageSlug: string }>) {
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=1800');
  // device:
  const isMobile = false;
  const { pageSlug } = params || {};
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
      // ran into a serializing issue - https://github.com/TanStack/query/issues/1458#issuecomment-747716357
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export { StandardPage, getServerSideProps };
