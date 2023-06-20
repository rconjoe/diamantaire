import { CartCertProps } from '@diamantaire/darkside/data/hooks';
import { formatCurrency } from '@diamantaire/shared/helpers';
import { XIcon } from '@diamantaire/shared/icons';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { CheckoutLineItem } from 'shopify-buy';
import styled from 'styled-components';

import { ERCartItemProps } from '../types';

const SingleERVariantCartItemContainer = styled.div`
  margin-bottom: 40px;
  .cart-item__header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;

    .cart-item__remove-product {
      position: relative;
      top: 2px;
      padding-right: 10px;

      button {
        padding: 0;
        background-color: transparent;

        svg {
          stroke-width: 1px;
          transform: scale(0.75);
        }
      }
    }

    .cart-item__title {
    }
    .cart-item__price {
      flex: 1;
      text-align: right;
    }
  }
  .cart-item__body {
    display: flex;
    align-items: center;
    padding-top: 15px;

    .cart-item__image {
      flex: 0 0 168px;
      padding-right: 10px;
    }

    .cart-item__content {
      color: #737368;
      flex: 1;
      p {
        margin: 0 0 5px;
        font-size: 1.7rem;
        display: flex;

        &:last-child {
          margin-bottom: 0;
        }

        span {
          flex: 1;
          text-align: right;
        }
      }
    }
  }

  .certificate-info {
    border: 1px solid #000;
    margin-top: 15px;
    .certificate-info__inner {
      padding: 20px;

      .certificate-info__title {
        display: flex;
        margin-bottom: 10px;
        p {
          flex: 1;
          margin: 0;
          font-size: 1.7rem;
          display: block;
          color: #000;

          &:first-child {
            flex: 2;
          }
          &:last-child {
            text-align: right;
          }
        }
      }
      .certificate-info__body {
        p {
          margin: 0;
          font-size: 1.4rem;
          display: block;
          color: #737368;
        }
      }
    }
  }
`;

const SingleERVariantCartItem = ({
  product,
  info,
  certificate,
  removeAnyProductFromCart,
  cartItemDetails,
}: {
  product: CheckoutLineItem;
  certificate: CartCertProps;
  info: ERCartItemProps;
  cartItemDetails: { [key: string]: string }[];
  removeAnyProductFromCart: (ids: string[]) => void;
}) => {
  const [refinedCartItemDetails, setRefinedCartItemDetails] = useState<{ [key: string]: string }[] | null>(null);
  const { variant, customAttributes, id } = product;
  const { copy: certCopy, title: certTitle, price: certPrice } = certificate || {};

  const image = useMemo(() => {
    const matchingAttribute = customAttributes?.filter((attr) => attr.key === '_image')?.[0];

    return matchingAttribute ? JSON.parse(matchingAttribute.value) : null;
  }, [customAttributes]);

  const attributes = useMemo(
    () => [
      {
        label: refinedCartItemDetails?.['diamondType'],
        value: info?.diamondShape,
      },
      {
        label: refinedCartItemDetails?.['centerStone'],
        value: info?.diamondInfo,
      },
      {
        label: refinedCartItemDetails?.['metal'],
        value: info?.metal,
      },
      {
        label: '',
        value: info?.bandAccent,
      },
      {
        label: refinedCartItemDetails?.['ringSize'],
        value: info?.ringSize,
      },
    ],
    [refinedCartItemDetails, info],
  );

  useEffect(() => {
    const tempRefinedCartItemDetails: { [key: string]: string }[] = [{}];

    cartItemDetails?.map((item) => {
      tempRefinedCartItemDetails[item['value']] = item['label'];
    });

    setRefinedCartItemDetails(tempRefinedCartItemDetails);
  }, [cartItemDetails]);

  console.log('attty', attributes);
  console.log('refinedCartItemDetails', refinedCartItemDetails);

  return (
    <SingleERVariantCartItemContainer>
      <div className="cart-item__header">
        <div className="cart-item__remove-product">
          <button onClick={() => removeAnyProductFromCart([id])}>
            <XIcon />
          </button>
        </div>
        <div className="cart-item__title">
          <h4 className="no-margin">{info?.pdpTitle}</h4>
        </div>
        <div className="cart-item__price">
          <p>
            {formatCurrency({
              locale: 'en-US',
              amount: variant?.price?.amount,
            })}
          </p>
        </div>
      </div>
      <div className="cart-item__body">
        <div className="cart-item__image">
          <div className="cart-item__image">{image && <Image {...image} placeholder="empty" alt={info?.pdpTitle} />}</div>
        </div>
        <div className="cart-item__content">
          {attributes?.map((item, index) => (
            <p key={`${product.id}-${index}`}>
              {item.label !== '' ? item.label + ':' : ''} {item.value}
            </p>
          ))}
        </div>
      </div>
      <div className="certificate-info">
        <div className="certificate-info__inner">
          <div className="certificate-info__title">
            <p>{certTitle}</p>
            <p>{certPrice}</p>
          </div>
          <div className="certificate-info__body">
            <p>{certCopy}</p>
          </div>
        </div>
      </div>
    </SingleERVariantCartItemContainer>
  );
};

export default SingleERVariantCartItem;
