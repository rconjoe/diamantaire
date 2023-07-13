import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { StandardPageEntry } from '@diamantaire/darkside/page/standard-pages';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { parseValidLocale, getCurrencyFromLocale } from '@diamantaire/shared/constants';
import { getAllShowroomSlugs } from '@diamantaire/shared/helpers';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import type { NextRequest } from 'next/server';

import ShowroomNav from './nav/ShowroomNav';
import { ShowroomContainer } from './ShowroomPage.style';

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
  const { title } = selectedShowroom.content1?.[0].data || {};

  let showroomSeoTitle = seoTitle.split('|');

  showroomSeoTitle = title + ' Showroom | ' + showroomSeoTitle[showroomSeoTitle.length - 1];

  return (
    <ShowroomContainer>
      <StandardPageSeo title={showroomSeoTitle} description={seoDescription} />
      <div className="showroom__nav">
        <ShowroomNav currentLocation={title} />
      </div>
      <div className="showroom__content">
        <StandardPageEntry
          page={selectedShowroom}
          isMobile={props?.isMobile}
          countryCode={props?.countryCode}
          currencyCode={props?.currencyCode}
        />
      </div>
    </ShowroomContainer>
  );
};

ShowroomPage.getTemplate = getStandardTemplate;

export interface GetStaticPropsRequest extends NextRequest {
  query: {
    pageSlug: string;
  };
}

async function getStaticPaths() {
  const paths = await getAllShowroomSlugs();

  return {
    paths,
    fallback: false,
  };
}

async function getStaticProps({ locale }: GetServerSidePropsContext<undefined>) {
  // device:
  // const isMobile = Boolean(
  //   req.headers['user-agent'].match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i),
  // );

  const isMobile = false;

  // geo -dev
  const { countryCode } = parseValidLocale(locale);
  const currencyCode = getCurrencyFromLocale(locale);

  // dato
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries.header.content(locale),
  });

  await queryClient.prefetchQuery({
    ...queries.footer.content(locale),
  });

  await queryClient.prefetchQuery({
    ...queries['standard-page'].content('showrooms', locale),
  });

  await queryClient.prefetchQuery({
    ...queries.showrooms.nav(locale),
  });

  return {
    props: {
      isMobile,
      currencyCode,
      countryCode,
      // ran into a serializing issue - https://github.com/TanStack/query/issues/1458#issuecomment-747716357
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export { ShowroomPage, getStaticProps, getStaticPaths };
