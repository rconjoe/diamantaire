import { Heading } from '@diamantaire/darkside/components/common-ui';
import { CartCertProps } from '@diamantaire/darkside/data/hooks';
import { makeCurrencyFromShopifyPrice } from '@diamantaire/shared/helpers';
import { XIcon } from '@diamantaire/shared/icons';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { AttributeInput } from 'shopify-buy';
import styled from 'styled-components';

import { CartItem } from '../types';

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

        &.shape {
          text-transform: capitalize;
        }

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
  item,
  info,
  certificate,
  updateItemQuantity,
  cartItemDetails,
}: {
  item: CartItem;
  certificate: CartCertProps;
  info: any;
  cartItemDetails: { [key: string]: string }[];
  updateItemQuantity: ({
    lineId,
    variantId,
    quantity,
    attributes,
  }: {
    lineId: string;
    variantId: string;
    quantity: number;
    attributes: AttributeInput[];
  }) => Promise<string | undefined>;
}) => {
  const [refinedCartItemDetails, setRefinedCartItemDetails] = useState<{ [key: string]: string }[] | null>(null);
  const { attributes, cost, merchandise } = item;
  const { selectedOptions } = merchandise;
  const { copy: certCopy, title: certTitle, price: certPrice } = certificate || {};

  const image = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === '_image')?.[0];

    return matchingAttribute ? JSON.parse(matchingAttribute.value) : null;
  }, [attributes]);

  const itemAttributes = useMemo(
    () => [
      {
        label: refinedCartItemDetails?.['diamondType'],
        value: info?.diamondShape,
      },
      {
        label: refinedCartItemDetails?.['centerStone'],
        value: info?.centerStone,
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
        value: selectedOptions.filter((option) => option.name === 'Size')?.[0]?.value,
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
          <button
            onClick={() =>
              updateItemQuantity({
                lineId: item.id,
                variantId: merchandise.id,
                quantity: item.quantity - 1,
                attributes: item.attributes,
              })
            }
          >
            <XIcon />
          </button>
        </div>
        <div className="cart-item__title">
          <Heading type="h4" className="primary no-margin">
            {info?.productTitle}
          </Heading>
        </div>
        <div className="cart-item__price">
          <p>{makeCurrencyFromShopifyPrice(parseFloat(cost?.totalAmount?.amount) / item.quantity)}</p>
        </div>
      </div>
      <div className="cart-item__body">
        <div className="cart-item__image">
          <div className="cart-item__image">{image && <Image {...image} placeholder="empty" alt={info?.pdpTitle} />}</div>
        </div>
        <div className="cart-item__content">
          {itemAttributes?.map((specItem, index) => (
            <p className={specItem?.label?.toLowerCase()} key={`${item.id}-${index}`}>
              {specItem.label !== '' ? specItem.label + ':' : ''} {specItem.value}
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
