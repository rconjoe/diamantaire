import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { StandardPageEntry } from '@diamantaire/darkside/page/standard-pages';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export interface HomePageProps {
  isMobile: boolean;
  countryCode: string;
  currencyCode: string;
}

const HomePage = (props: HomePageProps) => {
  const { data }: any = useStandardPage('darkside-home', 'en_US');

  console.log('data', data);

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

HomePage.getTemplate = getStandardTemplate;

async function getStaticProps() {
  // locale
  const locale = 'en_US';
  const refinedLocale = 'en_US';

  // device - needs to be static for now:
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
    ...queries['standard-page'].content('darkside-home', refinedLocale),
  });

  return {
    props: {
      isMobile,
      currencyCode: devCurrencyCode,
      countryCode: devCountryCode,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export { HomePage, getStaticProps };
