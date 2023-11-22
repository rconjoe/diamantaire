import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { useBlockProducts } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { normalizeDatoNumberedContent } from '@diamantaire/shared/helpers';
import { ProductLink } from '@diamantaire/shared-product';
import { media } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ModularProductSuggestionQuadGridStyles = styled.div`
  .title-container {
    margin-bottom: 4rem;
  }

  .grid-container {
    &.with-image {
      ${media.medium`display: flex;align-items: center;justify-content: space-between;padding-bottom: 4rem;`}

      .grid-image {
        flex: 1;
        padding-bottom: 3rem;
        ${media.medium`padding-bottom: 0;padding-right: 2rem;`}
      }

      .products {
        flex: 1;
        flex-wrap: wrap;
        justify-content: start;
        ${media.medium`justify-content: center;`}

        > .product-container {
          flex: 0 0 50%;
        }
      }
    }
  }

  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ${media.medium`flex: 1; flex-wrap: nowrap;`}

    .product-container {
      display: flex;
      flex-wrap: wrap;
      padding: 0 1.5rem 3rem;
      justify-content: center;
      flex: 0 0 50%;

      ${media.medium`flex: 1; flex-wrap: nowrap;`}

      .product-container__inner {
        flex: 1;
        .product-image {
          .temp-image {
            min-height: 30rem;
            width: 100%;
            max-width: 100%;
            max-height: 30rem;
            border: 0.1rem solid black;
          }
        }

        .product-content__container {
          padding-top: 0.5rem;

          .product-content__title {
            font-weight: bold;
            line-height: 1.3;
            margin: 0.5rem 0;
          }

          p {
            font-size: var(--font-size-xxsmall);
          }
        }
      }
    }
  }
`;

const ModularProductSuggestionQuadGrid = (props) => {
  const { aboveCopy, halfWidthDesktopImage } = props;
  const { locale } = useRouter();

  const refinedConfigurations = normalizeDatoNumberedContent(props, ['configuration']);
  const refinedTitles = normalizeDatoNumberedContent(props, ['title']);

  const productHandles = refinedConfigurations.map(
    (configurationNode) => configurationNode?.configuration?.shopifyProductHandle,
  );

  const { data } = useBlockProducts(productHandles);

  const { products, lowestPricesByCollection } = data || {};

  return (
    <ModularProductSuggestionQuadGridStyles>
      {aboveCopy && (
        <div className="title-container container-wrapper text-center">
          <Heading type="h2" className="h1 primary">
            {aboveCopy}
          </Heading>
        </div>
      )}
      <div
        className={clsx('grid-container container-wrapper', {
          'with-image': halfWidthDesktopImage,
        })}
      >
        {halfWidthDesktopImage && (
          <div className="grid-image">
            <DatoImage image={halfWidthDesktopImage} />
          </div>
        )}

        <div className="products">
          {products?.map((productNode, index) => {
            const product = productNode?.product;
            const content = productNode?.content;

            if (index >= refinedConfigurations.length) return null;

            return (
              <div className="product-container" key={product?.id}>
                <div className="product-container__inner">
                  <ProductLink
                    productType={product?.productType}
                    collectionSlug={product?.collectionSlug}
                    productSlug={product?.productSlug}
                  >
                    <div className="product-image">
                      <DatoImage image={content.plpImage} />
                    </div>
                    <div className="product-content__container">
                      <Heading type="h3" className="secondary product-content__title">
                        {refinedTitles?.[index]?.title}
                      </Heading>
                      <p>{getFormattedPrice(lowestPricesByCollection[product?.collectionSlug], locale)}+</p>
                    </div>
                  </ProductLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ModularProductSuggestionQuadGridStyles>
  );
};

export default ModularProductSuggestionQuadGrid;
