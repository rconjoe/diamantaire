import { DatoImage, Heading, UIString } from '@diamantaire/darkside/components/common-ui';
import { useBlockProducts } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { ArrowRightIcon } from '@diamantaire/shared/icons';
import { ProductLink } from '@diamantaire/shared-product';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const PlpPreviouslyViewedStyles = styled.section`
  padding-bottom: 6rem;

  &.container-wrapper {
    @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
      max-width: 100%;
      padding: 0 0 4rem;
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

  .arrow {
    top: 40%;
    position: absolute;
    background-color: transparent;
    display: none;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      display: inline-block;
    }

    &.prev {
      left: -50px;

      svg {
        transform: rotate(180deg);
      }
    }

    &.next {
      right: -50px;
    }
  }

  .products__container {
    .product__container {
      padding: 0 20px;
      flex: 0 0 80%;
      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        flex: 0 0 25%;
      }

      .product__content {
        display: flex;
        align-items: baseline;
        padding-top: 0.8rem;
        > * {
          margin-right: 5px;
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

  // fetch previously viewed products
  function fetchPreviouslyViewed() {
    const previouslyViewed = localStorage.getItem('previouslyViewed');

    if (!previouslyViewed) return;

    const previouslyViewedArray = JSON.parse(previouslyViewed);

    const handlesArray = [];

    previouslyViewedArray.map((item) => handlesArray.push(item.slug));

    // console.log('previouslyViewedArray', previouslyViewedArray);
    setHandles(handlesArray);
  }

  const { data } = useBlockProducts(handles);

  const { products, lowestPricesByCollection } = data || {};

  useEffect(() => {
    fetchPreviouslyViewed();
  }, []);

  const options: EmblaOptionsType = {
    loop: true,
    dragFree: false,
    align: 'center',
    breakpoints: {
      '(min-width: 768px)': { align: 'start' },
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
        <div className="embla" ref={products?.length > 4 ? emblaRef : null}>
          <div className="products__container embla__container">
            {products?.map((productNode) => {
              const product = productNode?.product;
              const content = productNode?.content;

              return (
                <div className="product__container embla__slide" key={product?.id}>
                  <div className="product__inner">
                    <ProductLink
                      productType={product?.productType}
                      productSlug={product?.productSlug}
                      collectionSlug={product?.collectionSlug}
                    >
                      <div className="product__image">
                        <DatoImage image={content.plpImage} enableDpr />
                      </div>
                      <div className="product__content">
                        <Heading type="h3" className="secondary product-suggestion__title">
                          {product?.collectionTitle}
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
