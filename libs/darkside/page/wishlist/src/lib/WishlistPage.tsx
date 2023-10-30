import { ParsedUrlQuery } from 'querystring';

import { queries } from '@diamantaire/darkside/data/queries';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';

interface WishlistPageQueryParams extends ParsedUrlQuery {
  wishlist?: string;
}

interface WishlistPageProps {
  locale: string;
  dehydratedState: DehydratedState;
}

const WishlistPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(props);

  return (
    <div>
      <h1>Welcome to DarksidePageWishlist!</h1>
    </div>
  );
};

async function getServerSideProps(
  context: GetServerSidePropsContext<WishlistPageQueryParams>,
): Promise<GetServerSidePropsResult<WishlistPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { locale, query } = context;

  const { wishlist: wishlistString } = query;

  const wishlistArray = (wishlistString as string).split(',');

  const wishlistContentQuery = queries.wishlist.content(locale);

  const wishlistProductsQuery = queries.wishlist.product(wishlistArray, locale);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(wishlistContentQuery);

  await queryClient.prefetchQuery(wishlistProductsQuery);

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
