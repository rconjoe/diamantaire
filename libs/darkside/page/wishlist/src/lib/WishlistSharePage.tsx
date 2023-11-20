import { ParsedUrlQuery } from 'querystring';

import { Heading } from '@diamantaire/darkside/components/common-ui';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { WishlistProductList } from '@diamantaire/darkside/components/wishlist';
import { useWishlistContent, useWishlistProduct } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/global';
import { replacePlaceholders } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';

import StyledWishlistPage from './WishlistPage.style';

interface WishlistSharePageParams extends ParsedUrlQuery {
  username: string;
  products: string;
}

interface WishlistSharePageProps {
  username: string;
  locale: string;
  products: string[];
  dehydratedState: DehydratedState;
}

const WishlistSharePage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale, username, products: productListFromUrl } = props;

  const { data: { wishlist: content } = {} } = useWishlistContent(locale);

  const { data: { wishlist: products } = {} } = useWishlistProduct(productListFromUrl, locale);

  const { pageSeoDescription, sharedWishlistPageTitle, sharedWishlistPageSubtitle } = content;

  const usernameCapitalized = username.charAt(0).toUpperCase() + username.slice(1);

  const pageTitle = replacePlaceholders(sharedWishlistPageTitle, ['%%user%%'], [usernameCapitalized]) as string;

  const pageSubtitle = replacePlaceholders(sharedWishlistPageSubtitle, ['%%user%%'], [usernameCapitalized]) as string;

  return (
    <>
      <StandardPageSeo title={pageTitle} description={pageSeoDescription} />

      <StyledWishlistPage className="container-wrapper">
        <div className="page-row">
          <div className="page-title">
            <Heading>{pageTitle}</Heading>
            <p>{pageSubtitle}</p>
          </div>
        </div>

        <div className="page-row">
          <WishlistProductList isSharedWishlistPage={true} content={content} products={products} />
        </div>
      </StyledWishlistPage>
    </>
  );
};

WishlistSharePage.getTemplate = getTemplate;

async function getServerSideProps(
  context: GetServerSidePropsContext<WishlistSharePageParams>,
): Promise<GetServerSidePropsResult<WishlistSharePageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { locale, query } = context;

  const { products, username } = query;

  if (!products || !username) {
    return {
      notFound: true,
    };
  }

  const usernameString = username as string;

  const productArray = (products as string).split(',');

  const wishlistContentQuery = queries.wishlist.content(locale);

  const wishlistProductsQuery = queries.wishlist.product(productArray, locale);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(wishlistContentQuery);

  await queryClient.prefetchQuery(wishlistProductsQuery);

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  const props: WishlistSharePageProps = {
    locale,
    dehydratedState,
    username: usernameString,
    products: productArray,
  };

  return {
    props,
  };
}

export { WishlistSharePage, getServerSideProps as getServerSidePropsWishlistSharePage };

export default WishlistSharePage;
