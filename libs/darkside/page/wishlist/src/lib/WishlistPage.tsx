import { Heading } from '@diamantaire/darkside/components/common-ui';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { WishlistProductList } from '@diamantaire/darkside/components/wishlist';
import { useWishlistContent, useWishlistProduct } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/global';
import { getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';

import StyledWishlistPage from './WishlistPage.style';

interface WishlistPageProps {
  locale: string;
  dehydratedState: DehydratedState;
}

const WishlistPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale } = props;

  const { data: { wishlist: content } = {} } = useWishlistContent(locale);

  const { data: { wishlist: products } = {} } = useWishlistProduct(getLocalStorageWishlist(), locale);

  const { pageTitle, pageSeoTitle, pageSeoDescription } = content;

  return (
    <>
      <StandardPageSeo title={pageSeoTitle} description={pageSeoDescription} />

      <StyledWishlistPage className="container-wrapper">
        <div className="page-row">
          <div className="page-title">
            <Heading>{pageTitle}</Heading>
          </div>
        </div>

        <div className="page-row">
          <WishlistProductList isWishlistPage={true} content={content} products={products} />
        </div>
      </StyledWishlistPage>
    </>
  );
};

WishlistPage.getTemplate = getTemplate;

async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<WishlistPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { locale } = context;

  const wishlistContentQuery = queries.wishlist.content(locale);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(wishlistContentQuery);

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  const props: WishlistPageProps = {
    locale,
    dehydratedState,
  };

  return {
    props,
  };
}

export { WishlistPage, getServerSideProps as getServerSidePropsWishlistPage };

export default WishlistPage;
