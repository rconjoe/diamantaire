/* eslint-disable camelcase */
import { Heading } from '@diamantaire/darkside/components/common-ui';
import { useAnalytics } from '@diamantaire/darkside/context/analytics';
import { CartContext } from '@diamantaire/darkside/context/cart-context';
import { CartCertProps, useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { XIcon } from '@diamantaire/shared/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AttributeInput } from 'shopify-buy';
import styled from 'styled-components';

import ChildProduct from './ChildProduct';
import { CartItem } from '../types';

const MultiVariantCartItemStyles = styled.div`
  margin-bottom: 40px;

  .cart-item__header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;

    .cart-item__remove-product {
      position: relative;
      top: 4px;
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

      p {
        position: relative;
        top: 2px;
      }
    }
  }
  .cart-item__body {
    display: flex;
    align-items: center;
    margin-top: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;

    .cart-item__image {
      flex: 0 0 168px;
      padding-right: 20px;
    }

    .cart-item__content {
      color: #737368;
      flex: 1;
      padding-right: 15px;

      button {
        font-size: 1.4rem;
      }
      p {
        margin: 0 0 5px;
        font-size: 1.5rem;
        display: flex;

        &.setting-text {
          color: #000;
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

const MultiVariantCartItem = ({
  item,
  info,
  certificate,
  updateItemQuantity,
  cartItemDetails,
  hasChildProduct,
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
  hasChildProduct: boolean;
}) => {
  const [refinedCartItemDetails, setRefinedCartItemDetails] = useState<{ [key: string]: string }[] | null>(null);
  const { productRemoved } = useAnalytics();
  const { attributes, cost, merchandise, quantity } = item;
  const price = cost?.totalAmount?.amount;
  const currency = cost?.totalAmount?.currencyCode;
  const id = merchandise.id.split('/').pop();
  const { selectedOptions } = merchandise;
  const { updateMultipleItemsQuantity, checkout } = useContext(CartContext);

  const productGroupKey = attributes.find((attr) => attr.key === 'productGroupKey')?.value;

  const childProduct = useMemo(() => {
    return checkout.lines?.find((item) =>
      item.attributes?.find((attr) => attr.value === productGroupKey && item.merchandise.id !== merchandise.id),
    );
  }, [item]);

  const { locale } = useRouter();
  const { _t } = useTranslations(locale);

  const image = useMemo(() => {
    const matchingAttribute = attributes?.find((attr) => attr.key === 'productAsset');

    return matchingAttribute ? JSON.parse(matchingAttribute.value) : null;
  }, [attributes]);

  const productType = useMemo(() => {
    let matchingAttribute = attributes?.find((attr) => attr.key === '_productType')?.value;

    if (matchingAttribute === 'Earrings') {
      // Check if Earrings product has child. If so, it's a pair
      const isLeftOrRight = attributes?.find((attr) => attr.key === 'leftOrRight')?.value;

      if (isLeftOrRight?.toLowerCase() === 'left' || isLeftOrRight?.toLowerCase() === 'right') {
        const capitalizedDirection = isLeftOrRight.charAt(0).toUpperCase() + isLeftOrRight.slice(1);

        matchingAttribute += ' (' + _t(capitalizedDirection) + ')';
      } else if (childProduct) {
        matchingAttribute += ' (' + _t('Pair') + ')';
      } else {
        matchingAttribute += ' (' + _t('Single') + ')';
      }
    }

    return matchingAttribute;
  }, [attributes]);

  const productTitle = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === '_productTitle')?.[0]?.value;

    return matchingAttribute;
  }, [attributes]);

  const diamondShape = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === 'diamondShape')?.[0]?.value;

    return matchingAttribute;
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
        value: info?.metalType,
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

  async function handleRemoveProduct() {
    if (hasChildProduct && childProduct && checkout.lines.length > 1) {
      const total = parseFloat(price) + parseFloat(childProduct?.cost?.totalAmount?.amount);
      const formattedTotal = total.toFixed(2);

      productRemoved({
        name: productTitle,
        id,
        price,
        quantity,
        variant: productTitle,
        brand: 'VRAI',
        category: productType,
        product: productTitle,
        ...(diamondShape && { diamond_type: diamondShape }),
        ecommerce: {
          value: formattedTotal,
          currency,
          remove: {
            products: [
              {
                brand: 'VRAI',
                category: productType,
                variant: productTitle,
                id,
                name: productTitle,
                price,
                quantity,
              },
              {
                brand: 'VRAI',
                category: childProduct?.merchandise?.product?.productType,
                variant: childProduct?.merchandise?.product?.title,
                id: childProduct?.merchandise.id.split('/').pop(),
                name: childProduct?.merchandise?.product?.title,
                price: childProduct?.cost?.totalAmount?.amount,
                quantity: childProduct?.quantity,
              },
            ],
          },
          items: [
            {
              item_id: id,
              item_name: productTitle,
              item_brand: 'VRAI',
              currency,
              item_category: productType,
              price,
              quantity,
            },
            {
              item_id: childProduct?.merchandise.id.split('/').pop(),
              item_name: childProduct?.merchandise?.product?.title,
              item_brand: 'VRAI',
              currency,
              item_category: childProduct?.merchandise?.product?.productType,
              price: childProduct?.cost?.totalAmount?.amount,
              quantity: childProduct?.quantity,
            },
          ],
        },
      });

      await updateMultipleItemsQuantity({
        items: [
          {
            lineId: item.id,
            variantId: merchandise.id,
            quantity: item.quantity - 1,
            attributes: item.attributes,
          },
          {
            lineId: childProduct.id,
            variantId: childProduct.merchandise.id,
            quantity: childProduct.quantity - 1,
            attributes: childProduct.attributes,
          },
        ],
      });
    } else {
      productRemoved({
        name: productTitle,
        id,
        price,
        quantity,
        variant: productTitle,
        brand: 'VRAI',
        category: productType,
        product: productTitle,
        ...(diamondShape && { diamond_type: diamondShape }),
        ecommerce: {
          value: price,
          currency,
          remove: {
            products: [
              {
                brand: 'VRAI',
                category: productType,
                variant: productTitle,
                id,
                name: productTitle,
                price,
                quantity,
              },
            ],
          },
          items: [
            {
              item_id: id,
              item_name: productTitle,
              item_brand: 'VRAI',
              currency,
              item_category: productType,
              price,
              quantity,
            },
          ],
        },
      });
      updateItemQuantity({
        lineId: item.id,
        variantId: merchandise.id,
        quantity: item.quantity - 1,
        attributes: item.attributes,
      });
    }
  }

  return (
    <MultiVariantCartItemStyles>
      <div className="cart-item__header">
        <div className="cart-item__remove-product">
          <button
            onClick={() => {
              handleRemoveProduct();
            }}
          >
            <XIcon />
          </button>
        </div>
        <div className="cart-item__title">
          <Heading type="h4" className="primary no-margin">
            multi -- {productTitle}
          </Heading>
        </div>
        <div className="cart-item__price">
          {hasChildProduct ? (
            <p>
              {getFormattedPrice(
                parseFloat(cost?.totalAmount?.amount) + parseFloat(childProduct?.cost?.totalAmount?.amount) * 100,
                locale,
              )}
            </p>
          ) : (
            <p>{getFormattedPrice(parseFloat(cost?.totalAmount?.amount) * 100)}</p>
          )}
        </div>
      </div>
      <div className="cart-item__body">
        <div className="cart-item__image">{image && <Image {...image} placeholder="empty" alt={info?.pdpTitle} />}</div>

        <div className="cart-item__content">
          <p className="setting-text">
            <strong>{info?.productCategory || productType}</strong>
            {productType === 'Engagement Ring' && (
              <span>{getFormattedPrice(parseFloat(cost?.totalAmount?.amount) * 100)}</span>
            )}
          </p>
          {itemAttributes?.map((specItem, index) => {
            if (!specItem?.value || specItem.value === 'other') return null;

            return (
              <p className={specItem?.label?.toLowerCase()} key={`${item.id}-${index}`}>
                {specItem.label !== '' ? specItem.label + ':' : ''} {specItem.value}
              </p>
            );
          })}
        </div>
      </div>
      {hasChildProduct && childProduct && (
        <ChildProduct lineItem={childProduct} refinedCartItemDetails={refinedCartItemDetails} certificate={certificate} />
      )}
    </MultiVariantCartItemStyles>
  );
};

export default MultiVariantCartItem;
