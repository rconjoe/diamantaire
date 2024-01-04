import { Heading } from '@diamantaire/darkside/components/common-ui';
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
`;

type PlpProductItemProps = {
  product: ListPageItemWithConfigurationVariants;
  position: number;
  plpTitle: string;
  builderFlowOverride?: boolean;
  selectSettingForBuilderFlow: () => void;
  useProductTitleOnly: boolean;
};

const PlpProductItem = (props: PlpProductItemProps) => {
  const { product, position, plpTitle, selectSettingForBuilderFlow, builderFlowOverride, useProductTitleOnly } = props;

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

  const generatedTitle = generatePlpTitle(
    _t('%%title%% %%shape%% in'),
    productTitle,
    variantTitle,
    {
      diamondType: _t(selectedVariant.configuration.diamondType),
      metal: _t(selectedVariant.configuration.metal),
    },
    isMultiShape,
    useProductTitleOnly,
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
      >
        <div className={`row nav${useProductTitleOnly ? ' with-hidden-swatches' : ''}`}>
          {!useProductTitleOnly && (
            <div className="metal-selector">
              <ul className="list-unstyled flex">
                {metal?.map((option) => (
                  <li key={option.id}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
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
          <Heading type="h3" className="product-title">
            {generatedTitle} |{' '}
            {useLowestPrice
              ? makeCurrency(lowestPrice, router?.locale, currencyCode) + '+'
              : makeCurrency(price, router?.locale, currencyCode)}
          </Heading>
        </div>
      </PlpProductVariant>
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
  useProductTitleOnly: boolean,
) {
  let genTitle = productTitle;

  // console.log(`productTitle`, productTitle);
  // console.log(`plpTitle`, plpTitle || 'x');
  // console.log(`isMultiShape`, isMultiShape);
  // console.log(`isEngRingSettingPage`, isEngRingSettingPage);

  if (useProductTitleOnly) return plpTitle ? plpTitle : productTitle;

  if (plpTitle) {
    genTitle = `${replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [plpTitle, ''])} ${metal}`;
  } else if (diamondType && !isMixedDiamondType(diamondType) && !isMultiShape) {
    genTitle = `${replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [productTitle, diamondType])} ${metal}`;
  } else if (isMultiShape && !useProductTitleOnly) {
    genTitle = `${replacePlaceholders(placeholderString, ['%%title%%'], [productTitle])
      .toString()
      .replace('%%shape%%', '')} ${metal}`;
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
