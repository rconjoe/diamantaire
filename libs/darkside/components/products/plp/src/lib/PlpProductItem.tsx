import { Heading } from '@diamantaire/darkside/components/common-ui';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { humanNamesMapperType, useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { ListPageItemWithConfigurationVariants, createPlpTitle } from '@diamantaire/shared-product';
import clsx from 'clsx';
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
  useProductTitleOnly: boolean;
};

const PlpProductItem = (props: PlpProductItemProps) => {
  const { product, position, plpTitle, builderFlowOverride, useProductTitleOnly } = props;

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

  const generatedTitle = createPlpTitle(
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

  const isAboveTitleSpaceThreshold = metal?.length > 5;

  return (
    <PlpProductItemStyles>
      <PlpProductVariant
        variant={selectedVariant}
        position={position}
        plpTitle={plpTitle}
        useLowestPrice={useLowestPrice}
        lowestPrice={lowestPrice}
        label={product?.productLabel?.title || null}
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

          <WishlistLikeButton
            extraClass={clsx('plp', { 'with-space': !useProductTitleOnly, 'with-space-small': isAboveTitleSpaceThreshold })}
            productId={`product-${selectedVariant?.productSlug}`}
          />
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
