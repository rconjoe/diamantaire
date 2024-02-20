import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { StandardPageEntry } from '@diamantaire/darkside/page/standard-pages';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { parseValidLocale, getCurrency } from '@diamantaire/shared/constants';
import { getSwrRevalidateConfig } from '@diamantaire/shared/helpers';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetStaticPropsContext } from 'next';
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

  console.log('process.env.VERCEL_ENV', process.env['VERCEL_ENV']);

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

async function getStaticProps({ locale }: GetStaticPropsContext<undefined>) {
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
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: getSwrRevalidateConfig() || 60 * 60,
  };
}

export { HomePage, getStaticProps };
