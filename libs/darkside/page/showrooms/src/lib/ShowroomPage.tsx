import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { StandardPageEntry } from '@diamantaire/darkside/page/standard-pages';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { parseValidLocale, getCurrencyFromLocale } from '@diamantaire/shared/constants';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import ShowroomNav from './nav/ShowroomNav';

import { ShowroomPageStyle } from './ShowroomPage.style';
import { useRudderStackAnalytics } from '@diamantaire/shared/rudderstack';
import { useEffect } from 'react';

export interface ShowroomPageProps {
  isMobile: boolean;
  countryCode: string;
  currencyCode: string;
}

const ShowroomPage = (props: ShowroomPageProps) => {
  const router = useRouter();
  const { data }: any = useStandardPage('showrooms', router.locale);
  const { showroomLocation } = router.query;
  const page = data?.standardPage;

  const selectedShowroom = {
    ...page,
    content1: page.content1.filter((block) => block?.data?.slug === showroomLocation),
  };

  const { seo } = page || {};
  const { seoTitle, seoDescription } = seo || {};
  const { title } = selectedShowroom?.content1?.[0]?.data || {};

  let showroomSeoTitle = seoTitle.split('|');

  showroomSeoTitle = title + ' Showroom | ' + showroomSeoTitle[showroomSeoTitle.length - 1];

  const analytics = useRudderStackAnalytics();

  useEffect(() => {
    if (analytics) {
      analytics?.page(shopifyProductData?.productTitle);
    }
  }, [analytics?.ready]);

  return (
    <ShowroomPageStyle>
      <StandardPageSeo title={showroomSeoTitle} description={seoDescription} />

      <div className="showroom__nav">
        <ShowroomNav currentLocation={title} />
      </div>

      <div className="showroom__content">
        <StandardPageEntry page={selectedShowroom} countryCode={props?.countryCode} currencyCode={props?.currencyCode} />
      </div>
    </ShowroomPageStyle>
  );
};

ShowroomPage.getTemplate = getStandardTemplate;

async function getServerSideProps({ locale }: GetServerSidePropsContext<undefined>) {
  // geo -dev
  const { countryCode } = parseValidLocale(locale);
  const currencyCode = getCurrencyFromLocale(locale);

  // dato
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ ...queries.template.global(locale) });

  await queryClient.prefetchQuery({
    ...queries['standard-page'].content('showrooms', locale),
  });

  await queryClient.prefetchQuery({
    ...queries.showrooms.nav(locale),
  });

  return {
    props: {
      countryCode,
      currencyCode,
      // ran into a serializing issue - https://github.com/TanStack/query/issues/1458#issuecomment-747716357
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export { ShowroomPage, getServerSideProps };
