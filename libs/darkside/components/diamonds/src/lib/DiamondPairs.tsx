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
  // Don't show duplicate diamondType values
  const values =
    accessorKey === 'diamondType' ? [...new Set(diamonds.map((d) => d[accessorKey]))] : diamonds.map((d) => d[accessorKey]);

  return (
    <StyledDiamondPairCell>
      {values.map((v, i) => (
        <div key={i.toString()}>{renderValue ? renderValue(v) : <UIString>{v}</UIString>}</div>
      ))}
    </StyledDiamondPairCell>
  );
};

export const DiamondPairActiveRow = ({
  diamonds,
  isBuilderFlowOpen,
}: {
  diamonds: DiamondDataTypes[];
  isBuilderFlowOpen: boolean;
}) => {
  const [diamond1, diamond2] = diamonds;

  const { locale } = useRouter();
  const { data: { diamondTable: { specs, origin: originValue } = {} } = {} } = useDiamondTableData(locale);

  const originLabel = (specs && Object.values(specs).find((v) => v.key === 'origin').value) || null;

  const { diamondType } = diamond1;

  const { builderProduct } = useContext(BuilderProductContext);
  const router = useRouter();

  function getToiMoiShapeProductSlug(builderProduct, diamonds) {
    // Extract the list of available diamond types from the builder product
    const availableDiamondTypes = builderProduct?.product?.optionConfigs?.diamondType;

    // Check if every diamond's type is included in the available diamond types
    const final = availableDiamondTypes?.find((diamondType) =>
      diamonds.every((diamond) => diamondType.value.includes(diamond.diamondType)),
    );

    return final?.id;
  }

  function determineNextUrl() {
    // By pair, we mean two diamonds with the same lotId
    const isPair = router?.asPath.includes('/pairs/');
    const lotIdSlug = diamonds?.map((diamond) => diamond?.lotId).join(',');

    const toiMoiProductSlug = getToiMoiShapeProductSlug(builderProduct, diamonds);

    const isToiMoi = router.asPath.includes('toi-moi');

    // If the user changes their shape, we want to link back to the respective setting
    const productShapeId = isToiMoi
      ? toiMoiProductSlug
      : builderProduct?.product?.optionConfigs?.diamondType?.find((option) => option.value === diamondType)?.id ||
        router?.query?.productSlug;

    const newUrl = `${window.location.origin}${locale === 'en-US' ? '' : `/${locale}`}/customize/setting-to-diamond${
      isPair ? '/pairs' : ''
    }/${builderProduct?.product?.collectionSlug}/${productShapeId}/${lotIdSlug}/summary`;

    return newUrl; // Return the constructed URL string
  }

  const nextUrl = determineNextUrl();

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

          <div className="row-cta">
            {isBuilderFlowOpen ? (
              <DarksideButton href={nextUrl}>
                <UIString>Select</UIString>
              </DarksideButton>
            ) : (
              <DarksideButton type="solid" colorTheme="black" className="button-select" href={nextUrl}>
                <UIString>Select</UIString>
              </DarksideButton>
            )}
          </div>
        </div>
      </div>
    </StyledDiamondPairActiveRow>
  );
};
