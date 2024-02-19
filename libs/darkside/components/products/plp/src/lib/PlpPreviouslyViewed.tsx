import { DatoImage, Heading, UIString } from '@diamantaire/darkside/components/common-ui';
import { useBlockProducts, useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { ArrowRightIcon } from '@diamantaire/shared/icons';
import { ProductLink, createPlpTitle } from '@diamantaire/shared-product';
import { contentBlockMargin } from '@diamantaire/styles/darkside-styles';
import useEmblaCarousel from 'embla-carousel-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const PlpPreviouslyViewedStyles = styled.section`
  ${contentBlockMargin}
  max-width: var(--max-width-small);
  &.container-wrapper {
    padding-left: 0;
    padding-right: 0;
    @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
      max-width: 100%;
      padding-left: unset;
      padding-right: unset;
    }
  }

  .title-container {
    padding-bottom: 2rem;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      padding-bottom: 4rem;
    }
  }

  .slider {
    position: relative;
  }
  .embla {
    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      margin-left: -1rem;
      margin-right: -1rem;
    }
  }
  .arrow {
    top: 40%;
    position: absolute;
    background-color: transparent;
    display: none;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      display: inline-block;
    }

    &.prev {
      left: -5rem;

      svg {
        transform: rotate(180deg);
      }
    }

    &.next {
      right: -5rem;
    }
  }

  .products__container {
    .product__container {
      padding: 0 1rem;
      flex: 0 0 80%;
      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        flex: 0 0 25%;
      }

      .product__content {
        display: flex;
        align-items: baseline;
        padding-top: 0.8rem;
        > * {
          margin-right: 0.5rem;
        }

        h3 {
          font-weight: 400;
          font-size: var(--font-size-xxxsmall);
          line-height: 1.2;
        }

        p {
          font-size: var(--font-size-xxxsmall);
          line-height: 1.2;
        }
      }
    }
  }
`;

const PlpPreviouslyViewed = () => {
  const [handles, setHandles] = useState([]);

  const { locale } = useRouter();

  const { _t } = useTranslations(locale);

  // fetch previously viewed products
  function fetchPreviouslyViewed() {
    const previouslyViewed = localStorage.getItem('previouslyViewed');

    if (!previouslyViewed) return;

    const previouslyViewedArray = JSON.parse(previouslyViewed);

    const handlesArray = [];

    previouslyViewedArray.map((item) => handlesArray.push(item.slug));

    setHandles(handlesArray);
  }

  const { data } = useBlockProducts(handles, locale);

  const { products, lowestPricesByCollection } = data || {};

  useEffect(() => {
    fetchPreviouslyViewed();
  }, []);

  const options: any = {
    loop: false,
    dragFree: true,
    align: 'center',
    breakpoints: {
      '(min-width: 76.8rem)': { align: 'start' },
    },
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  // if they haven't seen anything, hide the block
  if (handles.length === 0) return null;

  return (
    <PlpPreviouslyViewedStyles className="container-wrapper">
      <div className="title-container text-center">
        <Heading type="h2" className="primary h1">
          <UIString>Previously Viewed</UIString>
        </Heading>
      </div>

      <div className="slider">
        {products?.length > 4 && (
          <>
            <button className="arrow prev" onClick={() => emblaApi.scrollPrev()}>
              <span>
                <ArrowRightIcon />
              </span>
            </button>
            <button className="arrow next" onClick={() => emblaApi.scrollNext()}>
              <span>
                <ArrowRightIcon />
              </span>
            </button>
          </>
        )}
        <div className="embla" ref={emblaRef}>
          <div className="products__container embla__container">
            {products &&
              handles?.map((handle) => {
                const productNode = products?.find(
                  (p) => p?.content?.variantId === handle || p?.content?.shopifyProductHandle === handle,
                );

                if (!productNode) {
                  return null;
                }

                const product = productNode?.product;

                const content = productNode?.content;

                const useProductTitleOnly = true;

                const isMultiShape = product?.configuration?.diamondType?.includes('+') || false;

                const generatedTitle = createPlpTitle(
                  _t('%%title%% %%shape%% in'),
                  content.productTitle,
                  content.plpTitle,
                  {
                    diamondType: _t(product.configuration.diamondType),
                    metal: _t(product.configuration.metal),
                  },
                  isMultiShape,
                  useProductTitleOnly,
                );

                return (
                  <div className="product__container embla__slide" key={product?._id}>
                    <div className="product__inner">
                      <ProductLink
                        productType={product?.productType}
                        productSlug={product?.productSlug}
                        collectionSlug={product?.collectionSlug}
                      >
                        <div className="product__image">{content?.plpImage && <DatoImage image={content.plpImage} />}</div>
                        <div className="product__content">
                          <Heading type="h3" className="secondary product-suggestion__title">
                            {generatedTitle}
                          </Heading>
                          <p>|</p>
                          <p>{getFormattedPrice(lowestPricesByCollection[product?.collectionSlug], locale)}+</p>
                        </div>
                      </ProductLink>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </PlpPreviouslyViewedStyles>
  );
};

export { PlpPreviouslyViewed };
