/* eslint-disable camelcase */
import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { useAnalytics, normalizeVariantConfigurationForGTM } from '@diamantaire/darkside/context/analytics';
import { getCurrency, parseValidLocale, getFormattedPrice, metalTypeAsConst } from '@diamantaire/shared/constants';
import { makeCurrency } from '@diamantaire/shared/helpers';
import { ProductLink, ListPageItemConfiguration } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

const PlpProductVariantStyles = styled.div`
  .plp-variant__image {
    min-height: 300px;
    border: 1px solid #ccc;
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

const PlpProductVariant = ({
  variant,
  position,
  plpTitle,
  lowestPrice,
  useLowestPrice,
}: {
  variant: ListPageItemConfiguration;
  position: number;
  plpTitle: string;
  lowestPrice: number;
  useLowestPrice: boolean;
}) => {
  const { productClicked } = useAnalytics();
  const { locale } = useRouter();
  const { countryCode } = parseValidLocale(locale);

  const currencyCode = getCurrency(countryCode);
  const [isPrimaryImage, setIsPrimaryImage] = useState(true);
  const { productType, collectionSlug, productSlug, title, primaryImage, hoverImage, price } = variant || {};
  const configuration = normalizeVariantConfigurationForGTM(variant?.configuration);

  const handleImageChange = () => {
    if (!hoverImage?.src) return;
    setIsPrimaryImage(!isPrimaryImage);
  };

  const handleClick = () => {
    const { primaryImage: { src } = { src: '' } } = variant || {};
    const id = productSlug.split('-').pop();
    const formattedPrice = getFormattedPrice(price, locale, true, true);
    const brand = 'VRAI';

    productClicked({
      id,
      position,
      category: productType,
      image_url: src,
      price: formattedPrice,
      currencyCode,
      brand,
      name: title,
      ...configuration,
      // used for select_setting
      setting: title,
      // used for select_item
      item_list_name: plpTitle,
      item_name: title,
      product: title,
      ecommerce: {
        click: {
          products: [
            {
              id,
              brand,
              category: productType,
              price: formattedPrice,
              quantity: 1,
              currency: currencyCode,
            },
          ],
        },
        item_list_name: plpTitle,
        items: [
          {
            item_id: id,
            item_name: title,
            item_brand: brand,
            item_category: productType,
            price: formattedPrice,
            currency: currencyCode,
            position,
            ...configuration,
          },
        ],
        item_name: title,
      },
    });
  };

  return (
    <PlpProductVariantStyles>
      <ProductLink onClick={handleClick} productType={productType} collectionSlug={collectionSlug} productSlug={productSlug}>
        <div className="plp-variant__inner">
          <div className="plp-variant__image">
            <button
              onMouseEnter={handleImageChange}
              onFocus={handleImageChange}
              onMouseLeave={handleImageChange}
              onBlur={handleImageChange}
            >
              {isPrimaryImage
                ? primaryImage && (
                    <DatoImage
                      quality={100}
                      image={{
                        url: primaryImage?.src,
                        responsiveImage: {
                          ...primaryImage,
                        },
                      }}
                    />
                  )
                : hoverImage && (
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
              {title} | {metalTypeAsConst[configuration?.metal]} |{' '}
              {useLowestPrice
                ? makeCurrency(lowestPrice, locale, currencyCode) + '+'
                : makeCurrency(price, locale, currencyCode)}
            </h3>
          </div>
        </div>
      </ProductLink>
    </PlpProductVariantStyles>
  );
};

export { PlpProductVariant };
