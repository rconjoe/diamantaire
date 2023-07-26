import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { metalTypeAsConst } from '@diamantaire/shared/constants';
import { makeCurrency } from '@diamantaire/shared/helpers';
import { ListPageItemConfiguration } from '@diamantaire/shared-product';
import { useState } from 'react';
import styled from 'styled-components';

import { ProductLink } from './PlpProductLink';

const PlpProductVariantStyles = styled.div`
  .plp-variant__image {
    button {
      padding: 0;
      width: 100%;
    }
  }
  .plp-variant__content {
    padding: calc(var(--gutter) / 10) 0;
    h3 {
      font-size: var(--font-size-xxxsmall);
      font-weight: var(--font-weight-normal);
    }
  }
`;

const PlpProductVariant = ({ variant }: { variant: ListPageItemConfiguration }) => {
  const [isPrimaryImage, setIsPrimaryImage] = useState(true);
  const { productType, collectionSlug, productSlug, title, primaryImage, hoverImage, configuration, price } = variant || {};

  const handleImageChange = () => {
    if (!hoverImage?.src) return;
    setIsPrimaryImage(!isPrimaryImage);
  };

  return (
    <PlpProductVariantStyles>
      <ProductLink productType={productType} collectionSlug={collectionSlug} productSlug={productSlug}>
        <div className="plp-variant__inner">
          <div className="plp-variant__image">
            <button
              onMouseEnter={handleImageChange}
              onFocus={handleImageChange}
              onMouseLeave={handleImageChange}
              onBlur={handleImageChange}
            >
              {isPrimaryImage ? (
                <DatoImage
                  quality={100}
                  image={{
                    url: primaryImage?.src,
                    responsiveImage: {
                      ...primaryImage,
                    },
                  }}
                />
              ) : (
                <DatoImage
                  quality={100}
                  image={{
                    url: hoverImage?.src,
                    responsiveImage: {
                      ...hoverImage,
                    },
                  }}
                />
              )}
            </button>
          </div>
          <div className="plp-variant__content">
            <h3>
              {title} | {metalTypeAsConst[configuration?.metal]} | {makeCurrency(price)}
            </h3>
          </div>
        </div>
      </ProductLink>
    </PlpProductVariantStyles>
  );
};

export { PlpProductVariant };
