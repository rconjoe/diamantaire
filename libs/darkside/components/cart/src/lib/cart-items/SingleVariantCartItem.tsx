/* eslint-disable camelcase */
import { useAnalytics } from '@diamantaire/analytics';
import { Heading } from '@diamantaire/darkside/components/common-ui';
import { CartCertProps, useCartData, useTranslations } from '@diamantaire/darkside/data/hooks';
import { combinePricesOfMultipleProducts, getFormattedPrice, simpleFormatPrice } from '@diamantaire/shared/constants';
import { XIcon } from '@diamantaire/shared/icons';
import { useRudderStackAnalytics } from '@diamantaire/shared/rudderstack';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { AttributeInput } from 'shopify-buy';
import styled from 'styled-components';

import CartDiamondCertificate from './CartCertificate';
import { CartItem } from '../types';

const SingleVariantCartItemStyles = styled.div`
  margin-bottom: 4rem;
  .cart-item__header {
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 0.1rem solid #ccc;

    .cart-item__remove-product {
      position: relative;
      top: 0.2rem;
      padding-right: 1rem;

      button {
        padding: 0;
        background-color: transparent;

        svg {
          stroke-width: 0.1rem;
          transform: scale(0.75);
          position: relative;
          top: 0.2rem;
        }
      }
    }

    .cart-item__price {
      flex: 1;
      text-align: right;

      p {
        font-size: var(--font-size-xsmall);
      }
    }
  }
  .cart-item__body {
    display: flex;
    align-items: center;
    padding-top: 1.5rem;

    .cart-item__image {
      flex: 0 0 16.8rem;
      padding-right: 2rem;
    }

    .cart-item__content {
      color: #737368;
      flex: 1;
      p {
        margin: 0 0 0.5rem;
        font-size: var(--font-size-xsmall);
        display: flex;

        &.setting-text {
          font-weight: bold;
          color: var(--color-black);
          span {
            flex: 1;
            text-align: right;
          }
        }

        &.shape {
          text-transform: capitalize;
        }

        &.engraving {
          span {
            font-weight: bold;
            font-style: italic;
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

const SingleVariantCartItem = ({
  item,
  info,
  updateItemQuantity,
  certificate,
}: {
  item: CartItem;
  info: any;
  certificate: CartCertProps;
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
  const { productRemoved } = useAnalytics();
  const { attributes, merchandise, cost, quantity } = item;
  const { locale } = useRouter();
  const price = locale === 'en-US' || locale === 'en-GB' ? cost?.totalAmount?.amount : merchandise?.price.amount;
  const currency = merchandise?.price?.currencyCode;
  const id = merchandise.id.split('/').pop();

  const { _t } = useTranslations(locale);

  const { refetch } = useCartData(locale);

  const image = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === '_productAssetObject')?.[0];

    return matchingAttribute ? JSON.parse(matchingAttribute.value) : null;
  }, [attributes]);

  const productType = useMemo(() => {
    const matchingEnglishProductTypeAttribute = attributes?.find((attr) => attr.key === '_productType')?.value;
    let matchingProductTypeAttribute = attributes?.find((attr) => attr.key === '_productTypeTranslated')?.value;

    if (matchingEnglishProductTypeAttribute === 'Earrings') {
      // Check if Earrings product has child. If so, it's a pair
      const childProduct = attributes?.find((attr) => attr.key === 'childProduct')?.value;
      const isLeftOrRight = attributes?.find((attr) => attr.key === 'leftOrRight')?.value;

      if (isLeftOrRight?.toLowerCase() === 'left' || isLeftOrRight?.toLowerCase() === 'right') {
        const capitalizedDirection = isLeftOrRight.charAt(0).toUpperCase() + isLeftOrRight.slice(1);

        matchingProductTypeAttribute += ' (' + _t(capitalizedDirection) + ')';
      } else if (childProduct) {
        matchingProductTypeAttribute += ' (' + _t('Pair') + ')';
      } else {
        matchingProductTypeAttribute += ' (' + _t('Single') + ')';
      }
    }

    return matchingProductTypeAttribute;
  }, [attributes]);

  const productTitle = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === '_productTitle')?.[0]?.value;

    return matchingAttribute;
  }, [attributes]);

  const diamondShape = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === 'diamondShape')?.[0]?.value;

    return matchingAttribute;
  }, [attributes]);

  const engraving = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === '_EngravingBack')?.[0]?.value;

    return matchingAttribute;
  }, [attributes]);

  const specs = useMemo(() => {
    const matchingAttribute = attributes?.find((attr) => attr.key === '_specs')?.value;

    return matchingAttribute;
  }, []);

  const analytics = useRudderStackAnalytics();

  function handleRemoveProduct() {
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

    analytics.track('remove_from_cart', {
      item_id: id,
      item_name: productTitle,
      item_brand: 'VRAI',
      item_category: productType,
      product_type: productType,
      price: price,
      currency,
      quantity: 1,
      diamond_type: diamondShape,
    });

    updateItemQuantity({
      lineId: item.id,
      variantId: merchandise.id,
      quantity: 0,
      attributes: item.attributes,
    }).then(() => refetch());
  }

  // Merchandise price always comes back in USD. Cost returns the price in the user's currency
  // Earrings need the merchandise price
  const priceToUse = locale === 'en-US' || quantity !== 1 ? merchandise?.price?.amount : cost?.totalAmount?.amount;
  // const priceToUse = merchandise?.price?.amount;
  const initPrice = parseFloat(priceToUse) * 100;

  // The price needs to be combined in the case of two identical earrings
  const dynamicPrice = Array.from(Array(quantity).keys()).map(() => initPrice);

  const totalPrice =
    quantity === 1
      ? getFormattedPrice(initPrice, locale, true, false, true, 1)
      : simpleFormatPrice(combinePricesOfMultipleProducts([...dynamicPrice], locale), locale);

  return (
    <SingleVariantCartItemStyles>
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
            {process.env.NODE_ENV === 'development' && 'single --- '}
            {productTitle}
          </Heading>
        </div>
        <div className="cart-item__price">{totalPrice && <p>{totalPrice}</p>}</div>
      </div>
      <div className="cart-item__body">
        <div className="cart-item__image">
          {image && <Image {...image} placeholder="empty" alt={info?.pdpTitle} unoptimized />}
        </div>
        <div className="cart-item__content">
          <p className="setting-text">{productType}</p>

          {specs?.split(';').map((val) => <p key={id + `-${val}`}>{val}</p>)}
          {engraving && (
            <p className="engraving">
              {_t('Engraving')}: <span>{engraving}</span>
            </p>
          )}
        </div>
      </div>
      {productType === 'Engagement Ring' && <CartDiamondCertificate certificate={certificate} />}
    </SingleVariantCartItemStyles>
  );
};

export default SingleVariantCartItem;
