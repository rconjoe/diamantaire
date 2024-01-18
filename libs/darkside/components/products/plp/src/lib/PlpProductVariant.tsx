/* eslint-disable camelcase */
import { useAnalytics, normalizeVariantConfigurationForGTM } from '@diamantaire/analytics';
import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { useTranslations, humanNamesMapperType } from '@diamantaire/darkside/data/hooks';
import { getCurrency, parseValidLocale, getFormattedPrice, metalTypeAsConst } from '@diamantaire/shared/constants';
import { ProductLink, ListPageItemConfiguration } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';

const PlpProductVariantStyles = styled.div`
  > button {
    width: 100%;
    background-color: transparent;
    padding: 0;
    text-align: left;
  }

  .plp-variant__image {
    position: relative;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      min-height: 30rem;
    }

    button {
      padding: 0;
      width: 100%;
      display: block;
      border: none;
    }

    .plp-variant__label {
      position: absolute;
      font-size: 1.4rem;
      left: 1.5rem;
      top: 1.5rem;
      background: rgb(255, 255, 255);
      border: 0.1rem solid rgb(216, 214, 209);
      padding: 0.4rem 0.6rem;
      border-radius: 0.2rem;
    }
  }

  .row {
    width: 100%;
    display: flex;
    justify-content: flex-start;

    &.nav {
      margin: 1.25rem 0 0.75rem;
      align-items: center;
      justify-content: space-between;
    }

    &.with-hidden-swatches {
      justify-content: flex-end;
      padding-right: 1.25rem;
      margin: -3rem 0 2rem 0;
    }
  }

  .product-title {
    display: block;
    font-size: var(--font-size-xxxsmall);
    font-weight: var(--font-weight-normal);
  }

  .metal-selector {
    ul {
      li {
        margin-right: 0.5rem;

        &:last-child {
          margin-right: 0px;
        }

        button {
          height: 2rem;
          width: 2rem;
          border-radius: 50%;
          border: 0.1rem solid var(--color-light-grey);
          position: relative;
          overflow: hidden;
          background-color: transparent;
          cursor: pointer;
          padding: 0;

          &.selected {
            border-color: var(--color-teal);
          }

          &::after {
            content: '';
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            transform: scale(0.75);
            border-radius: 50%;
          }

          &.sterling-silver::after {
            background: linear-gradient(138deg, #d2d2d0 0%, #f7f7f7 50%, #c9cac8 100%);
          }

          &.yellow-gold::after {
            background-color: #c8ab6e;
          }

          &.white-gold::after {
            background: linear-gradient(135deg, #fefefe, #cecece);
          }

          &.rose-gold::after {
            background: #ceac8b;
          }

          &.platinum::after {
            background-color: rgb(200, 200, 200);
          }

          &.yellow-gold-and-platinum::after {
            background: linear-gradient(45deg, #c8ab6e 50%, #c8c8c8 50%);
          }

          &.rose-gold-and-platinum::after {
            background: linear-gradient(45deg, #ceac8b 50%, #c8c8c8 50%);
          }
        }
      }
    }
  }
`;

const PlpProductVariant = ({
  variant,
  position,
  plpTitle,
  label,
  builderFlow = false,
  selectSettingForBuilderFlow,
  children,
}: {
  variant: ListPageItemConfiguration;
  position: number;
  plpTitle: string;
  lowestPrice: number;
  useLowestPrice: boolean;
  label: string | null;
  builderFlow?: boolean;
  selectSettingForBuilderFlow?: () => void;
  children: ReactNode;
}) => {
  const { productClicked } = useAnalytics();

  const router = useRouter();

  const { countryCode } = parseValidLocale(router?.locale);

  const { _t } = useTranslations(router?.locale, [
    humanNamesMapperType.DIAMOND_SHAPES,
    humanNamesMapperType.METALS_IN_HUMAN_NAMES,
    humanNamesMapperType.UI_STRINGS_2,
  ]);

  const currencyCode = getCurrency(countryCode);

  const [isPrimaryImage, setIsPrimaryImage] = useState(true);

  const { productType, collectionSlug, productSlug, title, primaryImage, hoverImage, price } = variant || {};

  const configuration = normalizeVariantConfigurationForGTM(variant?.configuration);

  const productTitleWithProperties = `${title} ${configuration?.diamond_type ? _t(configuration?.diamond_type) : ''} | ${
    metalTypeAsConst[configuration?.metal]
  }`;

  const handleImageChange = () => {
    if (!hoverImage?.src) return;
    setIsPrimaryImage(!isPrimaryImage);
  };

  const handleClick = () => {
    const { primaryImage: { src } = { src: '' } } = variant || {};

    const id = productSlug.split('-').pop();

    const formattedPrice = getFormattedPrice(price, router?.locale, true, true);

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
      {builderFlow ? (
        <button
          onClick={() => {
            selectSettingForBuilderFlow();

            router.push(
              `/customize/diamond-to-setting/${
                Array.isArray(router.query.flowParams) && router.query.flowParams.join('/')
              }/${collectionSlug}/${productSlug}`,
            );
          }}
        >
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

              {label && <span className="plp-variant__label">{label}</span>}
            </div>
            <div className="plp-variant__footer">{children}</div>
          </div>
        </button>
      ) : (
        <ProductLink
          onClick={handleClick}
          productType={productType}
          collectionSlug={collectionSlug}
          productSlug={productSlug}
        >
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

              {label && <span className="plp-variant__label">{label}</span>}
            </div>
            <div className="plp-variant__footer">{children}</div>
          </div>
        </ProductLink>
      )}
    </PlpProductVariantStyles>
  );
};

export { PlpProductVariant };
