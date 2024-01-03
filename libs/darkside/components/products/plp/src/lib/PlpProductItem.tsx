import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { humanNamesMapperType, useTranslations } from '@diamantaire/darkside/data/hooks';
import { getCurrency, parseValidLocale } from '@diamantaire/shared/constants';
import { replacePlaceholders, makeCurrency } from '@diamantaire/shared/helpers';
import { ListPageItemWithConfigurationVariants } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

import { PlpProductVariant } from './PlpProductVariant';

const PlpProductItemStyles = styled.div`
  position: relative;

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
      background: green;
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
          border: 0.1rem solid #d2dbde;
          position: relative;
          overflow: hidden;
          background-color: transparent;
          cursor: pointer;

          &.selected {
            border: 0.1rem solid var(--color-teal);
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
        }
      }
    }
  }
`;

type PlpProductItemProps = {
  product: ListPageItemWithConfigurationVariants;
  position: number;
  plpTitle: string;
  builderFlowOverride?: boolean;
  selectSettingForBuilderFlow: () => void;
  isEngRingSettingPage: boolean;
};

const PlpProductItem = (props: PlpProductItemProps) => {
  const { product, position, plpTitle, selectSettingForBuilderFlow, builderFlowOverride, isEngRingSettingPage } = props;

  const router = useRouter();

  const { locale } = router || {};

  const { countryCode } = parseValidLocale(locale);

  const currencyCode = getCurrency(countryCode);

  const { _t } = useTranslations(locale, [
    humanNamesMapperType.DIAMOND_SHAPES,
    humanNamesMapperType.METALS_IN_HUMAN_NAMES,
    humanNamesMapperType.UI_STRINGS_2,
  ]);

  const { defaultId, variants, metal, useLowestPrice, lowestPrice } = product;

  const [selectedId, setSelectedId] = useState(defaultId);

  const selectedVariant = variants[selectedId];

  const { productTitle, plpTitle: variantTitle, price } = selectedVariant || {};

  const isMultiShape = selectedVariant?.configuration?.diamondType?.includes('+') || false;

  const engRingFormatMap = () => {
    if (isMultiShape) {
      return _t('%%title%%');
    } else if (isEngRingSettingPage) {
      return _t('%%title%% %%shape%%');
    } else {
      return _t('%%title%% %%shape%% in');
    }
  };

  const generatedTitle = generatePlpTitle(
    engRingFormatMap(),
    productTitle,
    variantTitle,
    {
      diamondType: _t(selectedVariant.configuration.diamondType),
      metal: _t(selectedVariant.configuration.metal),
    },
    isMultiShape,
    isEngRingSettingPage,
  );

  return (
    <PlpProductItemStyles>
      <PlpProductVariant
        variant={selectedVariant}
        position={position}
        plpTitle={plpTitle}
        useLowestPrice={useLowestPrice}
        lowestPrice={lowestPrice}
        label={product?.productLabel?.title || null}
        selectSettingForBuilderFlow={selectSettingForBuilderFlow}
        builderFlow={builderFlowOverride}
      />

      <div className={`row nav${isEngRingSettingPage ? ' with-hidden-swatches' : ''}`}>
        {!isEngRingSettingPage && (
          <div className="metal-selector">
            <ul className="list-unstyled flex">
              {metal?.map((option) => (
                <li key={option.id}>
                  <button
                    onClick={() => {
                      setSelectedId(option.id);
                    }}
                    className={
                      option.value === selectedVariant.configuration.metal ? 'selected ' + option.value : option.value
                    }
                  ></button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <WishlistLikeButton extraClass="plp" productId={`product-${selectedVariant?.productSlug}`} />
      </div>

      <div className="row txt">
        <h3 className="product-title">
          {generatedTitle} |{' '}
          {useLowestPrice
            ? makeCurrency(lowestPrice, router?.locale, currencyCode) + '+'
            : makeCurrency(price, router?.locale, currencyCode)}
        </h3>
      </div>
    </PlpProductItemStyles>
  );
};

export { PlpProductItem };

type ProductConfiguration = {
  metal: string;
  diamondType: string;
} & Record<string, string>;

// https://diamondfoundry.atlassian.net/wiki/spaces/DGT/pages/971407413/Product+Titles+on+PLPs

function generatePlpTitle(
  placeholderString,
  productTitle: string,
  plpTitle: string,
  { metal, diamondType }: ProductConfiguration,
  isMultiShape: boolean,
  isEngRingSettingPage: boolean,
) {
  let genTitle = productTitle;

  // console.log(`productTitle`, productTitle);
  // console.log(`plpTitle`, plpTitle || 'x');
  // console.log(`isMultiShape`, isMultiShape);
  // console.log(`isEngRingSettingPage`, isEngRingSettingPage);

  if (plpTitle) {
    genTitle = `${replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [plpTitle, ''])} ${metal}`;
  } else if (diamondType && !isMixedDiamondType(diamondType) && !isEngRingSettingPage && !isMultiShape) {
    genTitle = `${replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [productTitle, diamondType])} ${metal}`;
  } else if (isEngRingSettingPage && !isEngRingSettingPage) {
    genTitle = `${replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [productTitle, ''])}`;
  } else if (isMultiShape) {
    genTitle = `${replacePlaceholders(placeholderString, ['%%title%%'], [productTitle])} ${metal}`;
  } else {
    genTitle = `${replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [productTitle, ''])} ${metal}`;
  }

  // console.log(`**`, genTitle);

  return genTitle;
}

function isMixedDiamondType(diamondType: string) {
  const regex = /\w+(\+\w+)/;

  return regex.test(diamondType);
}
