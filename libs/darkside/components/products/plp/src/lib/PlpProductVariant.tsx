/* eslint-disable camelcase */
import { useAnalytics, normalizeVariantConfigurationForGTM } from '@diamantaire/analytics';
import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { getCurrency, parseValidLocale, getFormattedPrice, metalTypeAsConst } from '@diamantaire/shared/constants';
import { makeCurrency } from '@diamantaire/shared/helpers';
import { ProductLink, ListPageItemConfiguration } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

const PlpProductVariantStyles = styled.div`
  .plp-variant__image {
    position: relative;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      min-height: 300px;
    }

    button {
      padding: 0;
      width: 100%;
      display: block;
      border: none;
    }

    .plp-variant__label {
      position: absolute;
      font-size: 14px;
      left: 15px;
      top: 15px;
      background: rgb(255, 255, 255);
      border: 1px solid rgb(216, 214, 209);
      padding: 4px 6px;
      border-radius: 2px;
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
  label,
}: {
  variant: ListPageItemConfiguration;
  position: number;
  plpTitle: string;
  lowestPrice: number;
  useLowestPrice: boolean;
  label: string | null;
}) => {
  const { productClicked } = useAnalytics();
  const { locale } = useRouter();
  const { countryCode } = parseValidLocale(locale);

  const currencyCode = getCurrency(countryCode);
  const [isPrimaryImage, setIsPrimaryImage] = useState(true);
  const { productType, collectionSlug, productSlug, title, primaryImage, hoverImage, price } = variant || {};

  const configuration = normalizeVariantConfigurationForGTM(variant?.configuration);

  const productTitleWithProperties = `${title} | ${metalTypeAsConst[configuration?.metal]}`;

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
                      quality={60}
                      overrideAlt={productTitleWithProperties}
                      enableDpr
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
                      quality={60}
                      enableDpr
                      image={{
                        url: hoverImage?.src,
                        responsiveImage: {
                          ...hoverImage,
                        },
                      }}
                    />
                  )}
            </button>

            <WishlistLikeButton extraClass="plp" productId={`product-${variant?.productSlug}`} />

            {label && <span className="plp-variant__label">{label}</span>}
          </div>
          <div className="plp-variant__content">
            <h3>
              {productTitleWithProperties} |{' '}
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

// old
// https://www.datocms-assets.com/25216/1666939585-petite-solitaire-round-studs-three-quarter-yellow.jpg?auto=format&crop=focalpoint&dpr=2&fit=crop&h=344&q=60&w=344

// new
// https://www.datocms-assets.com/25216/1666939585-petite-solitaire-round-studs-three-quarter-yellow.jpg?auto=format&crop=focalpoint&fit=crop&h=344&q=100&w=344&dpr=2
