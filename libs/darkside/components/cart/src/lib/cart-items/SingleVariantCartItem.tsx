import { Heading } from '@diamantaire/darkside/components/common-ui';
import { makeCurrencyFromShopifyPrice } from '@diamantaire/shared/helpers';
import { XIcon } from '@diamantaire/shared/icons';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { AttributeInput } from 'shopify-buy';
import styled from 'styled-components';

import { CartItem } from '../types';

const SingleVariantCartItemStyles = styled.div`
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
          position: relative;
          top: 2px;
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
      padding-right: 20px;
    }

    .cart-item__content {
      color: #737368;
      flex: 1;
      p {
        margin: 0 0 5px;
        font-size: 1.5rem;
        display: flex;

        &.setting-text {
          font-weight: bold;
          color: var(--color-black);
        }

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
`;

const SingleVariantCartItem = ({
  item,
  info,
  updateItemQuantity,
  cartItemDetails,
}: {
  item: CartItem;
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
  const { attributes, cost, merchandise } = item;
  const [refinedCartItemDetails, setRefinedCartItemDetails] = useState<{ [key: string]: string }[] | null>(null);

  const image = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === '_image')?.[0];

    return matchingAttribute ? JSON.parse(matchingAttribute.value) : null;
  }, [attributes]);

  const productType = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === 'productType')?.[0]?.value;

    return matchingAttribute;
  }, [attributes]);

  const itemAttributes = useMemo(
    () => [
      {
        label: refinedCartItemDetails?.['diamondType'],
        value: info?.diamondShape,
      },
      {
        label: refinedCartItemDetails?.['metal'],
        value: info?.metal,
      },
      {
        label: 'Chain Length',
        value: info?.chainLength,
      },
      {
        label: refinedCartItemDetails?.['caratWeight'],
        value: info?.caratWeight,
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

  return (
    <SingleVariantCartItemStyles>
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
        <div className="cart-item__image">{image && <Image {...image} placeholder="empty" alt={info?.pdpTitle} />}</div>
        <div className="cart-item__content">
          <p className="setting-text">{productType}</p>
          {itemAttributes?.map((specItem, index) => {
            if (!specItem.value || specItem.value === '') {
              return null;
            }

            return (
              <p className={specItem?.label?.toLowerCase()} key={`${item.id}-${index}`}>
                {specItem.label !== '' ? specItem.label + ':' : ''} {specItem.value}
              </p>
            );
          })}
        </div>
      </div>
    </SingleVariantCartItemStyles>
  );
};

export default SingleVariantCartItem;
