import { Heading } from '@diamantaire/darkside/components/common-ui';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { humanNamesMapperType, useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { replacePlaceholders } from '@diamantaire/shared/helpers';
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
            {useLowestPrice ? getFormattedPrice(lowestPrice, locale, true) + '+' : getFormattedPrice(price, locale, true)}
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

function isMixedDiamondType(diamondType: string): boolean {
  const regex = /\w+(\+\w+)/;

  return regex.test(diamondType);
}

function generatePlpTitle(
  placeholderString: string,
  productTitle: string,
  plpTitle: string,
  { metal, diamondType }: ProductConfiguration,
  isMultiShape: boolean,
  useProductTitleOnly: boolean,
): string {
  let genTitle = productTitle;

  if (useProductTitleOnly) return plpTitle || productTitle;

  let placeholderResult: string | string[];

  if (plpTitle) {
    placeholderResult = replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [plpTitle, '']);
  } else if (diamondType && !isMixedDiamondType(diamondType) && !isMultiShape) {
    placeholderResult = replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [productTitle, diamondType]);
  } else if (isMultiShape) {
    placeholderResult = replacePlaceholders(placeholderString, ['%%title%%'], [productTitle]);
    placeholderResult =
      typeof placeholderResult === 'string'
        ? placeholderResult.replace('%%shape%%', '')
        : placeholderResult.join('').replace('%%shape%%', '');
  } else {
    placeholderResult = replacePlaceholders(placeholderString, ['%%title%%', '%%shape%%'], [productTitle, '']);
  }

  genTitle = typeof placeholderResult === 'string' ? placeholderResult : placeholderResult.join('');
  genTitle += ` ${metal}`;

  // Clean up the resulting string to remove extra spaces or commas
  genTitle = genTitle.replace(/,+/g, ',').replace(/ ,/g, ' ').trim();

  return genTitle;
}
