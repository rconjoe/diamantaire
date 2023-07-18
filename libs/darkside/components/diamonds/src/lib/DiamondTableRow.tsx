import { Button } from '@diamantaire/darkside/components/common-ui';
import { UIString, UniLink } from '@diamantaire/darkside/core';
import { diamondRoutePdp, diamondRouteAppointment } from '@diamantaire/shared/routes';
import { DiamondDataTypes } from '@diamantaire/shared/types';

import Diamond360 from './Diamond360';
import StyledDiamondTableRow from './DiamondTableRow.style';
import DiamondtableRowAccordion from './DiamondTableRowAccordion';

const DiamondTableRow = ({ product }: { product?: DiamondDataTypes; locale?: string }) => {
  if (!product) return;

  const { handle, lotId, diamondType } = product;

  const diamondDetailRoute = `${diamondRoutePdp}/${handle}`;

  const diamondExpertRoute = diamondRouteAppointment;

  const handleSelectDiamond = () => {
    // TODO: add handler
    console.log(`handleSelectDiamond`, product);
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
            <UniLink route={diamondDetailRoute}>
              <Button className="-link-teal button-details">
                <UIString>View More Details</UIString>
              </Button>
            </UniLink>
            <Button className="tertiary button-select" onClick={handleSelectDiamond}>
              <UIString>Select</UIString>
            </Button>
            <UniLink route={diamondExpertRoute}>
              <Button className="-link-teal button-expert">
                <UIString>Speak to a diamond expert</UIString>
              </Button>
            </UniLink>
            <Button className="-link-teal button-purchase" onClick={handlePurchase}>
              <UIString>Purchase without setting</UIString>
            </Button>
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
