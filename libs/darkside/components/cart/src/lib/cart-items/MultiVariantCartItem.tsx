/* eslint-disable camelcase */
import { useAnalytics } from '@diamantaire/analytics';
import { Heading } from '@diamantaire/darkside/components/common-ui';
import { updateMultipleItemsQuantity } from '@diamantaire/darkside/data/api';
import { CartCertProps, useCartData, useTranslations } from '@diamantaire/darkside/data/hooks';
import {
  combinePricesOfMultipleProducts,
  getFormattedPrice,
  parseValidLocale,
  simpleFormatPrice,
} from '@diamantaire/shared/constants';
import { XIcon } from '@diamantaire/shared/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { AttributeInput } from 'shopify-buy';
import styled from 'styled-components';

import CartDiamondCertificate from './CartCertificate';
import ChildProduct from './ChildProduct';
import { CartItem } from '../types';
import clsx from 'clsx';

const MultiVariantCartItemStyles = styled.div`
  margin-bottom: 4rem;

  .cart-item__header {
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 0.1rem solid #ccc;

    .cart-item__remove-product {
      position: relative;
      top: 0.4rem;
      padding-right: 1rem;

      button {
        padding: 0;
        background-color: transparent;

        svg {
          stroke-width: 0.1rem;
          transform: scale(0.75);
        }
      }
    }

    .cart-item__price {
      flex: 1;
      text-align: right;

      p {
        position: relative;
        top: 0.2rem;
        font-size: var(--font-size-xsmall);
      }
    }
  }
  .cart-item__body {
    display: flex;
    align-items: center;
    margin-top: 1.5rem;

    .cart-item__image {
      flex: 0 0 16.8rem;
      padding-right: 2rem;
      img {
        height: 100%;
      }
    }

    .cart-item__content {
      color: #737368;
      flex: 1;
      padding: 2rem 0;
      position: relative;

      button {
        font-size: 1.4rem;
      }
      p {
        margin: 0 0 0.5rem;
        font-size: var(--font-size-xsmall);
        display: flex;

        &.setting-text {
          color: #000;
          span {
            flex: 1;
            text-align: right;
          }
        }

        &.shape {
          text-transform: capitalize;
        }
        &.engraving {
          flex-wrap: wrap;
          &.-engagement-ring {
            span:not(.engraving-label) {
              font-family: var(--font-family-script-mt);
            }
          }
          span {
            font-weight: bold;
            margin: 0;

            &.engraving-label {
              margin-right: 0.5rem;
              font-weight: 400;
              font-style: normal;
            }
          }
        }

        &:last-child {
          margin-bottom: 0;
        }

        span {
          margin-left: 0.5rem;
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
  hasChildProduct,
}: {
  item: CartItem;
  certificate: CartCertProps;
  info: any;
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
  const { locale } = useRouter();

  const { productRemoved } = useAnalytics();
  const { attributes, merchandise, cost, quantity } = item;
  const price = merchandise?.price?.amount;
  const currency = merchandise?.price?.currencyCode;
  const id = merchandise.id.split('/').pop();
  const { data: checkout, refetch } = useCartData(locale);

  const productGroupKey = attributes.find((attr) => attr.key === 'productGroupKey')?.value;

  // Engraving is considered an engraving product, not a child product
  const childProducts = useMemo(() => {
    return checkout?.lines?.filter(
      (item) =>
        item.attributes?.find(
          (attr) =>
            attr.value === productGroupKey &&
            item.merchandise.id !== merchandise.id &&
            !item.attributes?.find((attr) => attr.key === 'engravingProduct'),
        ),
    );
  }, [item]);

  const engravingProduct = useMemo(() => {
    return checkout?.lines?.find(
      (item) =>
        item.attributes?.find(
          (attr) =>
            attr.value === productGroupKey &&
            item.merchandise.id !== merchandise.id &&
            item.attributes?.find((attr) => attr.key === 'engravingProduct'),
        ),
    );
  }, [item]);

  const { _t } = useTranslations(locale);

  const image = useMemo(() => {
    const matchingAttribute = attributes?.find((attr) => attr.key === '_productAssetObject');

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
      } else if (childProducts?.length > 0) {
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

  const engraving = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === '_EngravingBack')?.[0]?.value;

    return matchingAttribute;
  }, [attributes]);
  const engravingFont = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === '_EngravingFont')?.[0]?.value;

    return matchingAttribute;
  }, [attributes]);
  const specs = useMemo(() => {
    const matchingAttribute = attributes?.find((attr) => attr.key === '_specs')?.value;

    return matchingAttribute;
  }, []);

  const diamondShape = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === 'diamondShape')?.[0]?.value;

    return matchingAttribute;
  }, [attributes]);

  async function handleRemoveProduct() {
    if (((hasChildProduct && childProducts.length > 0) || engravingProduct) && checkout?.lines?.length > 1) {
      const total =
        parseFloat(price) +
        childProducts?.reduce((acc, curr) => acc + parseFloat(curr?.cost?.totalAmount?.amount), 0) +
        parseFloat(engravingProduct?.cost?.totalAmount?.amount);

      const formattedTotal = total.toFixed(2);

      const childProductsToRemove = childProducts?.map((childProduct) => ({
        brand: 'VRAI',
        category: childProduct?.merchandise?.product?.productType,
        variant: childProduct?.merchandise?.product?.title,
        id: childProduct?.merchandise.id.split('/').pop(),
        name: childProduct?.merchandise?.product?.title,
        price: childProduct?.cost?.totalAmount?.amount,
        quantity: childProduct?.quantity,
      }));

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
              ...childProductsToRemove,
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
            ...childProductsToRemove,
          ],
        },
      });

      const itemsToRemove = [
        {
          lineId: item.id,
          variantId: merchandise.id,
          quantity: item.quantity - 1,
          attributes: item.attributes,
        },
      ];

      if (childProducts) {
        childProducts.forEach((childProduct) => {
          return itemsToRemove.push({
            lineId: childProduct.id,
            variantId: childProduct.merchandise.id,
            quantity: childProduct.quantity - 1,
            attributes: childProduct.attributes,
          });
        });
      }
      if (engravingProduct) {
        itemsToRemove.push({
          lineId: engravingProduct.id,
          variantId: engravingProduct.merchandise.id,
          quantity: engravingProduct.quantity - 1,
          attributes: engravingProduct.attributes,
        });
      }

      await updateMultipleItemsQuantity({
        items: itemsToRemove,
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
      await updateItemQuantity({
        lineId: item.id,
        variantId: merchandise.id,
        quantity: item.quantity - 1,
        attributes: item.attributes,
      });
    }
  }

  // Use this for calculating total, not the single line item price
  const initPrice = parseFloat(merchandise?.price?.amount) * 100;

  const { countryCode } = parseValidLocale(locale);

  // console.log('totes', totalPrice);

  const diamondPrices = childProducts?.map((childProduct) => parseFloat(childProduct?.merchandise?.price?.amount) * 100);

  const tempTotalPrice =
    engraving && childProducts
      ? combinePricesOfMultipleProducts(
          [...diamondPrices, initPrice, parseFloat(engravingProduct?.merchandise?.price?.amount) * 100],
          locale,
        )
      : childProducts.length > 0
      ? combinePricesOfMultipleProducts([...diamondPrices, initPrice], locale)
      : combinePricesOfMultipleProducts([initPrice], locale);

  return (
    <MultiVariantCartItemStyles>
      <div className="cart-item__header">
        <div className="cart-item__remove-product">
          <button
            onClick={() => {
              handleRemoveProduct().then(() => refetch());
            }}
          >
            <XIcon />
          </button>
        </div>
        <div className="cart-item__title">
          <Heading type="h4" className="primary no-margin">
            {process.env.NODE_ENV === 'development' && 'multi --- '} {productTitle}
          </Heading>
        </div>
        <div className="cart-item__price">
          {hasChildProduct || engravingProduct ? (
            <p>{simpleFormatPrice(tempTotalPrice, locale)}</p>
          ) : (
            <p>
              {getFormattedPrice(
                parseFloat(cost?.totalAmount?.amount) * 100,
                locale,
                true,
                false,
                countryCode === 'GB',
                countryCode === 'GB' || countryCode === 'US' ? 1 : quantity,
              )}
            </p>
          )}
        </div>
      </div>
      <div className="cart-item__body">
        <div className="cart-item__image">{image && <Image {...image} placeholder="empty" alt={info?.pdpTitle} />}</div>

        <div className="cart-item__content">
          <p className="setting-text">
            <strong>{info?.productCategory || productType}</strong>
            {(productType === 'Engagement Ring' || hasChildProduct) && (
              <span>
                {getFormattedPrice(
                  ((engraving ? parseFloat(engravingProduct?.cost?.totalAmount?.amount) : 0) +
                    parseFloat(cost?.totalAmount?.amount) * quantity) *
                    100,
                  locale,
                  true,
                  false,
                  true,
                )}
              </span>
            )}
          </p>
          {specs?.split(';').map((val) => <p key={id + `-${val}`}>{val}</p>)}
          {engraving && (
            <p className={clsx('engraving', { '-engagement-ring': engravingFont === 'Script MT Bold' })}>
              <span className="engraving-label">{_t('Engraving')}:</span>
              <span>{engraving}</span>
            </p>
          )}
        </div>
      </div>

      {childProducts?.map((childProduct) => {
        // Excludes engravings + gift notes
        const isChildProductHidden = childProduct?.attributes?.find((attr) => attr.key === '_hiddenProduct');

        if (isChildProductHidden) return null;

        return <ChildProduct key={childProduct?.id} lineItem={childProduct} />;
      })}
      {productType === 'Engagement Ring' && <CartDiamondCertificate certificate={certificate} />}
    </MultiVariantCartItemStyles>
  );
};

export default MultiVariantCartItem;
