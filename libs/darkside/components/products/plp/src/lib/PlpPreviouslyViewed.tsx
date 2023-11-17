import { Heading, UIString } from '@diamantaire/darkside/components/common-ui';
import { useBlockProducts } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { ProductLink } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const PlpPreviouslyViewedStyles = styled.section``;

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

  // Still need the image

  return (
    <PlpPreviouslyViewedStyles className="container-wrapper">
      <div className="title-container text-center">
        <Heading type="h2" className="primary h1">
          <UIString>Previously viewed</UIString>
        </Heading>
      </div>
      <div className="product-container">
        {products?.map((product) => {
          return (
            <div className="product-suggestion__container" key={product?.id}>
              <div className="product-suggestion__inner">
                <ProductLink
                  productType={product?.productType}
                  productSlug={product?.productSlug}
                  collectionSlug={product?.collectionSlug}
                >
                  <div className="product-suggestion__image">
                    image
                    {/* <DatoImage image={refinedConfigurations?.[index]?.configuration?.plpImage} /> */}
                  </div>
                  <div className="product-suggestion__content">
                    <Heading type="h3" className="secondary product-suggestion__title">
                      {product?.collectionTitle}
                    </Heading>
                    <p>{getFormattedPrice(lowestPricesByCollection[product?.collectionSlug], locale)}+</p>
                  </div>
                </ProductLink>
              </div>
            </div>
          );
        })}
      </div>
    </PlpPreviouslyViewedStyles>
  );
};

export { PlpPreviouslyViewed };
