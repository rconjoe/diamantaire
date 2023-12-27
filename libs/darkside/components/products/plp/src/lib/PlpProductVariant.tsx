/* eslint-disable camelcase */
import { useAnalytics, normalizeVariantConfigurationForGTM } from '@diamantaire/analytics';
import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { useTranslations, humanNamesMapperType } from '@diamantaire/darkside/data/hooks';
import { getCurrency, parseValidLocale, getFormattedPrice, metalTypeAsConst } from '@diamantaire/shared/constants';
import { replacePlaceholders , makeCurrency } from '@diamantaire/shared/helpers';
import { ProductLink, ListPageItemConfiguration } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { useState } from 'react';
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
  builderFlow = false,
  selectSettingForBuilderFlow,
}: {
  variant: ListPageItemConfiguration;
  position: number;
  plpTitle: string;
  lowestPrice: number;
  useLowestPrice: boolean;
  label: string | null;
  builderFlow?: boolean;
  selectSettingForBuilderFlow?: () => void;
}) => {
  const { productClicked } = useAnalytics();
  const router = useRouter();

  const { countryCode } = parseValidLocale(router?.locale);
  const { _t } = useTranslations(router?.locale, [humanNamesMapperType.DIAMOND_SHAPES, humanNamesMapperType.METALS_IN_HUMAN_NAMES, humanNamesMapperType.UI_STRINGS_2]);

  const currencyCode = getCurrency(countryCode);
  const [isPrimaryImage, setIsPrimaryImage] = useState(true);
  const { productType, collectionSlug, productSlug, title, productTitle, plpTitle: variantTitle, primaryImage, hoverImage, price } = variant || {};

  const configuration = normalizeVariantConfigurationForGTM(variant?.configuration);

  const productTitleWithProperties = `${title} ${configuration?.diamond_type ? _t(configuration?.diamond_type) : ''} | ${
    metalTypeAsConst[configuration?.metal]
  }`;

  const generatedTitle = generatePlpTitle(_t('%%title%% %%shape%% in'), productTitle, variantTitle, { diamondType: _t(variant.configuration.diamondType), metal: _t(variant.configuration.metal) } );
  
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

              <WishlistLikeButton extraClass="plp" productId={`product-${variant?.productSlug}`} />

              {label && <span className="plp-variant__label">{label}</span>}
            </div>
            <div className="plp-variant__content">
              <h3>
                {generatedTitle} |{' '}
                {useLowestPrice
                  ? makeCurrency(lowestPrice, router?.locale, currencyCode) + '+'
                  : makeCurrency(price, router?.locale, currencyCode)}
              </h3>
            </div>
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

              <WishlistLikeButton extraClass="plp" productId={`product-${variant?.productSlug}`} />

              {label && <span className="plp-variant__label">{label}</span>}
            </div>
            <div className="plp-variant__content">
              <h3>
                {generatedTitle} |{' '}
                {useLowestPrice
                  ? makeCurrency(lowestPrice, router.locale, currencyCode) + '+'
                  : makeCurrency(price, router.locale, currencyCode)}
              </h3>
            </div>
          </div>
        </ProductLink>
      )}
    </PlpProductVariantStyles>
  );
};

function isMixedDiamondType(diamondType: string){
  const regex = /\w+(\+\w+)/;

  return regex.test(diamondType);
}

// https://diamondfoundry.atlassian.net/wiki/spaces/DGT/pages/971407413/Product+Titles+on+PLPs
type ProductConfigureation = {
  metal: string;
  diamondType: string;
} & Record<string, string>

function generatePlpTitle(placeholderString, productTitle: string, plpTitle: string, {metal, diamondType} : ProductConfigureation ) {
  
  let genTitle = productTitle;

  if (plpTitle) {
    // %%title%% in %%metal%% 
    genTitle = `${replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [plpTitle, ''])} ${metal}`;
  }

  if (!plpTitle && diamondType && !isMixedDiamondType(diamondType)) {
    // %%title%% %%shape%% in %%metal%% 
    genTitle = `${replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [productTitle, diamondType])} ${metal}`;
  } else {
    // %%title%% in %%metal%%
    genTitle = `${replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [productTitle, ''])} ${metal}`;
  }

  return genTitle

}

export { PlpProductVariant };
