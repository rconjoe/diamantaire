import { useJournalConfig } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { JournalHomeEntry } from '@diamantaire/darkside/page/journal';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { dehydrate, QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { GetStaticPropsContext } from 'next';
import { useEffect, useState } from 'react';

function JournalIndex(props) {
  const { locale } = props;

  const { data: { blogConfiguration } = {} } = useJournalConfig(locale);

  const { blogHomeSeoTitle, blogHomeSeoDescription, categoriesToDisplay, heroPost, latestStoriesTitle, postsPerPage } =
    blogConfiguration || {};

  const [latestJournalsIndex, setLatestJournalsIndex] = useState(0);
  const [latestJournals, setLatestJournals] = useState([]);
  const [init, setInit] = useState(false);

  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    ...queries.journal.journalsByMostRecent(locale, !init ? 3 : postsPerPage, !init ? 0 : latestJournalsIndex),
    refetchOnWindowFocus: false,
    getNextPageParam: () => (!init ? setInit(true) : ''),
  });

  useEffect(() => {
    const oldAndNewJournals = [];

    data?.pages?.map((page) => {
      return page.allBlogPosts.map((post) => oldAndNewJournals.push(post));
    });

    setLatestJournals(oldAndNewJournals);
  }, [data]);

  useEffect(() => {
    setLatestJournalsIndex(3);
    refetch();
  }, []);

  return (
    <JournalHomeEntry
      blogConfiguration={blogConfiguration}
      categoriesToDisplay={categoriesToDisplay}
      blogHomeSeo={{
        seoTitle: blogHomeSeoTitle,
        seoDescription: blogHomeSeoDescription,
      }}
      heroPost={heroPost}
      latestStoriesTitle={latestStoriesTitle}
      latestJournals={latestJournals}
      postsPerPage={postsPerPage}
      fetchNextPage={fetchNextPage}
      latestJournalsIndex={latestJournalsIndex}
      setLatestJournalsIndex={setLatestJournalsIndex}
    />
  );
}

export default JournalIndex;

JournalIndex.getTemplate = getStandardTemplate;

export async function getStaticProps({ locale }: GetStaticPropsContext<undefined>) {
  const queryClient = new QueryClient();

  // Header + Footer
  await queryClient.prefetchQuery({
    ...queries.template.global(locale),
  });

  await queryClient.prefetchQuery({
    ...queries.journal.journalHeader(locale),
  });

  await queryClient.prefetchQuery({
    ...queries.journal.config(locale),
  });

  await queryClient.prefetchQuery({
    ...queries.journal.journalsByMostRecent(locale, 3, 0),
  });

  return {
    props: {
      locale,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
