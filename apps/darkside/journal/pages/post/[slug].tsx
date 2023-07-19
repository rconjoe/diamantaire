import { getAllJournalSlugs } from '@diamantaire/darkside/data/api';
import { queries } from '@diamantaire/darkside/data/queries';
import { SingleJournalEntry } from '@diamantaire/darkside/page/journal';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export default SingleJournalEntry;

export async function getStaticPaths() {
  let paths = await getAllJournalSlugs();

  paths = paths.map((path) => {
    const newPath = path.replace('https://www.vrai.com/journal', '');

    return newPath;
  });

  const updatedPaths = paths.map((slug) => {
    return `/post/${slug}`;
  });

  // console.log('updatedPaths', updatedPaths);

  return {
    paths: updatedPaths,
    fallback: false,
  };
}

export async function getStaticProps({
  // locale,
  params,
}: {
  locale: string;
  params: {
    slug: string;
  };
}) {
  const refinedLocale = 'en_US';

  // TODO - make dynamic with middleware
  const isMobile = false;
  // geo -dev
  const devCountryCode = 'en_US';

  const devCurrencyCode = 'USD';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries.header.content(refinedLocale),
    meta: { refinedLocale },
  });

  await queryClient.prefetchQuery({
    ...queries.footer.content(refinedLocale),
    meta: { refinedLocale },
  });

  await queryClient.prefetchQuery({
    ...queries.journal.journalHeader(refinedLocale || 'en_US'),
  });

  await queryClient.prefetchQuery({
    ...queries.journal.journalHeader(refinedLocale || 'en_US'),
  });

  await queryClient.prefetchQuery({
    ...queries.journal.singleJournal(refinedLocale || 'en_US', params.slug),
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
