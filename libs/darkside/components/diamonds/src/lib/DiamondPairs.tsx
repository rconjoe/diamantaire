import { DarksideButton, UIString } from '@diamantaire/darkside/components/common-ui';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { useDiamondTableData } from '@diamantaire/darkside/data/hooks';
import { DiamondDataTypes } from '@diamantaire/shared/types';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import Diamond360 from './Diamond360';
import { StyledDiamondPairActiveRow, StyledDiamondPairCell } from './DiamondPairs.style';
import DiamondtableRowAccordion from './DiamondTableRowAccordion';

type DiamondPairCellProps = {
  diamonds: DiamondDataTypes[];
  accessorKey: string;
  renderValue?: (v: unknown) => string;
};

export const DiamondPairCell = ({ diamonds, accessorKey, renderValue }: DiamondPairCellProps) => {
  const values = diamonds.map((d) => d[accessorKey]);

  return (
    <StyledDiamondPairCell>
      {values.map((v, i) => (
        <div key={i.toString()}>{renderValue ? renderValue(v) : v}</div>
      ))}
    </StyledDiamondPairCell>
  );
};

export const DiamondPairActiveRow = ({
  diamonds,
  locale,
  isBuilderFlowOpen,
}: {
  locale: string;
  diamonds: DiamondDataTypes[];
  isBuilderFlowOpen: boolean;
}) => {
  console.log('pair active');

  const [diamond1, diamond2] = diamonds;

  console.log('diamondsxxx', diamonds);

  const { data: { diamondTable: { specs, origin: originValue } = {} } = {} } = useDiamondTableData(locale);

  const originLabel = (specs && Object.values(specs).find((v) => v.key === 'origin').value) || null;

  const { diamondType } = diamond1;

  const { updateFlowData, builderProduct } = useContext(BuilderProductContext);
  const router = useRouter();

  function getToiMoiShapeProductSlug(builderProduct, diamonds) {
    // Extract the list of available diamond types from the builder product
    const availableDiamondTypes = builderProduct?.product?.optionConfigs?.diamondType;

    console.log('availableDiamondTypes', availableDiamondTypes);

    // Check if every diamond's type is included in the available diamond types
    const final = availableDiamondTypes.find((diamondType) =>
      diamonds.every((diamond) => diamondType.value.includes(diamond.diamondType)),
    );

    console.log('xxx', final);

    return final?.id;
  }

  const handleSelectDiamond = () => {
    // TODO: add handler
    console.log(`handleSelectDiamond`, diamonds);
    // updateUrlParameter('lotId', product.lotId);
    updateFlowData('ADD_DIAMOND', diamonds);

    // By pair, we mean two diamonds with the same lotId
    const isPair = router?.asPath.includes('/pairs/');
    const lotIdSlug = diamonds?.map((diamond) => diamond?.lotId).join(',');

    console.log('lotIdSlug', lotIdSlug);

    const toiMoiProductSlug = getToiMoiShapeProductSlug(builderProduct, diamonds);

    console.log('toiMoiProductSlug', toiMoiProductSlug);

    const isToiMoi = router.asPath.includes('toi-moi');

    // If the user changes their shape, we want to link back to the respective setting
    const productShapeId = isToiMoi
      ? toiMoiProductSlug
      : builderProduct?.product?.optionConfigs?.diamondType?.find((option) => option.value === diamondType)?.id ||
        router?.query?.productSlug;

    // router.push(
    //   `/customize/setting-to-diamond${isPair ? '/pairs' : ''}/${builderProduct?.product
    //     ?.collectionSlug}/${productShapeId}/${lotIdSlug}/summary`,
    // );

    // better for perf....
    window.location.href = `${window.location.origin}/customize/setting-to-diamond${isPair ? '/pairs' : ''}/${builderProduct
      ?.product?.collectionSlug}/${productShapeId}/${lotIdSlug}/summary`;
  };

  return (
    <StyledDiamondPairActiveRow>
      <div className="row-container">
        <div className="row-media">
          <div className="row-media-content">
            <Diamond360 noCaption={true} lotId={diamond1.lotId} diamondType={diamondType} />
            <Diamond360 noCaption={true} lotId={diamond2.lotId} diamondType={diamondType} />
          </div>
        </div>
        <div className="row-aside">
          <div className="row-accordion">
            <DiamondtableRowAccordion product={diamond1} productPair={diamond2} />
          </div>

          <div className="row-info">
            <ul>
              <li>
                <div className="label">{originLabel}:</div>
                <div className="value">{originValue}</div>
              </li>
            </ul>
          </div>

          <div className="row-cta">
            {isBuilderFlowOpen ? (
              <DarksideButton onClick={() => handleSelectDiamond()}>Select</DarksideButton>
            ) : (
              <DarksideButton type="solid" colorTheme="black" className="button-select" onClick={handleSelectDiamond}>
                <UIString>Select</UIString>
              </DarksideButton>
            )}
          </div>
        </div>
      </div>
    </StyledDiamondPairActiveRow>
  );
};
