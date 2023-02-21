import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { StandardPageEntry } from '@diamantaire/darkside/page/standard-pages';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { NextRequest } from 'next/server';

export interface StandardPageProps {
  isMobile: boolean;
  countryCode: string;
  currencyCode: string;
}

const StandardPage = (props: StandardPageProps) => {
  const router = useRouter();
  //   console.log('router', router);
  //   console.log('data', data);
  const { pageSlug } = router.query;
  const { data }: any = useStandardPage(pageSlug);

  const page = data?.allStandardPages?.[0];

  return (
    <StandardPageEntry
      page={page}
      isMobile={props?.isMobile}
      countryCode={props?.countryCode}
      currencyCode={props?.currencyCode}
    />
  );
};

StandardPage.getTemplate = getStandardTemplate;

export interface GetServerRequest extends NextRequest {
  query: {
    pageSlug: string;
  };
}

async function getServerSideProps({ req }: { req: GetServerRequest }) {
  // locale
  const locale = 'en_US';
  const refinedLocale = 'en_US';

  // device:
  const isMobile = Boolean(
    req.headers['user-agent'].match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i),
  );

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
    ...queries['standard-page'].content(req.query.pageSlug, refinedLocale),
  });

  console.log('queryClient', queryClient);

  return {
    props: {
      isMobile,
      currencyCode: devCurrencyCode,
      countryCode: devCountryCode,
      //   dehydratedState: dehydrate(queryClient),
    },
  };
}

export { StandardPage, getServerSideProps };
