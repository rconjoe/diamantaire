import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import styled from 'styled-components';

const ChildProductStyles = styled.div`
  background-color: #fff;
  border-top: 0.1rem solid #e0e0e0;
  margin-top: 1rem;
  position: relative;

  .child-product__inner {
    display: flex;
    align-items: center;
    flex-direction: row;

    .child-product__image {
      flex: 0 0 16.8rem;
      padding-right: 2rem;
      height: auto;

      img {
        height: 100%;
        object-fit: cover;
      }
    }

    .cart-item__content {
      flex: 1;
      padding: 2rem 0;

      button {
        font-size: 1.4rem;
      }
      p {
        margin-bottom: 0.5rem;
        font-size: var(--font-size-xsmall);
        color: #777;

        &:first-child {
          display: flex;
          color: var(--color-black);
          span {
            flex: 1;
            text-align: right;
          }
        }

        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }
`;

const ChildProduct = ({ lineItem }) => {
  const { attributes, cost, id } = lineItem || {};

  console.log('lineItem', lineItem);

  const { locale } = useRouter();
  const { _t } = useTranslations(locale);

  const image = useMemo(() => {
    const imageSrc = attributes?.find((item) => item.key === 'productAsset')?.value;

    return imageSrc.includes('https')
      ? imageSrc
      : JSON.parse(attributes?.find((item) => item.key === 'productAsset')?.value);
  }, [lineItem]);

  const productType = useMemo(() => {
    let matchingAttribute = attributes?.find((attr) => attr.key === '_productType')?.value;

    if (matchingAttribute === 'Earrings') {
      // Check if Earrings product has child. If so, it's a pair
      const isLeftOrRight = attributes?.find((attr) => attr.key === 'leftOrRight')?.value;

      if (isLeftOrRight === 'Left' || isLeftOrRight === 'Right') {
        const capitalizedDirection = isLeftOrRight.charAt(0).toUpperCase() + isLeftOrRight.slice(1);

        matchingAttribute += ' (' + _t(capitalizedDirection) + ')';
      }
    }

    return matchingAttribute;
  }, [attributes]);

  const isProductDiamond = useMemo(() => {
    return productType === 'Diamond';
  }, [productType]);

  const specs = useMemo(() => {
    const matchingAttribute = attributes?.find((attr) => attr.key === '_specs')?.value;

    return matchingAttribute;
  }, []);

  return (
    <ChildProductStyles>
      <div className="child-product__inner">
        <div className="child-product__image">{isProductDiamond ? <img src={image} alt="" /> : <Image {...image} />}</div>

        <div className="cart-item__content">
          <p>
            <strong>{_t(productType)}</strong>
            {isProductDiamond && <span>{getFormattedPrice(parseFloat(cost?.totalAmount?.amount) * 100, locale)}</span>}
          </p>

          {specs?.split(';').map((val) => <p key={id + `-${val}`}>{val}</p>)}
        </div>
      </div>
    </ChildProductStyles>
  );
};

export default ChildProduct;
