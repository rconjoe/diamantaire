import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { getAllStandardPageSlugs } from '@diamantaire/shared/helpers';
import { QueryClient, dehydrate } from '@tanstack/react-query';
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

  const { data }: any = useStandardPage(pageSlug.toString(), 'en_US');

  const page = data?.allStandardPages?.[0];

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
  let paths = await getAllStandardPageSlugs();

  paths = paths.map((path) => `/p/${path}`);

  return {
    paths,
    fallback: false,
  };
}

async function getStaticProps(context) {
  console.log('context.pageSlug', context.params.pageSlug);
  // locale
  const locale = 'en_US';
  const refinedLocale = 'en_US';

  // device:

  const isMobile = false;

  // geo -dev
  const devCountryCode = 'US';

  const devCurrencyCode = 'USD';

  // dato
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries.header.content(locale),
    meta: { refinedLocale },
  });

  await queryClient.prefetchQuery({
    ...queries.footer.content(locale),
    meta: { refinedLocale },
  });

  await queryClient.prefetchQuery({
    ...queries['standard-page'].content(context.params.pageSlug, refinedLocale),
    meta: { refinedLocale },
  });

  return {
    props: {
      isMobile,
      currencyCode: devCurrencyCode,
      countryCode: devCountryCode,
      // ran into a serializing issue - https://github.com/TanStack/query/issues/1458#issuecomment-747716357
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export { StandardPage, getStaticProps, getStaticPaths };
