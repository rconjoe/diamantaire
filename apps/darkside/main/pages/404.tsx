import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useStandardPage } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { StandardPageEntry, StandardPageProps } from '@diamantaire/darkside/page/standard-pages';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const NotFoundPageStyles = styled.div`
  .modular-banner-container {
    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      color: var(--color-white);
    }

    .text-container {
      max-width: 50rem;
    }

    .cta {
      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        display: flex;
        max-width: 50rem;
        column-gap: 2rem;

        .cta__button > div > a {
          min-width: 18rem;;

          button {
            min-width: 18rem;
          }
        }
      }
    }
  }
`;

const NotFoundPage = (props: StandardPageProps) => {
  const router = useRouter();
  const { data }: any = useStandardPage('error-page', router.locale);
  const page = data?.standardPage;

  const { seo } = page || {};
  const { seoTitle, seoDescription } = seo || {};

  return (
    <NotFoundPageStyles
    >
      <StandardPageSeo title={seoTitle} description={seoDescription} />
      <StandardPageEntry
        page={page}
        isMobile={props?.isMobile}
        countryCode={props?.countryCode}
        currencyCode={props?.currencyCode}
      />
    </NotFoundPageStyles>
  );
};

NotFoundPage.getTemplate = getStandardTemplate;

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries.template.global(locale),
  });

  await queryClient.prefetchQuery({
    ...queries['standard-page'].content('error-page', locale),
  });

  return {
    props: {
      // ran into a serializing issue - https://github.com/TanStack/query/issues/1458#issuecomment-747716357
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default NotFoundPage;
