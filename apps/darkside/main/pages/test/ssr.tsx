import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';

type SSRTestProps = {
  title: string;
  dehydratedState: DehydratedState;
};

export const SSRTest = (props: SSRTestProps) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};

SSRTest.getTemplate = getStandardTemplate;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { locale } = context;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries.template.global(locale),
  });

  return {
    props: {
      title: 'SSR Test',
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default SSRTest;
