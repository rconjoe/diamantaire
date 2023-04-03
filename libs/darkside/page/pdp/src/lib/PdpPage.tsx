import { ParsedUrlQuery } from 'querystring';

import { Form } from '@diamantaire/darkside/components/common-ui';
import { MediaGallery, ProductConfigurator } from '@diamantaire/darkside/components/products/pdp';
import { useProduct } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';
import { InferGetServerSidePropsType, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { PropsWithChildren } from 'react';

import { PageContainerStyles } from './PdpPage.style';

interface PdpPageParams extends ParsedUrlQuery {
  productSlug: string;
  variantSlug: string;
}
export interface PdpPageProps {
  params: PdpPageParams;
  dehydratedState: DehydratedState;
}

export function PdpPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    params: { productSlug, variantSlug },
  } = props;
  const query = useProduct({ productSlug, variantSlug });
  const { data } = query;

  console.log('data', query);

  if (data) {
    const { id, variantContent, collectionContent, options } = data;
    const { productTitle } = collectionContent[0]; // flatten array in normalization

    const configurations = data?.optionConfigs;
    const assetStack = variantContent?.[0]?.assetStack; // flatten array in normalization

    return (
      <PageContainerStyles>
        <div className="product-container">
          <div className="media-container">
            <MediaGallery assets={assetStack} />
          </div>
          <div className="info-container">
            <ProductTitle>{productTitle}</ProductTitle>
            <Price>1,900</Price>
            <ProductConfigurator configurations={configurations} selectedConfiguration={options} initialVariantId={id} />
            <p>Visit our Los Angeles location</p>
            <ul>
              <li>VRAI created diamond</li>
              <li>Made to order. Order now, ships by Wed, Feb 15</li>
              <li>Free Shipping</li>
              <li>Lifetime Warranty</li>
            </ul>
            <Form
              title="Need more time to think?"
              caption="Email this customized ring to yourself or drop a hint."
              onSubmit={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </PageContainerStyles>
    );
  }

  return (
    <h1>
      No data found for product page: {productSlug} {variantSlug}{' '}
    </h1>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<PdpPageParams>,
): Promise<GetServerSidePropsResult<PdpPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200'); // define TTL globally

  const { params } = context;
  const { productSlug, variantSlug } = context.params;
  const queryClient = new QueryClient();
  const dataQuery = queries.products.variant(productSlug, variantSlug);

  await queryClient.prefetchQuery(dataQuery);

  if (!queryClient.getQueryData(dataQuery.queryKey)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      params,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

PdpPage.getTemplate = getStandardTemplate;

export default PdpPage;

function ProductTitle({ children }: PropsWithChildren) {
  // use product title composition logic;
  return <h1>{children}</h1>;
}

function Price({ children }: PropsWithChildren) {
  return <h2 className="price">Starting at ${children}</h2>;
}
