import { queries } from '@diamantaire/darkside/data/queries';
import { SingleJournalEntry } from '@diamantaire/darkside/page/journal';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export default SingleJournalEntry;

// need to figure this out
// export async function getStaticPaths() {
//   let paths = await getAllJournalSlugs();

//   paths = paths.map((path) => {
//     const newPath = path.replace('https://www.vrai.com/journal', '');

//     return newPath;
//   });

//   const updatedPaths = paths.map((slug) => {
//     return `/post/${slug}`;
//   });

//   return {
//     paths: updatedPaths,
//     fallback: false,
//   };
// }

export async function getServerSideProps({
  locale,
  params,
}: {
  locale: string;
  params: {
    slug: string;
  };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries.header.content(locale),
    meta: { locale },
  });

  await queryClient.prefetchQuery({
    ...queries.footer.content(locale),
    meta: { locale },
  });

  await queryClient.prefetchQuery({
    ...queries.journal.journalHeader(locale),
  });

  await queryClient.prefetchQuery({
    ...queries.journal.journalHeader(locale),
  });

  await queryClient.prefetchQuery({
    ...queries.journal.singleJournal(locale, params.slug),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
