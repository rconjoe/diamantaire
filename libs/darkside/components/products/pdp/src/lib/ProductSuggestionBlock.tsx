import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { useBlockProducts, useProductSuggestions } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { normalizeDatoNumberedContent } from '@diamantaire/shared/helpers';
import { ProductLink } from '@diamantaire/shared-product';
import { media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductSuggestionBlockStyles = styled.div`
  &.container-wrapper {
    margin: calc(var(--gutter) / 2) auto;
    ${media.small`margin: 8rem auto;`}
  }
  .title-container {
    padding-bottom: 3rem;
    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      padding-bottom: 6rem;
    }
  }
  .products {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 -1rem;

    .product-suggestion__container {
      padding: 0 1rem;
      flex: 0 0 50%;
      margin-bottom: 2rem;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        flex: 1;
      }

      .product-suggestion__title {
        margin: 1rem 0 0;
        font-weight: bold;
      }

      p {
        font-size: var(--font-size-xxsmall);
      }
    }
  }
`;

const ProductSuggestionBlock = ({ id }) => {
  const { locale } = useRouter();
  const { data: { productSuggestionQuadBlock } = {} } = useProductSuggestions(id, locale);
  const content = productSuggestionQuadBlock?.content?.[0];

  const { aboveCopy } = content || {};

  const refinedConfigurations = normalizeDatoNumberedContent(content, ['configuration']);

  const refinedTitles = normalizeDatoNumberedContent(content, ['title']);

  const productHandles = refinedConfigurations.map((configurationNode) => {
    // Check if the jewelryProduct slug exists
    return configurationNode?.configuration?.variantId
      ? configurationNode.configuration.variantId
      : configurationNode?.configuration?.shopifyProductHandle;
  });

  const { data } = useBlockProducts(productHandles);

  const { products, lowestPricesByCollection } = data || {};

  if (products?.length === 0) return null;

  return (
    <ProductSuggestionBlockStyles className="container-wrapper">
      <div className="title-container text-center">
        <Heading type="h2" className="h1 secondary">
          {aboveCopy}
        </Heading>
      </div>
      <div className="products">
        {products &&
          productHandles?.map((handle, index) => {
            const productNode = products?.find(
              (p) => p?.content?.variantId === handle || p?.content?.shopifyProductHandle === handle,
            );

            const product = productNode?.product;

            return (
              <div className="product-suggestion__container" key={product?._id}>
                <div className="product-suggestion__inner">
                  <ProductLink
                    productType={product?.productType}
                    productSlug={product?.productSlug}
                    collectionSlug={product?.collectionSlug}
                  >
                    <div className="product-suggestion__image">
                      <DatoImage image={refinedConfigurations?.[index]?.configuration?.plpImage} />
                    </div>
                    <div className="product-suggestion__content">
                      <Heading type="h3" className="secondary product-suggestion__title">
                        {refinedTitles?.[index]?.title}
                      </Heading>
                      <p>{getFormattedPrice(lowestPricesByCollection[product?.collectionSlug], locale).trim()}+</p>
                    </div>
                  </ProductLink>
                </div>
              </div>
            );
          })}
      </div>
    </ProductSuggestionBlockStyles>
  );
};

export { ProductSuggestionBlock };
