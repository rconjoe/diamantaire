import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { StandardPageEntry } from '@diamantaire/darkside/page/standard-pages';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { parseValidLocale, getCurrency } from '@diamantaire/shared/constants';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export interface HomePageProps {
  locale: string;
  isMobile: boolean;
  countryCode: string;
  currencyCode: string;
}

const HomePage = (props: HomePageProps) => {
  const router = useRouter();

  const { data }: any = useStandardPage('darkside-home', router.locale);

  const page = data?.standardPage;
  const { seo } = page || {};
  const { seoTitle, seoDescription } = seo || {};

  console.log('router', router);
  console.log('props', props);

  return (
    <>
      <StandardPageSeo title={seoTitle} description={seoDescription} />
      <StandardPageEntry
        gtmClass="mkt-is-homepage"
        page={page}
        isMobile={props?.isMobile}
        countryCode={props?.countryCode}
        currencyCode={props?.currencyCode}
      />
    </>
  );
};

HomePage.getTemplate = getStandardTemplate;

// interface GetStaticPropsContextProps extends GetStaticPropsContext {
//   query: string;
// }

async function getStaticProps(props) {
  const { locale, query } = props;

  console.log('queryxxx', props);
  // device - needs to be static for now:
  const isMobile = false;
  const { countryCode } = parseValidLocale(locale);

  const currencyCode = getCurrency(countryCode);

  // dato
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries.template.global(locale),
  });

  await queryClient.prefetchQuery({
    ...queries['standard-page'].content('darkside-home', locale),
  });

  return {
    props: {
      isMobile,
      currencyCode,
      countryCode,
      query: query || '',
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export { HomePage, getStaticProps };
