import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { UIString } from '@diamantaire/darkside/core';
import { diamondRoutePdp, diamondRouteAppointment } from '@diamantaire/shared/routes';
import { DiamondDataTypes } from '@diamantaire/shared/types';
import { useContext } from 'react';

import Diamond360 from './Diamond360';
import StyledDiamondTableRow from './DiamondTableRow.style';
import DiamondtableRowAccordion from './DiamondTableRowAccordion';

const DiamondTableRow = ({
  product,
  isBuilderFlowOpen = false,
}: {
  product?: DiamondDataTypes;
  locale?: string;
  isBuilderFlowOpen?: boolean;
}) => {
  const { handle, lotId, diamondType } = product;
  const { updateFlowData, builderProduct } = useContext(BuilderProductContext);

  const diamondDetailRoute = `${diamondRoutePdp}/${handle}`;

  const diamondExpertRoute = diamondRouteAppointment;

  const handleSelectDiamond = () => {
    updateFlowData('ADD_DIAMOND', product, builderProduct.step + 1);
  };

  const handlePurchase = () => {
    // TODO: add handler
    console.log(`handlePurchase`, product);
  };

  return (
    <StyledDiamondTableRow>
      <div className="row-container">
        <div className="row-media">
          <div className="row-media-content">
            <Diamond360 lotId={lotId} diamondType={diamondType} />
          </div>
        </div>
        <div className="row-aside">
          <div className="row-cta">
            <DarksideButton href={diamondDetailRoute} type="underline" colorTheme="teal" className="button-details">
              <UIString>View More Details</UIString>
            </DarksideButton>

            {isBuilderFlowOpen && (
              <DarksideButton type="solid" colorTheme="black" className="button-select" onClick={handleSelectDiamond}>
                <UIString>Select</UIString>
              </DarksideButton>
            )}

            <DarksideButton href={diamondExpertRoute} type="underline" colorTheme="teal" className="button-expert">
              <UIString>Speak to a diamond expert</UIString>
            </DarksideButton>

            <DarksideButton type="underline" colorTheme="teal" className="button-purchase" onClick={handlePurchase}>
              <UIString>Purchase without setting</UIString>
            </DarksideButton>
          </div>
          <div className="row-accordion">
            <DiamondtableRowAccordion product={product} />
          </div>
        </div>
      </div>
    </StyledDiamondTableRow>
  );
};

export { DiamondTableRow };

export default DiamondTableRow;
