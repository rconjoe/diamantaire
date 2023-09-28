import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { StandardPageEntry, StandardPageProps } from '@diamantaire/darkside/page/standard-pages';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { QueryClient } from '@tanstack/react-query';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

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

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries.template.global(locale),
  });

  await queryClient.prefetchQuery({
    ...queries['standard-page'].content('error-page', locale),
  });
}

export default StandardPage;
