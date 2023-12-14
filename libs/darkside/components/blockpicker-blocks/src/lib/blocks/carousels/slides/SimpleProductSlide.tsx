import { DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { ProductLink } from '@diamantaire/shared-product';
import styled from 'styled-components';

const SimpleProductSlideStyles = styled.div`
  .slide__content {
    padding-top: 1rem;

    .simple-product-slide__title {
      font-weight: bold;
      line-height: 1.3;
    }
  }
`;

const SimpleProductSlide = (props) => {
  const { configuration, title, productData } = props;

  return (
    <SimpleProductSlideStyles>
      <ProductLink
        productType={configuration?.collection?.productType}
        collectionSlug={productData?.product?.collectionSlug}
        productSlug={productData?.product?.productSlug}
      >
        <div className="slide__inner">
          <div className="slide__image">
            <DatoImage image={configuration?.plpImage} />
          </div>
          <div className="slide__content">
            <Heading type="h3" className="secondary simple-product-slide__title">
              {title}
            </Heading>
          </div>
        </div>
      </ProductLink>
    </SimpleProductSlideStyles>
  );
};

export default SimpleProductSlide;
