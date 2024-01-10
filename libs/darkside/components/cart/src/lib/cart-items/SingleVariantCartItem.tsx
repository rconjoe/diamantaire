/* eslint-disable camelcase */
import { useAnalytics } from '@diamantaire/analytics';
import { Heading } from '@diamantaire/darkside/components/common-ui';
import { CartCertProps, useCartData, useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { XIcon } from '@diamantaire/shared/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
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
  cartItemDetails,
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
  const price = cost?.totalAmount?.amount;
  const currency = merchandise?.price?.currencyCode;
  const id = merchandise.id.split('/').pop();

  const { locale } = useRouter();
  const { _t } = useTranslations(locale);

  const { refetch } = useCartData(locale);

  const [refinedCartItemDetails, setRefinedCartItemDetails] = useState<{ [key: string]: string }[] | null>(null);

  const image = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === '_productAssetObject')?.[0];

    return matchingAttribute ? JSON.parse(matchingAttribute.value) : null;
  }, [attributes]);

  const productType = useMemo(() => {
    let matchingAttribute = attributes?.find((attr) => attr.key === '_productTypeTranslated')?.value;

    if (matchingAttribute === 'Earrings') {
      // Check if Earrings product has child. If so, it's a pair
      const childProduct = attributes?.find((attr) => attr.key === 'childProduct')?.value;
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

  const engraving = useMemo(() => {
    const matchingAttribute = attributes?.filter((attr) => attr.key === '_EngravingBack')?.[0]?.value;

    return matchingAttribute;
  }, [attributes]);

  const specs = useMemo(() => {
    const matchingAttribute = attributes?.find((attr) => attr.key === '_specs')?.value;

    return matchingAttribute;
  }, []);

  console.log('specs', specs);

  const itemAttributes = useMemo(() => {
    const initAttributes = [
      {
        label: refinedCartItemDetails?.['diamondType'],
        value: info?.diamondShape,
      },
      {
        label: refinedCartItemDetails?.['metal'],
        value: info?.metalType,
      },
      // Bracelet Specific
      {
        label: 'Chain Length',
        value: info?.chainLength,
      },
      {
        label: refinedCartItemDetails?.['bandWidth'],
        value: info?.bandWidth,
      },
      {
        label: refinedCartItemDetails?.['caratWeight'],
        value: info?.caratWeight,
      },
      {
        label: refinedCartItemDetails?.['centerStone'],
        value: info?.centerStone,
      },
      // no label for band accent
      {
        label: _t('band'),
        value: info?.bandAccent,
      },
      {
        label: refinedCartItemDetails?.['ringSize'],
        value: info?.ringSize,
      },
      {
        label: _t('Engraving'),
        value: engraving,
      },
    ];

    // show for loose diamonds
    if (productType === 'Diamond' || productType === 'Diamonds') {
      initAttributes.push({
        label: _t('Color'),
        value: info?.color,
      });
      initAttributes.push({
        label: _t('Cut'),
        value: info?.cut,
      });
      initAttributes.push({
        label: _t('Clarity'),
        value: info?.clarity,
      });
    }

    return initAttributes;
  }, [refinedCartItemDetails, info]);

  console.log('itemAttributes', itemAttributes);

  useEffect(() => {
    const tempRefinedCartItemDetails: { [key: string]: string }[] = [{}];

    cartItemDetails?.map((item) => {
      tempRefinedCartItemDetails[item['value']] = item['label'];
    });

    setRefinedCartItemDetails(tempRefinedCartItemDetails);
  }, [cartItemDetails]);

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

    updateItemQuantity({
      lineId: item.id,
      variantId: merchandise.id,
      quantity: 0,
      attributes: item.attributes,
    }).then(() => refetch());
  }

  // The price needs to be combined in the case of two identical earrings
  const totalPrice = useMemo(() => {
    return getFormattedPrice(parseFloat(price) * 100, locale);
  }, [info]);

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
        <div className="cart-item__image">{image && <Image {...image} placeholder="empty" alt={info?.pdpTitle} />}</div>
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
