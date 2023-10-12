import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';
import { GetStaticPropsContext } from 'next';

type SSGTestProps = {
  title: string;
  dehydratedState: DehydratedState;
};

export const SSGTest = (props: SSGTestProps) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};

SSGTest.getTemplate = getStandardTemplate;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { locale } = context;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries.template.global(locale),
  });

  return {
    props: {
      title: 'SSG Test',
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default SSGTest;
