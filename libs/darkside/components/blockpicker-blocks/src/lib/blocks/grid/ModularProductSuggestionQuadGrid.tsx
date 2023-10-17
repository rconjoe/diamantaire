import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { useBlockProducts } from '@diamantaire/darkside/data/hooks';
import { normalizeDatoNumberedContent } from '@diamantaire/shared/helpers';
import { media } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import React from 'react';
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
            min-height: 300px;
            width: 100%;
            max-width: 100%;
            max-height: 300px;
            border: 1px solid black;
          }
        }

        .product-title__container {
          padding-top: 0.5rem;

          .product-title__title {
            font-weight: bold;
            line-height: 1.3;
          }
        }
      }
    }
  }
`;

// Need image and lowest price added to API

const ModularProductSuggestionQuadGrid = (props) => {
  const { aboveCopy, halfWidthDesktopImage } = props;

  const refinedConfigurations = normalizeDatoNumberedContent(props, ['configuration']);
  const refinedTitles = normalizeDatoNumberedContent(props, ['title']);

  const productHandles = refinedConfigurations.map(
    (configurationNode) => configurationNode?.configuration?.shopifyProductHandle,
  );

  const { data } = useBlockProducts(productHandles);

  // console.log('ModularProductSuggestionQuadGrid props', props);
  // console.log('refinedConfigurations', refinedConfigurations);
  // console.log('block data', data);

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
          {data?.map((product, index) => {
            return (
              <div className="product-container" key={product?.id}>
                <div className="product-container__inner">
                  <div className="product-image">
                    <DatoImage image={refinedConfigurations?.[index]?.configuration?.plpImage} />
                  </div>
                  <div className="product-title__container">
                    <Heading type="h3" className="secondary product-title__title">
                      {refinedTitles?.[index]?.title}
                    </Heading>
                  </div>
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
