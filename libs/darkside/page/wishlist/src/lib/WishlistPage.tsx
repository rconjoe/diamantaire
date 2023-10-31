import { ParsedUrlQuery } from 'querystring';

import { Heading } from '@diamantaire/darkside/components/common-ui';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { WishlistProductList } from '@diamantaire/darkside/components/wishlist';
import { useWishlistContent, useWishlistProduct } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/global';
import { getLocalStorageWishlist, replacePlaceholders } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';

import StyledWishlistPage from './WishlistPage.style';

interface WishlistPageQueryParams extends ParsedUrlQuery {
  products?: string;
  username?: string;
}

interface WishlistPageProps {
  locale: string;
  username?: string;
  products?: string[];
  dehydratedState: DehydratedState;
}

const WishlistPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale, username, products: productListFromUrl } = props;

  const isSharedWishlist = !!username && !!productListFromUrl;

  const { data: { wishlist: content } = {} } = useWishlistContent(locale);

  const { data: { wishlist: products } = {} } = useWishlistProduct(
    isSharedWishlist ? productListFromUrl : getLocalStorageWishlist(),
    locale,
  );

  const { pageTitle, pageSeoTitle, pageSeoDescription, sharedWishlistPageTitle } = content;

  return (
    <>
      <StandardPageSeo title={pageSeoTitle} description={pageSeoDescription} />

      <StyledWishlistPage className="container-wrapper">
        <div className="page-row">
          <div className="page-title">
            <Heading>
              {isSharedWishlist
                ? (replacePlaceholders(sharedWishlistPageTitle, ['%%user%%'], [username]) as string)
                : pageTitle}
            </Heading>
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

async function getServerSideProps(
  context: GetServerSidePropsContext<WishlistPageQueryParams>,
): Promise<GetServerSidePropsResult<WishlistPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { locale, query } = context;

  const { products = '', username = '' } = query;

  const productArray = (products as string).split(',');

  const wishlistContentQuery = queries.wishlist.content(locale);

  const wishlistProductsQuery = queries.wishlist.product(productArray, locale);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(wishlistContentQuery);

  await queryClient.prefetchQuery(wishlistProductsQuery);

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  const props: WishlistPageProps = {
    locale,
    dehydratedState,
    username,
    products,
  };

  return {
    props,
  };
}

export { WishlistPage, getServerSideProps as getServerSidePropsWishlistPage };

export default WishlistPage;
