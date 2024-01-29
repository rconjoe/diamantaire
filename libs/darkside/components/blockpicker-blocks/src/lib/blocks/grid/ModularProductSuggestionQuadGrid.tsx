import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { useBlockProducts } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { normalizeDatoNumberedContent } from '@diamantaire/shared/helpers';
import { ProductLink } from '@diamantaire/shared-product';
import { contentBlockMargin, media } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ModularProductSuggestionQuadGridStyles = styled.div`
  ${contentBlockMargin}
  .title-container {
    margin-bottom: 4rem;
  }

  .grid-container {
    &.align-right {
      ${media.medium`flex-direction: row-reverse; justify-content: space-between;`}
    }
    &.with-image {
      &.align-right {
        .grid-image {
          ${media.medium`padding-left: 2rem; padding-right: 0;`}
        }
      }
      ${media.medium`display: flex;align-items: flex-start;justify-content: space-between;`}

      .grid-image {
        flex: 1;
        padding-bottom: 2rem;
        ${media.medium`padding-bottom: 0; padding-right: 2rem; padding-left: 0;`}
      }

      .products {
        flex: 1;
        flex-wrap: wrap;
        justify-content: start;
        gap: 1.5rem 2rem;
        ${media.medium`justify-content: center;`}

        > .product-container {
          flex: 0 0 calc(50% - 1rem);
        }
      }
    }
  }

  .products {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    ${media.medium`
    gap: 1.6rem;
    grid-template-columns: repeat(4, 1fr);

  `}

    .product-container {
      display: flex;
      flex-wrap: wrap;
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
  const { aboveCopy, halfWidthDesktopImage, halfWidthImageAlignment } = props;
  const { locale } = useRouter();

  const refinedConfigurations = normalizeDatoNumberedContent(props, ['configuration']);
  const refinedTitles = normalizeDatoNumberedContent(props, ['title']);

  // Either variantId or shopifyProductHandle
  const variantIds = refinedConfigurations.map(
    (configurationNode) =>
      configurationNode?.configuration?.variantId || configurationNode?.configuration?.shopifyProductHandle,
  );

  // Expects variantIds to be an array of strings
  const { data } = useBlockProducts(variantIds);

  const { products } = data || {};

  return (
    <ModularProductSuggestionQuadGridStyles>
      {aboveCopy && (
        <div className="title-container container-wrapper text-center">
          <Heading type="h2" className="h1 secondary">
            {aboveCopy}
          </Heading>
        </div>
      )}
      <div
        className={clsx('grid-container container-wrapper', `align-${halfWidthImageAlignment}`, {
          'with-image': halfWidthDesktopImage,
        })}
      >
        {halfWidthDesktopImage && (
          <div className="grid-image">
            <DatoImage image={halfWidthDesktopImage} />
          </div>
        )}

        <div className="products">
          {products &&
            variantIds?.map((id, index) => {
              const productNode = products?.find(
                (p) => p?.content?.variantId === id || p?.content?.shopifyProductHandle === id,
              );

              if (!productNode) return null;

              const product = productNode?.product;
              const content = productNode?.content;

              if (index >= refinedConfigurations.length) return null;

              return (
                <div className="product-container" key={product?._id}>
                  <div className="product-container__inner">
                    <ProductLink
                      productType={product?.productType}
                      collectionSlug={product?.collectionSlug}
                      productSlug={product?.productSlug}
                    >
                      <div className="product-image">{content?.plpImage && <DatoImage image={content.plpImage} />}</div>
                      <div className="product-content__container">
                        <Heading type="h3" className="secondary product-content__title">
                          {refinedTitles?.[index]?.title}
                        </Heading>
                        <p>{getFormattedPrice(product?.price, locale)}+</p>
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
